import { UserRepository } from "@repository/UserRepository";
import { User } from '@entity/User';

export class UserService {

    // Sample call (Step 3): Request User if it exists / Return full name string
    // Domain Logic: Mutate domain data / Concatenate first and last name
    static async getUserName(email: string): Promise<String | null> {
        const user = await UserRepository.findByEmail(email);

        if (user?.first_name && user?.last_name) {
            return user.first_name + ' ' + user.last_name;
        } else {
            return null;
        }
    }

    // Get user by id
    static async getUser(id: number): Promise<User | null> {
        return await UserRepository.findOne({ where: { id } });
    }

    // Get all users
    static async getAllUsers(): Promise<User[]> {
        return await UserRepository.find();
    }

    // Create
    static async create(user: Partial<User>): Promise<User> {
        const newUser = UserRepository.create(user);
        return await UserRepository.save(newUser);
    }

    // Update
    static async update(id: number, user: Partial<User>): Promise<User | null> {
        await UserRepository.update(id, user);
        return UserRepository.findOne({ where: { id } });
    }

    // Delete
    static async delete(id: number): Promise<void> {
        await UserRepository.delete(id);
    }

}