const appSettings = {
    appCredentials: {
        clientId: "5f4ffc31-a28f-45bd-bb66-8f2fa32568ea",
        tenantId: "3c8ea0e4-127c-4a02-ac65-58830e4ac608",
        clientSecret: "h4H8Q~pyj5YU0uOhv2gYQrSHK.WDFjP4RFoT6bbm"
    },
    authRoutes: {
        redirect: "http://localhost:3000/auth/callback",
        unauthorized: "/unauthorized" // the wrapper will redirect to this route in case of unauthorized access attempt
    },
    protectedResources: {
        graphAPI: {
            endpoint: "https://graph.microsoft.com/v1.0/me",
            scopes: ["user.read"]
        },
        armAPI: {
            endpoint: "https://management.azure.com/tenants?api-version=2020-01-01",
            scopes: ["https://management.azure.com/user_impersonation"]
        },
        serviceAPI: {
            endpoint: "https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/healthOverviews",
            scopes: ["ServiceHealth.Read.All"]
        }
    }
}

module.exports = appSettings;