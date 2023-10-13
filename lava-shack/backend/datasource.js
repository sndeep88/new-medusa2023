const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
	case "production":
		ENV_FILE_NAME = ".env.production";
		break;
	case "staging":
		ENV_FILE_NAME = ".env.staging";
		break;
	case "test":
		ENV_FILE_NAME = ".env.test";
		break;
	case "development":
	default:
		ENV_FILE_NAME = ".env";
		break;
}

try {
	dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
	type: "postgres",
	url: process.env.DATABASE_URL,
	entities: ["dist/models/*.js"],
	migrations: ["dist/migrations/*.js"],
});

module.exports = {
	datasource: AppDataSource,
};
