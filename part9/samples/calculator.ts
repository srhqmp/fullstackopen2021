type Operation = 'multiply' | 'add' | 'divide';
type Return = number | string;

export const calculator = (a: number, b: number, op: Operation): Return => {
    switch (op) {
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === a) throw new Error('Can\'t divide by 0!');
            return a / b;
        case 'add':
            return a + b;
        default:
            throw new Error('Operation is not multiplu, add or divide!');

    }
};

try {
    console.log(calculator(0, 1, 'divide'));
} catch (e) {
    console.log('Something went wrong, error message:', e.message);
}

console.log(process.argv);

// const calculator = (a: number, b: number, op: Operation): Return => {
//     if (op === 'multiply') {
//         return a * b
//     } else if (op === 'add') {
//         return a + b
//     } else if (op === 'divide') {
//         if (b === 0) return 'can\'t divide by 0!'
//         return a / b
//     }
// }