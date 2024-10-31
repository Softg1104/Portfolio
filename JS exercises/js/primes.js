function getPrimeFactors() {
    const input = document.getElementById('prime-input').value;
    const n = parseInt(input);

    if (isNaN(n) || n < 1) {
        document.getElementById('pf').innerText = "Please enter a valid positive integer.";
        return;
    }

    const factors = [];
    let number = n;

    while (number % 2 === 0) {
        factors.push(2);
        number /= 2;
    }

    for (let i = 3; i <= Math.sqrt(number); i += 2) {
        while (number % i === 0) {
            factors.push(i);
            number /= i;
        }
    }

    if (number > 2) factors.push(number);

    document.getElementById('pf').innerText = factors.length > 0 ? factors.join(', ') : "No prime factors found.";
}