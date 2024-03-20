import { GroupRepository } from "@repository/GroupRepository";
import { faker } from '@faker-js/faker';

export class groupSeeder {

    static async seedGroups() {
        try {

            const groupCount = await GroupRepository.count();

            if(groupCount > 0) {
                console.log('GroupSeeder can only populate an empty table...');
                return;
            }

            const groups = [];

            for(let i = 0; i < 250; i++) {
                let groupName = faker.company.name();
                groups.push({
                    name: groupName,
                    name_full: groupName + ' ' + faker.company.catchPhraseAdjective(),
                    slug: faker.lorem.slug({ min: 3, max: 5 }),
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
