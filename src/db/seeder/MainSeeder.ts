import 'reflect-metadata';
import { AppDataSource } from '../data-source'; 

import { userSeeder } from "./UserSeeder";
import { groupSeeder } from "./GroupSeeder";
import { groupUserSeeder } from "./GroupUserSeeder";

AppDataSource.initialize().then(async () => {

    await userSeeder.seedUsers();
    await groupSeeder.seedGroups();
    await groupUserSeeder.seedGroupUsers();

    console.log('Seeding process complete.');
    process.exit();

  }).catch(error => console.error('Error seeding database:', error));
