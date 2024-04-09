export interface greetUserPayload {
    email: string
}

export interface createUserPayload {
    values: {
        first_name: string;
        last_name: string;
        email: string;
        photo_url?: string;
        mobile_phone?: string;
    }
}

export interface updateUserPayload {
    id: number,
    values: {
        first_name?: string;
        last_name?: string;
        email?: string;
        photo_url?: string;
        mobile_phone?: string;
    }
}