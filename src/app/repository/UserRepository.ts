import { AppDataSource } from "../../db/data-source";
import { User } from '@entity/User';

// Entity repository for complex queries
export const UserRepository = AppDataSource.getRepository(User).extend({

    // Sample call (Step 4): Query for User data via Entity
    async findByEmail(email: string) {
        return await this.createQueryBuilder('users')
            .where('users.email = :email', { email })
            .getOne()
    },

});