describe('types in Typescript', () => {

    describe('declaring variables and consts', () => {

        it('explicitly typed local variables', () => {
            let x: number | string //union type (can be a number OR string)
            x = 'Tacos';
            expect(typeof (x)).toBe('string');
            x = 3.14;
            expect(typeof (x)).toBe('number');
        });
        it('implicitly typed variables', () => {
            let x = 3.14;
            let y = 'Brown';

            let z: number | string = 32;

            z = 'Pizza';

            // x = 'Tacos';

            interface Movie {
                title: string,
                director: string,
                yearReleased: Number
            };
            let movie = {
                title: 'Knives Out',
                direcetor: 'Johnson',
                yearReleased: 2019
            };
            let movie2: Movie = {
                title: 'Thor Ragnorak',
                director: 'Taika Waititi',
                yearReleased: 2017
            };

            expect(movie.title).toBe('Knives Out');
        });

        it('constants', () => {
            const name = 'Joe'; // Const: Have to assign value when you delare; Can't be reassigned to
            // name = 'Joseph'

            const task = {
                description: 'Clearn garage',
                completed: false
            }
            task.completed = true;

            const friends = ['Billy', 'Sean', 'Zac', 'Amy'];
            // friends = [];
            friends[2] = 'Emma';
            expect(friends).toEqual(['Billy', 'Sean', 'Emma', 'Amy']); // use toEqual when comparing object or arrays
        });
    });
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    describe('literals', () => {

        it('has string literals', () => {
            expect('tacos').toEqual("tacos"); // one word in single quotes, the other in double. Really doesn't matter (thought tsLint wants single quotes as default)

            const quote = 'She said "It isn\'t over yet!"'; // Single Quotes: have to use the escape \ when using a single quote inside
            const name = "Flannery O'Connel"; // Double Quotes: can use single quotes inside no problem

            const someEscapeStuff = 'The story is this:\n\nIt was a dark and stormy night \n\n\t\tTHE END';
            console.log(someEscapeStuff);
        });
        it('literal strings (interpolated strings)', () => {
            expect('tacos').toEqual(`tacos`);

            const fragment = `<div>
                    <h1>Hello</h1>
                    </div>`;
            console.log(fragment);

            const name = 'Bob';
            const age = 52;

            // cSharpMessage = $"The name {name} and the age {age}";  // The way to do what's below in C#
            const message1 = 'The name is ' + name + ' and the age is ' + age;
            const message2 = `The name is ${name} and the age is ${age}`;
            expect(message1).toEqual(message2);
        });
        it('numbers', () => {
            const n1 = 1;
            const n2 = 1.3; // these are both 64-bit floating bit numbers
            const nHex = 0xFF; // base 16
            let nOct = 0o22; // base 8
            let nBin = 0b010101; // base 2
            let nBigNumber = 123_848_293_909.56 // can use underscores to make it more readable
        });
        it('booleans', () => {
            const isTrue = true;
            const isFalse = false;
            // any value can be implicitly converted to a boolean
            const name = 'Bob';
            let nameExists = null;
            if (name) {
                nameExists = 'Yep';
            }
            expect(nameExists).toBe('Yep');

            expect('Bob').toBeTruthy();
            expect('Sue').toBeTruthy();
            expect('').toBeFalsy();
            expect(undefined).toBeFalsy();
            expect(NaN).toBeFalsy();
            expect(10).toBeTruthy();
            expect(0).toBeFalsy();
            expect(true).toBeTruthy();
            expect(false).toBeFalsy();
        });
    });
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    describe('array literals', () => {

        it('implicitly typed arrays', () => {
            const friends = ['Bill', 'Amy', 'Zac'];
            friends[0] = '1138';

            let luckyNumbers: number[];
            luckyNumbers = [1, 9, 20, 108];
            let otherLuckyNumbers: Array<number>;
            otherLuckyNumbers = [1, 12, 18];

            // union arrays
            let varied: (string | number)[]; // can be a string array or number array (or a mix)
            varied = [1, 'dog', 12, 'cat'];
            let varied2: Array<string | number>;
            varied2 = [13, 'Beetle', 'Tacos', 99];

            const third = varied2[2];
        });
        it('array destructuring', () => {
            const films = ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'];

            // const f1 = films[0];
            // const f2 = films[2];

            const [f1, /* Skip */, f2] = films;

            expect(f1).toBe('A New Hope');
            expect(f2).toBe('Return of the Jedi');

            const stuffToDo = ['Clean garage', 'Pull weeds', 'Fix Spouting'];

            const [first] = stuffToDo; // creates a variable called 'first' with the position of 0
            // same as const first = stuffToDo[0];
            expect(first).toBe('Clean garage');
        });
        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        describe('typed arrays (tuples)', () => {

            it('a practical example - not using a typed array', () => {

                interface FormattedName {
                    fullName: string,
                    numberOfLetters: number
                }

                function formatName(first: string, last: string): FormattedName {
                    const fullName = `${last}, ${first}`;
                    const numberOfLetters = fullName.length;
                    return { fullName, numberOfLetters }
                }
                const result: FormattedName = formatName('Han', 'Solo');

                expect(result.fullName).toBe('Solo, Han');
                expect(result.numberOfLetters).toBe(9);

                const { fullName, numberOfLetters } = formatName('Luke', 'Skywalker');

                expect(fullName).toBe('Skywalker, Luke');
                expect(numberOfLetters).toBe(15);

                const { fullName: longName } = formatName('Lando', 'Calrissian');

                expect(longName).toBe('Calrissian, Lando');
            });

            it('the same thing as a typed array', () => {
                function formatName(first: string, last: string): [string, number] {
                    const fullName = `${last}, ${first}`;
                    return [fullName, fullName.length];
                }

                const response = formatName('Han', 'Solo');
                expect(response[0]).toBe('Solo, Han');
                expect(response[1]).toBe(9);

                const [name, letters] = formatName('Luke', 'Skywalker');
                expect(name).toBe('Skywalker, Luke');
                expect(letters).toBe(15);
            });
            it('just another example', () => {
                type ArtistTuple = [string, string, string, number];
                let artist: ArtistTuple;

                artist = ['Warren', 'Ellis', 'Musician', 60];
                const artistTwo: ArtistTuple = ['Nick', 'Cave', 'Singer', 62];

                type ThingWithLetterAndStuff = string;

                let name: ThingWithLetterAndStuff;

                name = 'Joe';
                name = 'Sue';

                type Birthdate = string | null;

                interface Person {
                    name: string;
                    birthdate: Birthdate
                };
            });

        });
        it('modifying an array in a non-destructive way', () => {
            const friends = ['Amy', 'Bill', 'David'];

            const friends2 = ['Sarah', ...friends, 'Zac']; // ... here is the 'spread' operator (spreads out the friends array instead of just showing "array(3)")

            expect(friends2).toEqual(['Sarah', 'Amy', 'Bill', 'David', 'Zac']);
        });
        // ------------------------------------------------------------------------------------------------------------------------------------------------------------------
        describe('object literals', () => {
            it('have an implicit type', () => {
                const book = {
                    title: 'Reality',
                    author: 'Kingsley',
                    publisher: 'Random House',
                    year: 2008
                };

                // book.publischer = 'OUP';
            });
            it('explicit object literals with an interface', () => {
                interface Book { // first letter in interface name is caps
                    title: string;
                    author: string;
                    publisher: string;
                    year: number;
                    subtitle?: string // ? makes this attribute optional
                };

                const reality: Book = {
                    title: 'Reality',
                    author: 'Kingsley',
                    publisher: 'Random House',
                    year: 2008,
                    subtitle: 'Cool stuff you didn\'t know'
                };

                const hw: Book = {
                    title: 'High Wierdness',
                    author: 'Erik Davis',
                    publisher: 'OUP',
                    year: 2017,
                    //subtitle: 'Cool stuff you didn\'t know' // subtitle not needed
                };
            });
            it('expando objects', () => {
                interface Book {
                    title: string;
                    author: string;
                    publisher: string;
                    year: number;
                    subtitle?: string
                    [key: string]: any // allows you to add any other string properties without being yelled at
                };
                const reality: Book = {
                    title: 'Reality',
                    author: 'Kingsley',
                    publisher: 'Random House',
                    year: 2008,
                    subtitle: 'Cool stuff you didn\'t know',
                    reviews: ['Interesting', 'Boring', 'Would buy again'], // allowed because of [key: string]: any
                    genre: 'Philosophy' // allowed because of [key: string]: any
                };

                interface Vehicle {
                    vin: string;
                    make: string;
                    model: string;
                };

                interface Vehicles {
                    [vin: string]: Vehicle
                };

                const vehicles: Vehicles = {
                    '928398298': { vin: '928398298', make: 'Honda', model: 'Pilot' },
                    '123456789': { vin: '123456789', make: 'Chevy', model: 'Bolt' }
                };

                expect(vehicles['928398298'].model).toBe('Pilot');

                interface Dictionary<T> {
                    [key: string]: T
                };

                const library: Dictionary<Book> = { // "Parametric Polymorphism"
                    'Reality': reality,
                    'High Weirdness': { title: 'High Weirdness', author: 'Davis', publisher: 'MIT', year: 2018 }
                };

                expect(library['High Weirdness'].author).toBe('Davis');
            });
            it('structural typing - a.k.a. duck typing', () => { // "if it walks like a duck and it talks like a duck, it's probably a duck"

                interface ThingWithBody { body: string }
                function logMessage(message: { body: string }) {
                    console.log(`At ${new Date().toISOString()} you got the following message: ${message.body}`);
                }
                logMessage({ body: 'TACOS!!!' });

                const phoneCall = {
                    from: 'Mom',
                    body: 'Call me, you slacker!'
                };

                logMessage(phoneCall);
            });

        });
        describe('function literals', () => {

            it('three different ways to delcare them', () => {


                // Anonymous functions (Have to be declared before they are used)
                const subtract = (a: number, b: number): number => a - b;
                const multiply = function (a: number, b: number): number {
                    return a * b;
                }

                expect(add(10, 2)).toBe(12);
                expect(subtract(10, 2)).toBe(8);
                expect(multiply(3, 3)).toBe(9);
                expect(((a: number, b: number) => a / b)(10, 2)).toBe(5); // This is stupid JavaScript tricks

                // Named functions (Can be used before declared)
                function add(a: number, b: number): number {
                    return a + b;
                }
            });
            it('a couple quick details about the syntax for arrow functions', () => {

                type MathOp = (a: number, b: number) => number; // a way we can specify a datatype for a function

                const add: MathOp = (a, b) => a + b;

                const division: MathOp = (a, b) => {
                    if (b === 0) {
                        throw new Error('Are you trying to pen a black hole???');
                    } else {
                        return a / b;
                    }
                }

                type Identity = (a: number) => number;

                const mockingBird: Identity = a => a; // just one parameter doesn't need ()

            });
        });
    });
});