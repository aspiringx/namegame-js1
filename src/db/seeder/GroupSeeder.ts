import { GroupRepository } from "@repository/GroupRepository";
import { faker } from '@faker-js/faker';

export class groupSeeder {

    static async seedGroups() {
        try {

            const groups = [];

            for(let i = 0; i < 100; i++) {
                let groupName = faker.company.name();
                groups.push({
                    name: groupName,
                    name_full: groupName + ' ' + faker.company.catchPhraseAdjective(),
                    slug: faker.lorem.slug({ min: 1, max: 4 }),
                    description: faker.company.catchPhrase(),
                    logo_url: faker.image.url(),
                    is_active: Math.random() < 0.5 ? true : false
                })
            }

            await GroupRepository.insert(groups);

            console.log('Groups table successfully seeded');
        } catch (error) {
            console.log('Error seeding groups table:', error);
            throw error;
        }
    }
}
