const form = document.querySelector(".form-wrap");
const result = document.querySelector(".result");
const resultVal = document.getElementById("BMI");
const category = document.querySelectorAll("tr");

function BMI() {
  document.getElementById("message").style.display = "none";
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;

  const BMI = (weight / ((height / 100) * (height / 100))).toFixed(2);
  if (!isNaN(height) && !isNaN(weight) && height != 0 && weight != 0) {
    resultVal.textContent = BMI;
    category.forEach((i) => {
      i.style.color = "white";
    });
    form.style.display = "none";
    result.style.display = "flex";
    if (BMI < 18.5) {
      document.getElementById("1").style.color = "#085e08";
      return;
    } else if (BMI < 25.0) {
      document.getElementById("2").style.color = "#085e08";
      return;
    } else if (BMI < 30.0) {
      document.getElementById("3").style.color = "#085e08";
      return;
    } else if (BMI > 30) {
      document.getElementById("4").style.color = "#085e08";
      return;
    }
  } else {
    document.getElementById("message").style.display = "block";
  }
}

function reset() {
  form.style.display = "flex";
  result.style.display = "none";
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
}
