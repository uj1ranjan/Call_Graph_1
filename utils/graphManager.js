const graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');


getAuthenticatedClient = (accessToken) => {
    // Initialize Graph client
    const client = graph.Client.init({
        // Use the provided access token to authenticate requests
        authProvider: (done) => {
            done(null, accessToken);
        }
    });

    return client;
}

module.exports = {
    getAuthenticatedClient,
}