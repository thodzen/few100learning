import * as fromHr from '../src/hr';
import { Employee } from '../src/hr';

describe('modules', () => {
    describe('using a barrel', () => {
        it('create some stuff', () => {
            const dale = new fromHr.Employee('Dale', 'Cooper');

            dale.job = 'Special Agent';

            expect(dale.salary).toBe(80_000);
            dale.giveRaise(10_000);
            expect(dale.salary).toBe(90_000);

            // dale.salary = 1_000_000 // I want this to fail compilation

            expect(dale.firstName).toBe('Dale');
            expect(dale.lastName).toBe('Cooper');
            expect(dale.getInfo()).toBe('Special Agent Dale Cooper');
        });
        it('using an interface', () => {

            const emp = new Employee('Gordon', 'Smith');
            emp.job = 'Boss';

            reportIt(emp);

            function reportIt(item: fromHr.Reportable) {
                console.log(item.getReport());
            }

            const newPay = getAdjustedPay(emp, 1.10);
            interface HasSalary { salary: number }
            function getAdjustedPay(item: { salary: number }, percentage: number) {
                return item.salary * percentage;
            }
        });
        it('using a class as an interface', () => {
            class Monkey {
                constructor(public name: string) { }
                feed(what: string): string {
                    return `Feeding ${this.name} some ${what}`;
                }
            }

            const george = new Monkey('George');
            expect(george.feed('Banana')).toBe('Feeding George some Banana');

            const kong: Monkey = {
                name: 'King Kong',
                feed: function (what: string) {
                    return `${this.name} eats ${what}`;
                }
            }
        });
        describe('redux starter kit', () => {

            it('an example (sort of)', () => {

                interface Action {
                    type: string;
                }

                class Increment implements Action {
                    type = 'Increment'
                }

                class Decrement implements Action {
                    type = 'Decrement'
                }

                class Reset implements Action {
                    type = 'Reset'
                }

                const stuffThatTheUserDid: Action[] = [
                    new Increment(),
                    new Increment(),
                    new Increment(),
                    new Increment(),
                    new Decrement(),
                    new Decrement(),
                    new Decrement(),
                    new Reset(),
                    new Increment(),
                    new Increment(),
                    new Increment(),
                    new Increment(),
                    new Increment(),
                    new Decrement()
                ];

                const initialState = 0;
                const endCount = stuffThatTheUserDid.reduce((count: number, action: Action) => {
                    switch (action.type) {
                        case 'Increment': {
                            return count + 1;
                        }
                        case 'Decrement': {
                            return count - 1;
                        }
                        case 'Reset': {
                            return initialState;
                        }
                    }
                }, initialState)

                expect(endCount).toBe(4);
            });

        });
    });
});