import { Auth } from '@/models/AuthModel';
import { User } from '@/models/UserModel';

export interface Profile {
    auth: Auth;
    user: User;
}