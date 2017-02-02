/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

const Sequelize = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_SCHEMA,
    port: process.env.DB_PORT,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging:false,
})

const lastUrl = sequelize.define('url',{
    url: {
        type: Sequelize.STRING,
    },
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
    tynyUrl:{
        type: Sequelize.STRING,
    }
})

sequelize.sync()

exports.sequelize = sequelize
exports.user = lastUrl
