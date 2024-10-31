function calculateFibonacci() {
    const position = parseInt(document.getElementById('fibonacci-input').value);
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    const result = fibonacci(position);
    document.getElementById('fibonacciLbl').innerText = result;
}
