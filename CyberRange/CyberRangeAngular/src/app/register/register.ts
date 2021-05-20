export class Register {
    public constructor(init?: Partial<Register>) {
        Object.assign(this, init);
    }
        Email: string;
        FirstName: string;  
        LastName: string;  
        UserName: string;  
        Password: string;
        ConfirmPassword: string;
        RegistrationCodeUsed: string;
}
