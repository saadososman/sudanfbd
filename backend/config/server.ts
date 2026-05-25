export default ({ env }) => ({

  host: env('HOST', '0.0.0.0'),

  port: env.int('PORT', 1337),

  url: env('PUBLIC_URL', ''),

  app: {
    keys: env.array('APP_KEYS'),
  },

  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT'),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT'),
      },
    },
  },

  jwt: {
    secret: env('JWT_SECRET'),
  },

  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },

});