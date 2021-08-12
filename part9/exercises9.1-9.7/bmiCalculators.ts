const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 74))