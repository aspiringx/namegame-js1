import { UserRepository } from "@repository/UserRepository";

export class UserService {

    // Sample call (Step 3): Request User if it exists / Return full name string
    // Domain Logic: Mutate domain data / Concatenate first and last name
    static async getUserName(email: string) {
        const user = await UserRepository.findByEmail(email);

        if (user?.first_name && user?.last_name) {
            return user.first_name + ' ' + user.last_name;
        } else {
            return null;
        }
    }

}