const express = require('express');

const mainController = require('../controllers/mainController');

const appSettings = require('../appSettings.js');
const { resource } = require('../app');

module.exports = (msid) => {

    // initialize router
    const router = express.Router();

    // app routes
    router.get('/', (req, res, next) => res.redirect('/home'));
    router.get('/home', mainController.getHomePage);

    // authentication routes
    router.get('/signin', msid.signIn({ postLoginRedirect: '/', failureRedirect: '/signin' }));
    router.get('/signout', msid.signOut({ postLogoutRedirect: '/' }));

    // secure routes
    router.get('/id', msid.isAuthenticated(), mainController.getIdPage);

    router.get('/profile',
        msid.isAuthenticated(), 
        msid.getToken({
            resource: appSettings.protectedResources.graphAPI
        }), 
        mainController.getProfilePage,
    );

    router.get('/service',
        msid.isAuthenticated(), 
        msid.getToken({
            resource: appSettings.protectedResources.serviceAPI
        }), 
        mainController.getServicePage
    );

    router.get('/tenant',
        msid.isAuthenticated(),
        msid.getToken({
            resource: appSettings.protectedResources.armAPI
        }),
        mainController.getTenantPage
    );

    // unauthorized
    router.get('/unauthorized', (req, res) => res.redirect('/401.html'));

    // 404
    router.get('*', (req, res) => res.status(404).redirect('/404.html'));

    return router;
}