import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { getUser } from '../user-auth/get-user';
import { IBox } from './interfaces/box';
import { ILayout } from './interfaces/layout';

const cors = require('cors')({origin: true});

export const getUsersLayout = async (layoutId: string, authHeader?: string) => {
    // Retrieve the User associated with the token
    // it will throw the appropriate status code
    // should the token verification fail
    const userRecord: admin.auth.UserRecord = await getUser(authHeader);

    const firestore: admin.firestore.Firestore = new admin.firestore.Firestore();
    const collectionRef = firestore.collection('layouts');
    const layoutDocRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> =
        collectionRef.doc(layoutId);

    const layout: ILayout = await layoutDocRef.get()
        .then(async(layoutSnapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) => {
            if (layoutSnapshot.exists) {
                const layoutData: { name: string; userId: string; id: string; } =
                    layoutSnapshot.data() as { name: string; userId: string; id: string; };
                const layoutBoxes = await layoutSnapshot.ref.collection('boxes').get()
                    .then((layoutsBoxesSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
                        return layoutsBoxesSnapshot.docs
                            .map((doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>) => {
                                return {
                                    id: doc.id,
                                    ...doc.data()
                                } as IBox;
                            });
                    });

                return {...layoutData, boxes: layoutBoxes } as ILayout;
            }
            throw 500;
        });

    if (layout) {
        if (layout.userId !== userRecord.uid) {
            throw 401;
        }
    }
    else {
        throw 404;
    }

    return layout;
};

export const getLayout = functions.https.onRequest((req, resp) => {
    // Enable CORS using the `cors` express middleware.
    return cors(req, resp, async () => {
        try {
            // Retrieve the layout associated with the query param layout id
            // and owned by the user associated with the authorization token
            // on the request
            const layout = await getUsersLayout(req.query.id, req.headers.authorization);

            resp.send({ layout });
        } catch(exc) {
            switch(exc) {
                case 401: {
                    resp.status(401).send('Authorization Required!');
                    break;
                }
                case 404: {
                    resp.status(404).send('No doc found!');
                    break;
                }
                default: {
                    resp.status(500).send('Unexpected Error!');
                    break;
                }
            }
            throw exc;
        }
    });
});
