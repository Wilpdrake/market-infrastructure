export interface User {
    uuid: string;
    name: string;
    surname: string;
    patronymic: string | null;
    email: string;
    password: string;
    password_confirmation: string;
    contact_number: string | null;
    telegram_username: string | null;
    comment: string | null;
    avatar_image: string | null;
    header_image: string | null;
    role: string;
    created_by: string | null;
    created_at: string;
    updated_at: string;
}