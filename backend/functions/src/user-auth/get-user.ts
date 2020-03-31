import * as admin from 'firebase-admin';

export const getUser = async (authHeader: string = ''): Promise<admin.auth.UserRecord> => {
    console.log('Check if request is authorized with Firebase ID token');

    if (!authHeader || !authHeader.startsWith(
        'Bearer ')) {
        console.error(
            'No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>'
        );
        throw 403;
    }

    try {
        let idToken: string = '';
        if (authHeader && authHeader.startsWith(
            'Bearer ')) {
            console.log('Found \'Authorization\' header');
            idToken = authHeader.split('Bearer ')[1];
        }

        const adminAuth: admin.auth.Auth = admin.auth();
        const decodedIdToken = await adminAuth.verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        return await adminAuth.getUser(decodedIdToken.uid);
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        throw 403;
    }
};
