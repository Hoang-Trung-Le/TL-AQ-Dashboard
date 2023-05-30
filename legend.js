import { airPollutants } from "./pollutant.js";

async function legendGenerator(selectedPollutant) {
  const legendContainer = document.querySelector(".map-air-quality-legend");

  legendContainer.innerHTML = "";
  const airPollutant = airPollutants.find(
    (pollutant) => pollutant.value === selectedPollutant
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
    const pollutantSelection = document.querySelector("#select-pollutant");
    const selectedPollutant = pollutantSelection.value;
    legendGenerator(selectedPollutant);
  });
});
