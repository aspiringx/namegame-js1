import { UserRepository } from "@repository/UserRepository";
import { UserEntity } from '@entity/UserEntity';

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
    static async getUser(id: number): Promise<UserEntity | null> {
        return await UserRepository.findOne({ where: { id } });
    }

    // Get all users
    static async getAllUsers(): Promise<UserEntity[]> {
        return await UserRepository.find();
    }

    // Create
    static async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
        const newUser = UserRepository.create(user);
        return await UserRepository.save(newUser);
    }

    // Update
    static async updateUser(id: number, user: Partial<UserEntity>): Promise<UserEntity | null> {
        await UserRepository.update(id, user);
        return UserRepository.findOne({ where: { id } });
    }

    // Delete
    static async deleteUser(id: number): Promise<void> {
        await UserRepository.delete(id);
    }

}