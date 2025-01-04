import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/my-payment",
            id: "my-payment",
            options: {
              apiKey: process.env.RAZORPAY_ID,  // Load Razorpay API Key from environment variable
              apiSecret: process.env.RAZORPAY_SECRET,  // Load Razorpay API Secret from environment variable
              account: process.env.RAZORPAY_ACCOUNT
            }
          }
        ]
      }
    }
  ]

})
