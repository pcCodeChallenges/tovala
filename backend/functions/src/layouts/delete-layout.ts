import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { getUsersLayout } from './get-layout';
import { IBox } from './interfaces/box';
import { ILayout } from './interfaces/layout';

const cors = require('cors')({origin: true});

export const deleteLayout = functions.https.onRequest((req, resp) => {
    // Enable CORS using the `cors` express middleware.
    return cors(req, resp, async () => {
        try {
            // Retrieve the layout associated with the query param layout id
            // and owned by the user associated with the authorization token
            // on the request
        console.info(req.query);
            const layout: ILayout = await getUsersLayout(req.query.id, req.headers.authorization);

            const firestore: admin.firestore.Firestore = new admin.firestore.Firestore();
            const documentRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> =
                firestore.doc(`layouts/${layout.id}`);

            const boxDeletionPromises = Promise.all(layout.boxes.map(async (box: IBox) =>
                await firestore.collection('boxes').doc(box.id).delete()));

            return boxDeletionPromises
                .then(() => documentRef.delete())
                .then(() => resp.send({ layout }))
                .catch((error) => {
                    console.error(error);
                    throw error;
                });
        } catch(exc) {
            switch(exc) {
                case 401: {
                    resp.status(401).send('Authorization Required!');
                    break;
                }
                case 403: {
                    resp.status(403).send('Delete not Allowed!');
                    break;
                }
                case 404: {
                    resp.status(404).send('No doc found!');
                    break;
                }
                default: {
                    resp.status(500).send('Internal Server Error!');
                    break;
                }
            }

            throw exc;
        }
    });
});
