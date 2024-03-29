import { GroupUserRepository } from "@repository/GroupUserRepository";
import { UserRepository } from "@repository/UserRepository";
import { GroupRepository } from "@repository/GroupRepository";
import { faker } from '@faker-js/faker';

type GroupUserEntry = {
    user_id: number;
    group_id: number;
    role: string;
    title: string;
    member_since: Date;
    is_leader: boolean;
    is_active: boolean;
};

export class groupUserSeeder {

    static async seedGroupUsers() {
        try {
            const groupUserCount = await GroupUserRepository.count();

            if(groupUserCount > 0) {
                console.log('GroupUserSeeder can only populate an empty table...');
                return;
            }

            const entries = this.createSeedEntries(10000);

            await GroupUserRepository.insert(await entries);

            console.log('Group users table successfully seeded...');
        } catch (error) {
            console.log('Error seeding group users table:', error);
            throw error;
        }
    }

    static async createSeedEntries(entryCount: number): Promise<GroupUserEntry[]> {
        const groupUsersEntries = [];
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
            const randomUser: number[] = faker.helpers.arrayElement(userIdsArr);
            const randomGroup: number[] = faker.helpers.arrayElement(groupIdsArr);
            const recordedGroupUserIndex = randomGroup + '-' + randomUser;

            if(!mappedEntries.has(recordedGroupUserIndex)) {
                groupUsersEntries.push({
                    user_id: Number(randomUser),
                    group_id: Number(randomGroup),
                    role: faker.helpers.arrayElement(['invitee', 'inviter', 'admin']),
                    title:faker.helpers.arrayElement(['leader', 'president', 'guest', 'friend', 'host', 'organizer', 'volunteer']),
                    member_since: faker.date.recent({ days: 365 }),
                    is_leader: Math.random() < 0.5 ? true : false,
                    is_active: Math.random() < 0.5 ? true : false
                })
                mappedEntries.set(recordedGroupUserIndex, 1)
            }
        }

        return groupUsersEntries;
    }
}
