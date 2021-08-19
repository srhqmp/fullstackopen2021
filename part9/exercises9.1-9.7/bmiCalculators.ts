interface BmiData {
    height: number,
    weight: number
}

// const parseArguments = (args: Array<String>): BmiData => {
//     if (args.length < 4) throw new Error('Not enough arguments')
//     if (args.length > 4) throw new Error('Too many arguments')

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             height: Number(args[2]),
//             weight: Number(args[3])
//         }
//     } else {
//         throw new Error('Provided values were not numbers!')
//     }
// }

export const calculateBmi = ({height, weight}:BmiData): string => {
    const result = weight / Math.pow((height * 0.01), 2)
    if (result < 16) {
        return "Severely Underweight"
    } else if (result < 18.5) {
        return "Underweight"
    } else if (result < 25) {
        return "Normal (healthy weight)"
    } else if (result < 30) {
        return "Overweight"
    } else if (result < 35) {
        return "Moderately Obese"
    } else if (result < 40) {
        return "Severely Obese"
    } else {
        return "Morbidly Obese"
    }
}

// try {
//     const { weight, height } = parseArguments(process.argv)
//     console.log(calculateBmi(height, weight))
// } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message)
// }
