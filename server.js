const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = require('./server/app');
const config = require('./server/config/config');
const logger = require('./server/config/logger');
const { Sequelize } = require('sequelize');
const { initMailService } = require("./server/controllers/mails.controller")

app.prepare()
    .then(() => {
        server.get('/plans', (req, res) => {
            return app.render(req, res, '/plans', req.query);
        });

        server.get('*', (req, res) => {
            return handle(req, res)
        });

        server.listen(config.port, () => {
            logger.info(`Listening to port ${config.port}`);
        });

        const sequelize = new Sequelize(config.db.dbname, config.db.username, config.db.password, {
            host: config.db.host,
            dialect: config.db.dialect,
            logging:config.db.logging
        });

        sequelize
            .authenticate()
            .then(() => {
                logger.info(`Connected to ${config.db.dialect}`);
            })
            .catch((err) => {
                logger.info('Unable to connect to the database:', err);
            });

            initMailService()

        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    logger.info('Server closed');
                    process.exit(1);
                });
            } else {
                process.exit(1);
            }
        };

        const unexpectedErrorHandler = (error) => {
            logger.error(error);
            exitHandler();
        };

        process.on('uncaughtException', unexpectedErrorHandler);
        process.on('unhandledRejection', unexpectedErrorHandler);

        process.on('SIGTERM', () => {
            logger.info('SIGTERM received');
            if (server) {
                server.close();
            }
        });
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })