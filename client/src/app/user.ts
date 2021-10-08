import { Todo } from "./todo";
import { Post } from "./post";

export class User {
    _id?: string;
    name: string = "";
    email: string = "";
    street?: string;
    city?: string;
    zipcode?: number;
    todos?: Todo[] = [];
    posts?: Post[] = [];

}
