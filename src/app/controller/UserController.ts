import { UserService } from "@service/UserService";
import { UserEntity } from '@entity/UserEntity';

interface greetUserPayload {
    email: string
}

interface createUserPayload {
    values: object
}

interface updateUserPayload {
    id: number,
    values: object
}

export class UserController {

    // Sample call (Step 2): Request user name / Return custom message
    // Business logic: Concatenate full name string and message
    static async greetUser(payload: unknown): Promise<any>{
        const data = <greetUserPayload>payload;
        const name = await UserService.getUserName(data.email);

        if(name) {
            return {
                status: 'success',
                data: {greeting: 'Welcome to the website ' + name + '.'},
                message: 'Successfully created user greeting.'
            }
        } else {
            return {
                status: 'error',
                data: null,
                message: 'No user found.'
            }
        }
    }

    // Basic calls

    static async getUser(id: number) {
        return UserService.getUser(id);
    }

    static async getAllUsers() {
        return UserService.getAllUsers();
    }

    static async createUser(payload: unknown): Promise<UserEntity> {
        const data = <createUserPayload>payload;
        return UserService.createUser(data.values);
    }

    static async updateUser(userId: number, payload: unknown): Promise<UserEntity | null> {
        const data = <updateUserPayload>payload;
        return await UserService.updateUser(userId, data.values);
    }

    static async deleteUser(userId: number): Promise<void> {
        await UserService.deleteUser(userId);
    }

}