export const startingPay = 80_000;

export * from './employee';
export * from './retiree';
export * from './contractor';

export interface Reportable {
    getReport(): string
}