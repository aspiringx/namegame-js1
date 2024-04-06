import { UserUserRepository } from "@repository/UserUserRepository";
import { UserRepository } from "@repository/UserRepository";
import { GroupRepository } from "@repository/GroupRepository";
import { faker } from '@faker-js/faker';

// This seeder populates connections between users. 
type UserUserEntry = {
    user_id: number;
    user_id_invitee: number;
    group_id: number;
    relationship: string;
};

export class userUserSeeder {

    static async seedUserUsers() {
        try {
            const userUserCount = await UserUserRepository.count();

            if(userUserCount > 0) {
                console.log('UserUserSeeder can only populate an empty table...');
                return;
            }

            const entries = this.createSeedEntries(1000);

            await UserUserRepository.insert(await entries);

            console.log('UserUsers table successfully seeded...');
        } catch (error) {
            console.log('Error seeding user users table:', error);
            throw error;
        }
    }

    static async createSeedEntries(entryCount: number): Promise<UserUserEntry[]> {
        const userUsersEntries = [];
        const mappedEntries = new Map();

        const groupIds = await GroupRepository.createQueryBuilder('groups')
            .select(['groups.id AS group_id'])
            .orderBy('id', 'ASC')
            .execute();

        const userIds = await UserRepository.createQueryBuilder('users')
            .select(['users.id AS user_id'])
            .orderBy('id', 'ASC')
            .execute();

        const userIdsArr = userIds.map((obj: { user_id: any; }) => obj.user_id);
        const groupIdsArr = groupIds.map((obj: { group_id: any; }) => obj.group_id);

        for(let i = 0; i < entryCount; i++) {
            const randomUser: number = faker.helpers.arrayElement(userIdsArr);
            const randomUserInvitee: number = faker.helpers.arrayElement(userIdsArr);
            const randomGroup: number = faker.helpers.arrayElement(groupIdsArr);
            const recordedUserUserIndex = randomGroup + '-' + randomUser + '-' + randomUserInvitee;
            // Don't re-add relationships in reverse. 
            const recordedReverseUserUserIndex = randomGroup + '-' + randomUserInvitee + '-' + randomUser;

            // Check for existing mapped entries (including reversed) and 
            // don't connect users to themselves. 
            if(!mappedEntries.has(recordedUserUserIndex) 
              && !mappedEntries.has(recordedReverseUserUserIndex)
              && randomUser != randomUserInvitee
            ) {
                userUsersEntries.push({
                    user_id: randomUser,
                    user_id_invitee: randomUserInvitee,
                    group_id: randomGroup,
                    relationship: "friend"
                })
                mappedEntries.set(recordedUserUserIndex, 1)
            }
        }

        return userUsersEntries;
    }
}
