document.getElementById("time-input").addEventListener("input", (event) => {
  const hour = parseInt(event.target.value);

  // update the map
  // $.get("/AQSs_Info/e.csv", function (csvString) {
  //   var data = Papa.parse(csvString, {
  //     header: true,
  //   }).data;
  // });

  // converting 0-23 hour to AMPM format
  const ampm = hour >= 12 ? "AM" : "PM";
  const hour12 = hour % 12 ? hour % 12 : 12;

  // update text in the UI
  document.getElementById("active-hour").innerText = hour12 + ampm + " 01/01";
});

const playPauseButton = document.querySelector(".time-slider__control--motion");
// console.log(playPauseButton);
let isPlaying = false;
let intervalTime = null;
playPauseButton.addEventListener("click", function () {
  
  if (!isPlaying) {
    playPauseButton.style.backgroundImage =
      'url("/assets/images/play-button.svg")';
    autoIncreSliderValue();
  } else {
    playPauseButton.style.backgroundImage =
      'url("/assets/images/pause-button.svg")';
    if (intervalTime) {
      clearInterval(intervalTime);
      intervalTime = null;
    }
  }
  isPlaying = !isPlaying;
});

const slider = document.querySelector(".slider");
slider.oninput = function () {
  // your slider oninput logic here
  updateChart(parseInt(this.value));
};

const buttonForward = document.querySelector(".time-slider__control--forward");
buttonForward.addEventListener("click", function () {
  incrementSliderValue("forward");
});

const buttonBackward = document.querySelector(
  ".time-slider__control--backward"
);
buttonBackward.addEventListener("click", function () {
  incrementSliderValue("backward");
});

// Function to increment the slider value and update the chart
function incrementSliderValue(motion) {
  // get current value of the range slider
  const currentValue = parseInt(slider.value);

  // increment the value by 1 and set it back to the range slider
  if (motion == "forward") slider.value = currentValue + 1;
  else if (motion == "backward") slider.value = currentValue - 1;

  // call the updateChart function
  updateChart(parseInt(slider.value));
}

function autoIncreSliderValue() {
  intervalTime = setInterval(function () {
    const currentValue = parseInt(slider.value);
    slider.value = currentValue + 1;
    updateChart(parseInt(slider.value));
  }, 1000);
}

function updateChart(sliderValue) {
  const markerChart = document.querySelector(".marker-chart");
  const markerChartId = markerChart.getAttribute("id");
  // Acquire the chart by class name
  const forecastChart = Chart.getChart(markerChartId);
  // Translate vertical line with slider value
  forecastChart.options.plugins.annotation.annotations.vertLine.xMin =
    sliderValue + 12;
  forecastChart.options.plugins.annotation.annotations.vertLine.xMax =
    sliderValue + 12;
  forecastChart.update();
  if (isPlaying && sliderValue == slider.max) {
  playPauseButton.style.backgroundImage =
      'url("/assets/images/pause-button.svg")';
    if (intervalTime) {
      clearInterval(intervalTime);
      intervalTime = null;
    }
  }
}
