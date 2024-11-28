import bcrypt from "bcrypt";

export default class User {
    id?: string;

    private constructor(
        id: string | undefined,
        readonly name: string,
        readonly email: string,
        readonly user_class: string,
        readonly password: string,
        readonly course: string,
        readonly role: string
    ) {
        this.id = id;
    }

    static async createUser(
        name: string,
        email: string,
        user_class: string,
        password: string,
        course: string,
        role: string,
        id?: string
    ): Promise<User> {

        let crypted: string = await bcrypt.hash(password, 8)

        return new User(id,
            name,
            email,
            user_class,
            crypted,
            course,
            role
        );
    }
}