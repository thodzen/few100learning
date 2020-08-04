import { isEven, isOdd } from '../src/utils';

describe('functions', () => {

    it('overloading (spoilers: you cannot do this)', () => {
        function formatName(first: string, last: string, mi?: string): string {
            let fullName = `${last}, ${first}`;
            if (mi) { // mi !== null || mi !=== undefined || mi !== ""
                fullName += ` ${mi}.`;
            }
            return fullName;
        }

        expect(formatName('Han', 'Solo')).toBe('Solo, Han');
        expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
    });

    it('default values for parameters', () => {
        function add(a: number = 2, b: number = 10): number {
            return a + b;
        }
        expect(add()).toBe(12); // could also say add(undefined, undefined) and get the same results
        expect(add(10)).toBe(20);
        expect(add(3, 5)).toBe(8);
        expect(add(undefined, 8)).toBe(10); // undefined means use whatever the default value is for the first para

    });
    it('rest operator', () => {
        function add(a: number, b: number, ...rest: number[]) { // you have to call it with at least 2 arguments (or however many before '...') (rest operator)
            const firstTwo = a + b;
            return rest.reduce((s, n) => s + n, firstTwo);
        }

        expect(add(2, 2)).toBe(4);
        expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
    });
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    describe('higher-ordered functions', () => {
        it('an imperative tagMaker', () => {


            // <element>content</element>
            function tagMaker(element: string, content: string) {
                return `<${element}>${content}</${element}>`;
            }

            expect(tagMaker('name', 'Bob Smith')).toBe('<name>Bob Smith</name>');
            expect(tagMaker('pay', '$4,231.52')).toBe('<pay>$4,231.52</pay>');
            expect(tagMaker('pay', '$500')).toBe('<pay>$500</pay>');
            expect(tagMaker('pay', '$4')).toBe('<pay>$4</pay>');

        });

        it('an object oriented approach', () => {

            class TagMaker {
                // private element:string;

                // constructor(element: string) {
                //     this.element = element;
                // }

                constructor(private element: string) { }

                make(content: string) {
                    return `<${this.element}>${content}</${this.element}>`;
                }
            }

            const nameMaker = new TagMaker('name');
            const payMaker = new TagMaker('pay');

            expect(nameMaker.make('Bob Smith')).toBe('<name>Bob Smith</name>');
            expect(nameMaker.make('Dale Cooper')).toBe('<name>Dale Cooper</name>');
            expect(payMaker.make('$23.00')).toBe('<pay>$23.00</pay>');


        });

        it('a functional approach', () => {
            function tagMaker(element: string): (content: string) => string {
                return function (content: string) {
                    return `<${element}>${content}</${element}>`;
                }
            }

            const nameMaker = tagMaker('name');
            const payMaker = tagMaker('pay');

            expect(nameMaker('Leland')).toBe('<name>Leland</name>');
            expect(nameMaker('Harry S. Truman')).toBe('<name>Harry S. Truman</name>');
            expect(payMaker('$32.52')).toBe('<pay>$32.52</pay>');
        });

        it('a function that takes a function', theFunctionalStuff); // bottom of file

    });
    describe('array methods', () => {

        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        it('visiting each element of an array', () => {
            // foreach(var x in numbers){....} // Loop in C#

            numbers.forEach((e) => {
                console.log('Got', { e });
            });

            numbers.forEach((v, i, a) => console.log({ v, i, a }));
        });
        describe('array methods that return a new array', () => {
            // !! Important to know well before Front End Web 200 !!
            it('has filter', () => {
                // in C# this is sort of like LINQ's 'where' method
                const evens = numbers.filter(isEven);

                expect(evens).toEqual([2, 4, 6, 8]);
                expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
            it('has map', () => {
                // If there is a place you want to go, it'll get you there you know... it's the map
                // Like C#'s Select
                const asStrings = numbers.map(n => n.toString());
                expect(asStrings).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9'])

                const doubled = numbers.map(n => n * 2);
                expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
            });
        });
        describe('that return a single (scalar) value', () => {

            it('checking the membership of an array against a predicate', () => {

                // C# LINQs Any
                const allEven = numbers.every(isEven);
                expect(allEven).toBe(false);
                // C# LINQs ALL
                const someEven = numbers.some(isEven);
                expect(someEven).toBe(true);
            });
            it('reduce', () => {
                const sum = numbers.reduce((x, y) => x + y);
                expect(sum).toBe(45);

                const sum2 = numbers.reduce((s, n) => s + n, 100); // the third parameter, 100, is the "inital value"; the reduce will start with 100
                expect(sum2).toBe(145);
            });
            it('they can be combined', () => {
                const sumOfDoubleEvens = numbers
                    .filter(isEven)
                    .map(n => n * 2)
                    .reduce((s, n) => s + n);

                expect(sumOfDoubleEvens).toBe(40);
            });
            it('talling a shopping cart', () => {
                interface CartItem {
                    id: string;
                    description: string;
                    qty: number;
                    price: number;
                }

                const cart: CartItem[] = [
                    { id: '1', description: 'Beer', qty: 1, price: 6.99 },
                    { id: '2', description: 'Shampoo', qty: 2, price: 4.50 },
                    { id: '3', description: 'Taco Shells', qty: 12, price: 1.99 }
                ];

                //const total = cart.reduce((amount: number, item: CartItem) => amount + (item.price * item.qty), 0);
                const total = cart
                    .map(c => c.price * c.qty) // [6.99, 9, 23.88]
                    .reduce((s, n) => s + n); // 6.99 + 9 + 23.88 = 39.87

                // I want to know the total price to be paid for all of these
                expect(total).toBe(39.87);

            });

            it('bowling scores', () => {
                interface BowlingGame {
                    name: string;
                    score: number;
                }

                const games: BowlingGame[] = [
                    { name: 'Jeff', score: 127 },
                    { name: 'Stacey', score: 223 },
                    { name: 'Violet', score: 187 },
                    { name: 'Henry', score: 270 }
                ];

                const highScorers = games.filter(g => g.score >= 200).map(g => `${g.name} got a ${g.score}`);

                expect(highScorers).toEqual(['Stacey got a 223', 'Henry got a 270']);

                interface Summary {
                    highScorer: string;
                    highScore: number;
                    lowScorer: string;
                    lowScore: number;
                }

                const initialValue: Summary = {
                    highScore: -1,
                    highScorer: null,
                    lowScore: 301,
                    lowScorer: null
                };

                const result: Summary = games.reduce((summary: Summary, next: BowlingGame) => {
                    return {
                        highScore: next.score > summary.highScore ? next.score : summary.highScore,
                        highScorer: next.score > summary.highScore ? next.name : summary.highScorer,
                        lowScore: next.score < summary.lowScore ? next.score : summary.lowScore,
                        lowScorer: next.score < summary.lowScore ? next.name : summary.lowScorer
                    }
                }, initialValue);

                expect(result).toEqual({ highScore: 270, highScorer: 'Henry', lowScore: 127, lowScorer: 'Jeff' });
            });
        });
        it('another practice', () => {
            const data = [
                {
                    "_id": "5f29b0f18d7623fddd112e02",
                    "index": 0,
                    "isActive": false,
                    "balance": "$2,379.27",
                    "age": 28,
                    "name": "Nettie Norris",
                    "gender": "female"
                },
                {
                    "_id": "5f29b0f1d46682080222ca34",
                    "index": 1,
                    "isActive": false,
                    "balance": "$1,250.35",
                    "age": 24,
                    "name": "Barnes Hall",
                    "gender": "male"
                },
                {
                    "_id": "5f29b0f1f71dcb3c8913ab7f",
                    "index": 2,
                    "isActive": true,
                    "balance": "$3,394.75",
                    "age": 32,
                    "name": "Jacqueline Landry",
                    "gender": "female"
                },
                {
                    "_id": "5f29b0f1ab5ede5c55d5cf14",
                    "index": 3,
                    "isActive": false,
                    "balance": "$1,903.39",
                    "age": 36,
                    "name": "Dejesus Hunt",
                    "gender": "male"
                },
                {
                    "_id": "5f29b0f1f92d202399dafb3a",
                    "index": 4,
                    "isActive": true,
                    "balance": "$3,689.08",
                    "age": 38,
                    "name": "Dale Dunn",
                    "gender": "female"
                }
            ]
            // what is the name and balance of each active person over the age of 30?

            // what is the total balance of all the active people?

            // what is the balance of the men? the women?
        });
    });
});

function theFunctionalStuff() {
    function formatName(first: string, last: string, decorator: (n: string) => string = (n) => n) {
        return decorator(`${last}, ${first}`);
    }

    const r1 = formatName('Han', 'Solo');
    expect(r1).toBe('Solo, Han');

    const r2 = formatName('Han', 'Solo', padForCheck)
    expect(r2).toBe('***Solo, Han***');

    const r3 = formatName('Han', 'Solo', x => x.toUpperCase());
    expect(r3).toBe('SOLO, HAN');

    function padForCheck(name: string): string {
        return '***' + name + '***';
    }
}