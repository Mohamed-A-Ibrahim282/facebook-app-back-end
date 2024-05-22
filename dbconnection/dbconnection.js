import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('mysql://uejuo3grnjpxb43s:xuXNY7VYskzdmeLN4w2y@bh54rychfxjnejmdeqlu-mysql.services.clever-cloud.com:3306/bh54rychfxjnejmdeqlu')

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database.');
}