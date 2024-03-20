import { UserRepository } from "@repository/UserRepository";
import { faker } from '@faker-js/faker';

export class userSeeder {

    static async seedUsers() {
        try {

            const userCount = await UserRepository.count();

            if(userCount > 0) {
                console.log('UserSeeder can only populate an empty table...');
                return;
            }

            const users = [];

            for(let i = 0; i < 1000; i++) {
                let verifiedDate = faker.date.recent({ days: 365 });
                users.push({
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    email: faker.internet.email(),
                    email_verified_at: Math.random() < 0.5 ? 'null' : faker.date.recent({ days: 1, refDate: verifiedDate }),
                    photo_url: faker.image.url(),
                    mobile_phone: faker.string.octal({ prefix: '+1', length: 10 }),
                    mobile_phone_verified_at: Math.random() < 0.5 ? 'null' : faker.date.recent({ days: 1, refDate: verifiedDate }),
                    mobile_phone_carrier: faker.helpers.arrayElement(['Verizon', 'AT&T', 'Google Fi', 'Visible', 'Boost Mobile', 'Cricket', 'Mint Mobile', 'Xfinity', 'T-Mobile'])
                })
            }

            await UserRepository.insert(users);

            console.log('Users table successfully seeded');
        } catch (error) {
            console.log('Error seeding users table:', error);
            throw error;
        }
    }
}
