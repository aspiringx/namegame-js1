import { UserService } from "@service/UserService";

interface greetUserPayload {
    email: string
}

export class UserController {

    // Sample call (Step 2)
    async greetUser(payload: unknown) {
        const data = <greetUserPayload>payload;
        const name = await UserService.getUserName(data.email);

        if(name) {
            return {
                status: 'success',
                data: {greeting: 'Welcome to the website ' + name + '.'},
                msg: 'Successfully created user greeting.'
            }
        } else {
            return {
                status: 'success',
                data: null,
                msg: 'No user found.'
            }
        }
    }

}