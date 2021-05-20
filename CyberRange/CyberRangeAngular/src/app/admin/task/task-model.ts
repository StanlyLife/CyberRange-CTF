export class TaskModel {
    public constructor(init?: Partial<TaskModel>) {
        Object.assign(this, init);
    }
    TaskId: number;
    Icon: string;
    Name: string;
    Description: string;
    Duration: number;
    State: string;
    MaxPoints: number;
    RandomFlag: boolean;
    Flag: string;
    TemplateName: string; 
}