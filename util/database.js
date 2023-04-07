const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '@201301Up',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;