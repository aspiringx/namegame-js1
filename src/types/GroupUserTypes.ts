export interface createGroupUserPayload {
    values: {
        user_id: number;
        role?: string;
        title?: string;
        is_leader?: boolean;
        is_active?: boolean;
    }
}

export interface updateGroupUserPayload {
    values: {
        role?: string;
        title?: string;
        member_since?: Date;
        is_leader?: boolean;
        is_active?: boolean;
    }
}