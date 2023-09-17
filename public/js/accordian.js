let forecastExtraInfo = document.querySelectorAll(".forecast-expanded")[0];
let forecastDayButton = document.getElementsByClassName("forecast-day");

let forecastExtraInfoChildren = forecastExtraInfo.children;

for (let i = 0; i < forecastDayButton.length; i++) {
  forecastExtraInfoChildren[i].style.display = "none";
  forecastExtraInfo.style.display = "none";

  forecastDayButton[i].addEventListener("click", () => {

    if (forecastExtraInfoChildren[i].style.display == "none") {
      forecastExtraInfo.style.display = "block";
      forecastExtraInfoChildren[i].style.display = "block";

    } else {
      forecastExtraInfoChildren[i].style.display = "none";
      let allClosed = true;

      for (let j = 0; j < forecastExtraInfoChildren.length; j++) {

        if (forecastExtraInfoChildren[j].style.display == "block") {
          allClosed = false;
        }
      }

      if (allClosed) {
        forecastExtraInfo.style.display = "none";
      }
    }
  });
}
