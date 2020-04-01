import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { getUser } from '../user-auth/get-user';
import { getUsersLayout } from './get-layout';
import { IBox } from './interfaces/box';
import { ILayout } from './interfaces/layout';

const cors = require('cors')({origin: true});

export const postLayout = functions.https.onRequest((req, resp) => {
    // Enable CORS using the `cors` express middleware.
    return cors(req, resp, async () => {
        try {
            const firestore: admin.firestore.Firestore = new admin.firestore.Firestore();
            const collectionRef = firestore.collection('layouts');
            const userRecord: admin.auth.UserRecord = await getUser(req.headers.authorization);
            const layout: ILayout = req.body;

            const layoutDocument: { name: string; } = { name: layout.name };
            const newLayoutDocRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> =
                await collectionRef.add(layoutDocument);

            await newLayoutDocRef.update({ userId: userRecord.uid });
            layout.boxes.forEach(async (box: IBox) => {
                await newLayoutDocRef.collection('boxes').add(box);
            });

            // Get the newly added Layout
            const newLayout = await getUsersLayout(newLayoutDocRef.id, req.headers.authorization);

            resp.send({ layout: newLayout });
        } catch (exc) {
            switch(exc) {
                case 401: {
                    resp.status(401).send('Authorization Required!');
                    break;
                }
                case 403: {
                    resp.status(403).send('Save not Allowed!');
                    break;
                }
                default: {
                    resp.status(500).send('Unexpected Error!');
                    break;
                }
            }
        }
    });
});
