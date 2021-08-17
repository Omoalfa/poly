const dotenv = require("dotenv");
const path = require("path");
const Joi = require("@hapi/joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

// get the intended host and port number, use localhost and port 3000 if not provided
const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string()
			.valid("production", "development", "test")
			.required(),
		PORT: Joi.number().default(3000),
		JWT_SECRET: Joi.string().required().description("JWT secret key"),
		JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
			.default(30)
			.description("minutes after which access tokens expire"),
		JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
			.default(30)
			.description("days after which refresh tokens expire"),
		DB_HOSTNAME: Joi.string().required().description("database hostname"),
		DB_USERNAME: Joi.string().required().description("database username"),
		DB_PASSWORD: Joi.any().description("database password"),
		DB_NAME: Joi.string().required().description("database name"),
		DB_DIALECT: Joi.string().valid("mysql").required(),
		LOGGING: Joi.boolean().required(),
		API_BASE_URL: Joi.string().required(),
		PUBLIC_BASE_URL: Joi.string().required(),
		NODE_MAILER_HOST_NAME: Joi.string().required(),
		NODE_MAILER_PORT: Joi.number().required(),
		NODE_MAILER_USERNAME: Joi.string().required(),
		NODE_MAILER_PASSWORD: Joi.string().required(),
		EMAIL_FROM: Joi.string().required()
	})
	.unknown();

const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: "key" } })
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	jwt: {
		secret: envVars.JWT_SECRET,
		accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
		refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
		resetPasswordExpirationMinutes: 10
	},
	db: {
		host: envVars.DB_HOSTNAME,
		username: envVars.DB_USERNAME,
		password: envVars.DB_PASSWORD,
		dbname: envVars.DB_NAME,
		dialect: envVars.DB_DIALECT,
		logging: envVars.LOGGING
	},
	email: {
		host: envVars.NODE_MAILER_HOST_NAME,
		port: envVars.NODE_MAILER_PORT,
		auth: {
			user: envVars.NODE_MAILER_USERNAME,
			pass: envVars.NODE_MAILER_PASSWORD
		},
		from: envVars.EMAIL_FROM
	},
	api_base_url: envVars.API_BASE_URL,
	public_base_url: envVars.PUBLIC_BASE_URL
};
