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

    public getCredentials(): Credentials {
        return this.oauth2Client.credentials;
    }
}

export default Oauth2ClientManager;