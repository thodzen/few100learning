import { Person } from "./person";
import { Reportable } from ".";

// you EXTEND classes and IMPLEMENT interfaces
export class Employee extends Person implements Reportable {

    job: string;
    private _salary: number = 80_000;

    constructor(public firstName: string, public lastName: string) {
        super(); // this calls into base class's constructor; in C#, it's called base
    }
    getReport(): string {
        return `Report for ${this.getInfo()}`
    }

    get salary(): number { return this._salary; }
    //set salary(newVal: number) { this._salary = newVal; }

    giveRaise(amount: number): void {
        this._salary += amount;
    }

    getInfo(): string {
        return `${this.job} ${this.firstName} ${this.lastName}`;
    }
}