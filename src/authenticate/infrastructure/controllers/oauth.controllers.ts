import { Response, Request, NextFunction } from 'express';
import { config, httpClient } from '@shared/index';
import logger from '@shared/utils/logger';

class Authentication {
constructor() {
    this.auth_login = this.auth_login.bind(this);
    this.post_login = this.post_login.bind(this);
    this.refresh_token = this.refresh_token.bind(this);
}

    async auth_login(_req: Request, res: Response, next: NextFunction) {
        try {
            const urlBase = config.Oauth.URL_OAUTH_ACCOUNTS;
            const params = {
                client_id: config.Oauth.client_id,
                redirect_uri: config.Oauth.redirect_uris[0],
                access_type: 'offline',
                response_type: 'code',
                scope: config.Oauth.URL_SCOPE,
                state: 'new_access_token',
                include_granted_scopes: 'true',
                prompt: 'consent'
            };
            const url = `${urlBase}?${new URLSearchParams(params as Record<string, string>).toString()}`;
            res.redirect(url);
        } catch (error) {
            next(error);
        }
    }

    async post_login(_req: Request, res: Response, next: NextFunction) {
        try {
            const { code } = _req.query;
            if (!code) return next(new Error('oauth_errors.missing_authorization_code'));
            const urlBase = config.Oauth.URL_Token;
            const params = {
                client_id: config.Oauth.client_id,
                client_secret: config.Oauth.client_secret,
                code: code as string,
                grant_type: 'authorization_code',
                redirect_uri: config.Oauth.redirect_uris[0],
            };

            const result = await httpClient.post< typeof params, object | any >(urlBase, params);
            if (!result) return next(new Error('oauth_errors.token_retrieval_error'));

            res.cookie('access_token', result.access_token, {
                maxAge: result.expires_in * 1000,
                httpOnly: true,
                secure: true 
            });
            res.status(200).json(`Verificado : ${result.access_token}`);
        } catch (error){
            next(error);
        }
    }

    async refresh_token(req: Request, res: Response, next: NextFunction) {
        try {
            const result = true; 

            if (!result) {
                const error = new Error('oauth_errors.token_refresh_error');
                logger.debug('Controlador Refresh_token  ==>>  ', error);
                throw error;
            }

            res.status(200).json('Token de acceso actualizado');
        } catch (error: unknown) {
            next(error);
        }
    }
    
}

export default Authentication;


