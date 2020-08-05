export const isEven = (n: number): boolean => n % 2 === 0;

export const isOdd = (n: number): boolean => !isEven(n);

export interface Thingy { }

export class Monkey { }

export type MathThingy = number;

export type PI = 3.14;

// for calculator
export function numberToCurrencyString(num: number) {
    return num.toFixed(2).toString();
}