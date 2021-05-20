export class gameCreate {

    public constructor(init?: Partial<gameCreate>) {
        Object.assign(this, init);
    }
    GameId: string;
    Name: string;
    Description: string;
    Icon: string;
    IsTeamGame: boolean;
    IsPlayerGame: boolean;
    AlwaysOpen: boolean;
    StartDate: string;
    EndDate: string;
    State: string;
    category: string;
    hidden: boolean;
    passwordRequired: boolean;
    password: string;
    VmTemplate: string;
}
