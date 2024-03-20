import 'reflect-metadata';
import { AppDataSource } from '../data-source'; 

import { userSeeder } from "./UserSeeder";
import { groupSeeder } from "./GroupSeeder";

AppDataSource.initialize().then(async () => {

    await Promise.all([
        userSeeder.seedUsers(),
        groupSeeder.seedGroups()
    ]);

    console.log('Database successfully seeded');
    process.exit();

  }).catch(error => console.error('Error seeding database:', error));
