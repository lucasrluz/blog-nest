import { User } from "src/user/entity/user.entity";

export interface IPost {
    title: string;
    content: string;
    user: User;
}