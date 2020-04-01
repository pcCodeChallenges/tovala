import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { getUser } from '../user-auth/get-user';
import { IBox } from './interfaces/box';
import { ILayout } from './interfaces/layout';

const cors = require('cors')({origin: true});

export const getLayouts = functions.https.onRequest((req, resp) => {
    // Enable CORS using the `cors` express middleware.
    return cors(req, resp, async () => {
        const userRecord: admin.auth.UserRecord = await getUser(req.headers.authorization);
        const firestore: admin.firestore.Firestore = new admin.firestore.Firestore();
        const collectionRef = firestore.collection('layouts');
        const usersLayoutsQuery: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
            collectionRef.where('userId', '==', userRecord.uid);

        return usersLayoutsQuery.get()
            .then(async(usersLayoutsSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
                if (!usersLayoutsSnapshot.empty) {
                    const layoutsPromises = usersLayoutsSnapshot.docs.map(async (document: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>) => {
                        const usersLayout = document.data();
                        usersLayout['id'] = document.id;
                        console.info('usersLayout', usersLayout);

                        const usersLayoutBoxes: Array<FirebaseFirestore.DocumentData> =
                            await document.ref.collection('boxes').get()
                                .then((usersLayoutsBoxesSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
                                    return usersLayoutsBoxesSnapshot.docs
                                        .map((doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>) => {
                                            return {
                                                id: doc.id,
                                                ...doc.data()
                                            } as IBox;
                                        });
                                });
                        return { ...usersLayout, boxes: usersLayoutBoxes } as ILayout;
                    });

                    const layouts: Array<ILayout> = await Promise.all(layoutsPromises);

                    resp.send({ layouts });
                } else {
                    resp.send('No docs found!');
                }
            });
    });
});
