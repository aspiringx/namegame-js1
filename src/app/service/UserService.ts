import { UserRepository } from "@repository/UserRepository";

export class UserService {

    // Sample call (Step 3)
    static async getUserName(email: string) {
        const user = await UserRepository.findByEmail(email);

        if (user?.first_name && user?.last_name) {
            return user.first_name + ' ' + user.last_name;
        } else {
            return null;
        }
    }

}