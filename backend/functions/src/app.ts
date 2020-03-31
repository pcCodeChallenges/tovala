import * as admin from 'firebase-admin';

function initializeApp(): admin.app.App {
    return admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
}

export const app: admin.app.App = initializeApp();
