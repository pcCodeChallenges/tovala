import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { getUsersLayout } from './get-layout';

const cors = require('cors')({origin: true});

export const deleteLayout = functions.https.onRequest((req, resp) => {
    // Enable CORS using the `cors` express middleware.
    return cors(req, resp, async () => {
        // try {
            // Retrieve the layout associated with the query param layout id
            // and owned by the user associated with the authorization token
            // on the request
            const layout = await getUsersLayout(req.params.id, req.headers.authorization);

            const firestore: admin.firestore.Firestore = new admin.firestore.Firestore();
            const documentRef = firestore.doc(`layouts/${layout.id}`);

            console.info('documentRef');

            layout.boxes.forEach(box =>
                firestore.doc(`layouts/${layout.id}/${box.id}`).delete());

            await documentRef.delete();

            resp.send({ layout });
        // } catch(exc) {
        //     switch(exc) {
        //         case 401: {
        //             resp.status(401).send('Authorization Required!');
        //             break;
        //         }
        //         case 403: {
        //             resp.status(403).send('Delete not Allowed!');
        //             break;
        //         }
        //         case 404: {
        //             resp.status(404).send('No doc found!');
        //             break;
        //         }
        //         default: {
        //             resp.status(500).send('Internal Server Error!');
        //             break;
        //         }
        //     }
        // }
    });
});
