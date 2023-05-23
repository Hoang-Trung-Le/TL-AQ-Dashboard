// Data structure for air pollutants and their corresponding categories
const airPollutants = [
  {
    name: "OZONE",
    unit: "ppb",
    categories: [
      { label: "Good", range: "< 5.4" },
      { label: "Fair", range: "5.4 - 8.0" },
      { label: "Poor", range: "8.0 - 12.0" },
      { label: "Very poor", range: "12.0 - 16.0" },
      { label: "Ext poor", range: "> 16.0" },
    ],
  },
  {
    name: "PM25",
    unit: "ppm",
    categories: [
      { label: "Good", range: "< 25" },
      { label: "Fair", range: "25 - 50" },
      { label: "Poor", range: "50 - 100" },
      { label: "Very poor", range: "100 - 300" },
      { label: "Ext poor", range: "> 300" },
    ],
  },
];

async function legendGenerator(selectedPollutant) {
  //   const buttonApplySelection = document.querySelector(".select-button");
  const legendContainer = document.querySelector(".map-air-quality-legend");
  //   buttonApplySelection.addEventListener("click", () => {
  //     var pollutantSelection = document.querySelector("#select-pollutant");
  // selectedPollutant = pollutantSelection.value;

  legendContainer.innerHTML = "";
  const airPollutant = airPollutants.find(
    (pollutant) => pollutant.name === selectedPollutant
  );
  if (airPollutant) {
    // Loop through categories of the selected gas
    airPollutant.categories.forEach((category) => {
      const pollutantLegend = document.createElement("div");
      pollutantLegend.classList.add("aq-categories");

      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("aq-category");
      categoryDiv.classList.add(
        `${category.label.replace(/\s+/g, "-").toLowerCase()}`
      );
      categoryDiv.textContent = category.label;
      pollutantLegend.appendChild(categoryDiv);

      const rangeSpan = document.createElement("span");
      rangeSpan.classList.add("quality-value");
      rangeSpan.textContent = category.range;
      pollutantLegend.appendChild(rangeSpan);

      legendContainer.appendChild(pollutantLegend);
    });
  }
  //   });
}

window.addEventListener("DOMContentLoaded", (event) => {
  legendGenerator("OZONE"); // or whichever pollutant you want to use as default
  const buttonApplySelection = document.querySelector(".select-button");
  buttonApplySelection.addEventListener("click", () => {
    var pollutantSelection = document.querySelector("#select-pollutant");
    selectedPollutant = pollutantSelection.value;
    legendGenerator(selectedPollutant);
  });
});
