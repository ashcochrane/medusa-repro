require('dotenv').config();

const { loadEnv, defineConfig } = require('@medusajs/framework/utils')
const { COMPANY_MODULE } = require('./src/modules/company/index');
const { DOCUMENT_MODULE } = require('./src/modules/document/index');

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

const DATABASE_URL =
  `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}` +
  `@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`

console.log(DATABASE_URL);

const config = defineConfig({
  projectConfig: {
    databaseUrl: DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    databaseDriverOptions: { connection: { ssl: { rejectUnauthorized: false } } },
    databaseName: process.env.DATABASE_NAME,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    [COMPANY_MODULE]: {
      resolve: './modules/company'
    },
    [DOCUMENT_MODULE]: {
      resolve: './modules/document'
    },
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL
      }
    },
    cache: {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    // workflowEngine: {
    //   resolve: "@medusajs/medusa/workflow-engine-redis",
    //   options: {
    //     redis: {
    //       url: process.env.REDIS_URL,
    //     },
    //   },
    // },
    payment: {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY
            }
          }
        ]
      }
    },
    notification: {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/notification-sendgrid",
            id: "sendgrid",
            options: {
              channels: ["email"],
              api_key: process.env.SENDGRID_API_KEY,
              from: process.env.SENDGRID_FROM
            } 
          }
        ]
      }
    },
    file: {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "./src/modules/digital-ocean-spaces",
            id: "spaces",
            options: {
              spacesUrl: process.env.SPACES_URL,
              bucket: process.env.SPACES_BUCKET,
              endpoint: process.env.SPACES_ENDPOINT,
              region: process.env.SPACES_REGION,
              accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
              secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY
            }
          }
        ]
      }
    }
  }
});

console.log("Medusa Config:", JSON.stringify(config, null, 2));

module.exports = config;
