import { UserService } from "@service/UserService";
import { User } from '@entity/User';

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
    async greetUser(payload: unknown) {
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

    async getUser(id: number) {
        return UserService.getUser(id);
    }

    async getAllUsers() {
        return UserService.getAllUsers();
    }

    async createUser(payload: unknown): Promise<User> {
        const data = <createUserPayload>payload;
        return UserService.create(data.values);
    }

    async updateUser(payload: unknown): Promise<User | null> {
        const data = <updateUserPayload>payload;
        return await UserService.update(data.id, data.values);
    }

    async deleteUser(id: number): Promise<void> {
        await UserService.delete(id);
    }

}