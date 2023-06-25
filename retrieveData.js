import * as sites from "./AQSs_Info/SiteDetails.js";

// Get pollutant data of a specific station
async function getPollutantData(location, pollutant, csvFilePath, dataOption) {
  // Read and parse data from file
  const response = await fetch(csvFilePath);
  const file = await response.text();
  const parsedData = Papa.parse(file, { header: true }).data;

  // Extract corresponding info from parsed data
  const formattedLocation = location.toUpperCase().replace(/ /g, "_");
  const locationHeader = `${pollutant}_${formattedLocation}`;

  const data = parsedData.map((row) => parseFloat(row[locationHeader]));
  const forecastHours = parsedData.map((row) =>
    parseFloat(row["forecast_hours"])
  );
  // console.log(parsedData);
  const dateOptions = {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = parsedData.map((row) =>
    new Date(row["datetime"]).toLocaleString("en-AU", dateOptions)
  );
  // console.log(date);

  // Return the requested data option
  if (dataOption == "forecast") {
    const forecastData = [];
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(forecastHours[i]) && forecastHours[i] > 0) {
        forecastData.push({ date: date[i], value: data[i] });
      }
    }
    return forecastData;
  } else if (dataOption == "history") {
    const historyData = []; //{}
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(forecastHours[i]) && forecastHours[i] <= 0) {
        historyData.push({ date: date[i], value: data[i] });
      }
    }
    return historyData;
  } else if (dataOption == "both") {
    const forecastData = [];
    const historyData = [];
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(forecastHours[i]) && forecastHours[i] > 0) {
        forecastData.push({ date: date[i], value: data[i] });
        // console.log("forecastData");
        // console.log(date[i]);
        // forecastData["date"].push(date[i]);
        // forecastData["value"].push(data[i]);
      } else if (!isNaN(forecastHours[i]) && forecastHours[i] <= 0) {
        historyData.push({ date: date[i], value: data[i] });
        // historyData["date"].push(date[i]);
        // historyData["value"].push(data[i]);
      }
    }
    return { forecastData, historyData };
  } else {
    return {}; // Return an empty object for invalid dataOption
  }
}

function getPollutantDataForLocation(station, selectedPollutant, dataOption) {
  // console.log(selectedPollutant);
  const selectedTime = 48;
  let selectedRegion =  null;
  sites.regionDetails.forEach((region) => {
    if (region.name === station.Region) {
      selectedRegion = region.label;
    }
  });
  // console.log(region)
  const csvFilePath = `./AQSs_Info/${selectedRegion}_forecast_${selectedPollutant.label}_${selectedTime}_48_14062023_.csv`;
  console.log(csvFilePath);
  // console.log(selectedPollutant.value)
  // console.log(location)
  const location = station.SiteName;
  // console.log(location)
  return getPollutantData(location, selectedPollutant.value, csvFilePath, dataOption);
}

export default getPollutantDataForLocation;
