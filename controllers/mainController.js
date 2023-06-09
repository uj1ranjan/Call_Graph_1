const appSettings = require('../appSettings');
const fetchManager = require('../utils/fetchManager');
const graphManager = require('../utils/graphManager');

exports.getHomePage = (req, res, next) => {
    const isAuthenticated = req.session.isAuthenticated;
    const username = req.session.account ? req.session.account.username : '';
    res.render('home', { isAuthenticated: isAuthenticated, username: username });
}

exports.getIdPage = (req, res, next) => {
    const claims = {
        name: req.session.account.idTokenClaims.name,
        preferred_username: req.session.account.idTokenClaims.preferred_username,
        oid: req.session.account.idTokenClaims.oid,
        sub: req.session.account.idTokenClaims.sub
    };

    res.render('id', { isAuthenticated: req.session.isAuthenticated, claims: claims });
}

exports.getProfilePage = async (req, res, next) => {
    let profile;

    try {
        const graphClient = graphManager.getAuthenticatedClient(req.session.protectedResources["graphAPI"].accessToken);

        profile = await graphClient
            .api('/me')
            .get();

    } catch (error) {
        console.log(error)
        next(error);
    }

    res.render('profile', { isAuthenticated: req.session.isAuthenticated, profile: profile });
}

exports.getServicePage = async (req, res, next) => {
    let service;

    try {
        const graphClient = graphManager.getAuthenticatedClient(req.session.protectedResources["serviceAPI"].accessToken);
        console.log(graphClient);

        service = await graphClient
            .api('/admin/serviceAnnouncement/healthOverviews')
            .get();

    } catch (error) {
        console.log(error)
        next(error);
    }
    console.log(service);

    res.render('service', { isAuthenticated: req.session.isAuthenticated, service: service });
}

exports.getTenantPage = async (req, res, next) => {
    let tenant;

    try {
        tenant = await fetchManager.callAPI(appSettings.protectedResources.armAPI.endpoint, req.session.protectedResources["armAPI"].accessToken);
    } catch (error) {
        console.log(error)
        next(error);
    }

    res.render('tenant', { isAuthenticated: req.session.isAuthenticated, tenant: tenant.value[0] });
}