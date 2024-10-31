document.getElementById("bmiForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const weight = parseFloat(document.querySelector("input[name='weight']").value);
    const height = parseFloat(document.querySelector("input[name='height']").value);

    if (isNaN(weight) || isNaN(height) || height <= 0) {
        alert("Please enter valid weight and height values.");
        return;
    }

    const bmi = (weight / (height * height)) * 10000;
    const resultModal = document.getElementById("resultModal");
    const bmiResult = document.getElementById("bmiResult");
    const bmiImage = document.getElementById("bmiImage");

    bmiResult.textContent = `Your BMI is ${bmi.toFixed(2)}`;

    if (bmi >= 25) {
        bmiImage.src = "bad.jpg";
    } else {
        bmiImage.src = "okay.png";
    }

    resultModal.style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("resultModal").style.display = "none";
});

window.onclick = function (event) {
    const resultModal = document.getElementById("resultModal");
    if (event.target == resultModal) {
        resultModal.style.display = "none";
    }
};
