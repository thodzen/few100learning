export abstract class Person {
    public firstName: string;
    public lastName: string;

    abstract getInfo(): string;
}