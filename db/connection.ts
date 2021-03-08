import { Sequelize } from "sequelize";

const db = new Sequelize('demo_node', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false
});

export default db;