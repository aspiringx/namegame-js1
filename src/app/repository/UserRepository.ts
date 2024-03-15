import { User } from '@entity/User';
import { AppDataSource } from "../../db/data-source";

// Repository
export const UserRepository = AppDataSource.getRepository(User).extend({

    // Sample call (Step 4): Query for User data via Entity
    async findByEmail(email: string) {
        return await this.createQueryBuilder("users")
            .where("users.email = :email", { email })
            .getOne()
    },

});