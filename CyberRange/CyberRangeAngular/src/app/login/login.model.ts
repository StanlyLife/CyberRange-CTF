export class Login {

    public constructor(init?: Partial<Login>) {
        Object.assign(this, init);
    }

    Email: string;
    Password: string;
}
