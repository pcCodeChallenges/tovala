import * as admin from 'firebase-admin';

export const decodeToken = async (authHeader: string = ''): Promise<admin.auth.DecodedIdToken> => {
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
        return await adminAuth.verifyIdToken(idToken);
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        throw 403;
    }
};

export const verifyToken = async (authHeader: string = ''): Promise<boolean> => {
    const decodedTokenId: admin.auth.DecodedIdToken = await decodeToken(authHeader);

    // Rely upon the decoded token object's innate truthiness to
    // prove if the token is valid
    return Boolean(decodedTokenId);
};
