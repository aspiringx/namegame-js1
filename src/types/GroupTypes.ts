export interface createGroupPayload {
    values: {
        parent_id: number;
        name: string;
        name_full: string;
        slug: string;
        description?: string;
        logo_url?: string;
        is_active?: boolean;
    }
}

export interface updateGroupPayload {
    id: number,
    values: {
        parent_id?: number;
        name?: string;
        name_full?: string;
        slug?: string;
        description?: string;
        logo_url?: string;
        is_active?: boolean;
    }
}