import { AppDataSource } from "../../db/data-source";
import { UserEntity } from '@entity/UserEntity';

// Entity repository for complex queries
export const UserRepository = AppDataSource.getRepository(UserEntity).extend({

    // Sample call (Step 4): Query for User data via Entity
    async findByEmail(email: string) {
        return await this.createQueryBuilder('users')
            .where('users.email = :email', { email })
            .getOne()
    },

});