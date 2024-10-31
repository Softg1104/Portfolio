function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function checkNextPrime() {
    let num = parseInt(document.getElementById('next-prime-input').value) + 1;
    while (!isPrime(num)) {
        num++;
    }
    document.getElementById('next-prime-result').innerText = num;
}
