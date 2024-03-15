// import { google } from 'googleapis';

// const getOauth2Client = () => {
//     return new google.auth.OAuth2(
//         process.env.CLIENT_ID,
//         process.env.SECRET_ID,
//         process.env.REDIRECT
//     );

// }



// export default getOauth2Client;

import { OAuth2Client, Credentials } from 'google-auth-library';

class Oauth2ClientManager {
    private static instance: Oauth2ClientManager;
    private oauth2Client: OAuth2Client;

    private constructor() {
        this.oauth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.SECRET_ID,
            process.env.REDIRECT
        );
    }

    public static getInstance(): Oauth2ClientManager {
        if (!Oauth2ClientManager.instance) {
            Oauth2ClientManager.instance = new Oauth2ClientManager();
        }
        return Oauth2ClientManager.instance;
    }

    public getOauth2Client(): OAuth2Client {
        return this.oauth2Client;
    }

    public setCredentials(tokens: Credentials) {
        this.oauth2Client.setCredentials(tokens);
    }
}

export default Oauth2ClientManager;