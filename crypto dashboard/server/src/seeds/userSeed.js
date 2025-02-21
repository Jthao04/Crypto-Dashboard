import sequelize from '../config/connection.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const seedUsers = async () => {
    await sequelize.sync({ force: true }); // Synchronize the database

    const users = [
        { username: 'user1', password: bcrypt.hashSync('password1', 10) },
        { username: 'user2', password: bcrypt.hashSync('password2', 10) },
        { username: 'user3', password: bcrypt.hashSync('password3', 10) },
    ];

    for (const user of users) {
        await User.create(user);
    }

    console.log('Users seeded!');
    process.exit(0); // Exit the process after seeding
};

export default seedUsers;