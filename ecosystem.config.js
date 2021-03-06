module.exports = {
  apps: [{
    name: "poly186",
    script: "server.js",
    instances: "1",
    autorestart: true,
    watch: false,
    time: true,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 8080,
      API_BASE_URL: "https://poly186platform-prod.us-west-2.elasticbeanstalk.com/v1",
      PUBLIC_BASE_URL: "https://platform.poly186.io/uploads",
      JWT_SECRET: "thisisasamplesecret",
      JWT_ACCESS_EXPIRATION_MINUTES: 30,
      JWT_REFRESH_EXPIRATION_DAYS: 30,
      DB_USERNAME: "knowledgebasepol",
      DB_PASSWORD: "fG8d7byG",
      DB_NAME: "knowledge_base_poly186_i",
      DB_HOSTNAME: "mysql.knowledge-base.poly186.io",
      DB_DIALECT: "mysql",
      LOGGING: "false",
      NODE_MAILER_HOST_NAME:"smtp.dreamhost.com",
      NODE_MAILER_PORT:465,
      NODE_MAILER_USERNAME:"no-reply@knowledge-base.poly186.io",
      NODE_MAILER_PASSWORD:"Reset@111",
      EMAIL_FROM:"no-reply@knowledge-base.poly186.io"
    }
  }]
};
