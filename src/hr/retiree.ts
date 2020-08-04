import { Person } from "./person";

export class Retiree extends Person {
    constructor(public firstName: string, public lastName: string) {
        super(); // this calls into base class's constructor; in C#, it's called base
    }

    getInfo(): string {
        return `Retiree ${this.firstName} ${this.lastName}`;
    }
}