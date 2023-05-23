// Initial configuration of map

const southWest = new L.LatLng(-37.50528021, 130.9992792),
  northEast = new L.LatLng(-28.15701999, 163.638889),
  bounds = new L.LatLngBounds(southWest, northEast);

let config = {
  minZoom: 5,
  maxZoom: 17,
  maxBounds: bounds,
  maxBoundsViscosity: 0.9,
};
var w = window.innerWidth;
console.log(w);
// Magnification with which the map will start
var zoom;
if (w < 740) {
  zoom = 5;
} else zoom = 6;
console.log(zoom);
// Coordinates of NSW geographic center
const cenLat = -33.0;
const cenLng = 147.032179;

var map = L.map("mapid", config).setView([cenLat, cenLng], zoom); // ([coordinates], zoom scale)

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 14,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
    " contributors",
}).addTo(map);

L.control.scale({ imperial: false }).addTo(map);

// var StamenTerrain = L.tileLayer(
//   "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}",
//   {
//     attribution:
//       'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     subdomains: "abcd",
//     minZoom: 0,
//     maxZoom: 18,
//     ext: "png",
//   }
// );

// var StadiaAlidadeSmoothDark = L.tileLayer(
//   "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
//   {
//     maxZoom: 20,
//     attribution:
//       '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
//   }
// );

// Home button
{
  // Home button
  const htmlTemplate = `<svg width="32" height="32" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="m5.183 5.436.268-.865c-.368.09-.626.569-.716.861h-.144c-.014-.2-.064-.706-.2-.84.324-.333.798-.408 1.412-.3l-.4 1.15-.22-.005ZM1.895 3.408l.065.516-.248-.109-.126-.725c.88-.14 2.716.795 2.782 2.339l-.892-.008c-.186-.813-.928-1.825-1.582-2.013Zm.251 2c-.134-.546-.499-1.163-.936-1.288l.076.424-.248-.104-.11-.556c.6-.096 1.905.554 2.076 1.533l-.858-.009ZM1.118 5.4c-.102-.3-.285-.572-.643-.644l.134.64-.233-.002-.218-.878c.572-.08 1.588.32 1.725.891L1.118 5.4Zm4.832.485-5.891.014-.011-.249 5.903-.087-.002.322Z" fill="#000"/>
    </svg>`;
  // '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.451L16 6.031 0 18.451v-5.064L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z" /></svg>';
  // create custom button
  const customControl = L.Control.extend({
    // button position
    options: {
      position: "topleft",
    },

    // method
    onAdd: function (map) {
      // create button
      const btn = L.DomUtil.create("button");
      btn.title = "NSW";
      btn.innerHTML = htmlTemplate;
      btn.className += "leaflet-bar back-to-home hidden";

      return btn;
    },
  });

  // adding new button to map controll
  map.addControl(new customControl());

  // on drag end
  map.on("moveend", getCenterOfMap);

  const buttonBackToHome = document.querySelector(".back-to-home");

  function getCenterOfMap() {
    buttonBackToHome.classList.remove("hidden");

    buttonBackToHome.addEventListener("click", () => {
      map.flyTo([cenLat, cenLng], zoom);
    });

    map.on("moveend", () => {
      const { lat: latCenter, lng: lngCenter } = map.getCenter();

      const latC = latCenter.toFixed(3) * 1;
      const lngC = lngCenter.toFixed(3) * 1;

      const defaultCoordinate = [+cenLat.toFixed(3), +cenLng.toFixed(3)];

      const centerCoordinate = [latC, lngC];

      // if (compareToArrays(centerCoordinate, defaultCoordinate)) {
      //   buttonBackToHome.classList.add("hidden");
      // }
    });
  }

  // const compareToArrays = (a, b) => JSON.stringify(a) === JSON.stringify(b);
}

var featureGroups = L.featureGroup().addLayer(map);
var markersInfo = [];
var sidebar = L.control
  .sidebar("sidebar", {
    autopan: true,
    position: "right",
  })
  .addTo(map);
var markerInfoPromise = getMarkerInfo();

//! Potential overlapping problem can be improved (featureGroup and markerClusterGroup)
// Read markers data from data.csv
function getMarkerInfo() {
  return new Promise(function (resolve, reject) {
    var activeMarker = null;

    // Create a DivIcon with custom HTML content
    var markerClusterGroup = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        const childCount = cluster.getChildCount();
        return L.divIcon({
          html: `<img src='./assets/images/markerCluster.svg'>
                  <span>${childCount}</span>`,
          className: "marker-cluster",
        });
      },
      showCoverageOnHover: false,
    });

    $.get("./AQSs_Info/e.csv", function (csvString) {
      // Use PapaParse to convert string to array of objects
      var data = Papa.parse(csvString, {
        header: true,
        dynamicTyping: true,
      }).data;

      for (let i = 0; i < data.length - 1; i++) {
        (function () {
          // Create a new scope for each iteration of the loop
          var row = data[i];
          if (row != null) {
            markersInfo.push(data[i].title);
          }
          var latlngs = [];
          if (row.lat != null && row.lng != null) {
            latlngs = L.latLng([row.lat, row.lng]);
            let marker = L.marker(latlngs).addTo(featureGroups);
            marker.setIcon(colorMarker("default")).bindTooltip(data[i].title, {
              direction: "top",
            });
            marker.on("click", function () {
              if (activeMarker != null) {
                activeMarker.setIcon(colorMarker("default"));
              }
              activeMarker = marker;
              marker.setIcon(colorMarker("selected"));
              sidebar
                .setContent(
                  generateMarkerContent(data[i].title, data[i].lat, data[i].lng)
                )
                .show();
            });
            markerClusterGroup.addLayer(marker);
          }
        })();
      }
      // Get the close button element
      const closeButton = document.querySelector(".close");
      // Add an event listener to the close button
      if (closeButton) {
        closeButton.addEventListener("click", function () {
          if (activeMarker != null) {
            activeMarker.setIcon(colorMarker("default"));
            activeMarker = null;
          }
        });
      }
      map.addLayer(markerClusterGroup);
      resolve(markersInfo);
    });
  });
}

function colorMarker(state) {
  if (state == "selected") {
    var size = 40;
    var color = "#ff0000";
  } else if (state == "default") {
    var size = 30;
    var color = "#524eee";
  } else if (state == "purpleair") {
    var size = 30;
    var color = "#aa44aa";
  }

  const svgTemplate = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
    <path stroke="#fff" fill="${color}" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
  </svg>`;

  const colorIcon = L.divIcon({
    className: "marker",
    html: svgTemplate,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
    tooltipAnchor: [1, -size],
  });
  return colorIcon;
}

var purpleairFeatureGroups = L.featureGroup().addLayer(map);
var purpleairInfo = [];
var purpleairPromise = getPurpleAirInfo(purpleairInfo, purpleairFeatureGroups);
import purpleairSensors from "./AQSs_Info/sensors.js";
console.log(nswMapData);
console.log(purpleairSensors);

function getPurpleAirInfo(markersInfo, featureGroups) {
  return new Promise(function (resolve, reject) {
    var activeMarker = null;

    // Create a DivIcon with custom HTML content
    var purpleairMarkerClusterGroup = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        const childCount = cluster.getChildCount();
        return L.divIcon({
          html: `<img src='./assets/images/markerPurpleAirCluster.svg'>
                  <span>${childCount}</span>`,
          className: "marker-cluster",
        });
      },
      showCoverageOnHover: false,
    });

    const purpleairSensorsData = purpleairSensors.data;

    for (let i = 0; i < purpleairSensorsData.length; i++) {
      const purpleairSensor = purpleairSensorsData[i];
      const purpleairSensorID = purpleairSensor[0];
      const purpleairSensorName = purpleairSensor[1];
      const purpleairSensorLatitude = purpleairSensor[2];
      const purpleairSensorLongitude = purpleairSensor[3];
      (function () {
        var purpleairLatLng = L.latLng([
          purpleairSensorLatitude,
          purpleairSensorLongitude,
        ]);
        let purpleairMarker = L.marker(purpleairLatLng).addTo(featureGroups);
        purpleairMarker
          .setIcon(colorMarker("purpleair"))
          .bindTooltip(purpleairSensorName, {
            direction: "top",
          });
        purpleairMarker.on("click", function () {
          if (activeMarker != null) {
            activeMarker.setIcon(colorMarker("purpleair"));
          }
          activeMarker = purpleairMarker;
          purpleairMarker.setIcon(colorMarker("selected"));

          generateMarkerContentPA(
            purpleairSensorID,
            purpleairSensorName,
            purpleairSensorLatitude,
            purpleairSensorLongitude
          )
            .then((content) => {
              sidebar.setContent(content).show();
            })
            .catch((error) => {
              console.error(error);
              // Handle the error if needed
            });

          // sidebar
          //   .setContent(
          //     generateMarkerContentPA(
          //       purpleairSensorID,
          //       purpleairSensorName,
          //       purpleairSensorLatitude,
          //       purpleairSensorLongitude
          //     )
          //   )
          //   .show();
        });
        purpleairMarkerClusterGroup.addLayer(purpleairMarker);
      })();
    }
    // Get the close button element
    const closeButton = document.querySelector(".close");
    // Add an event listener to the close button
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        if (activeMarker != null) {
          activeMarker.setIcon(colorMarker("purpleair"));
          activeMarker = null;
        }
      });
    }
    map.addLayer(purpleairMarkerClusterGroup);
    resolve(purpleairInfo);
  });
}

function generateMarkerContent(title, lat, lng) {
  const content = `
	  <div class="marker-content">

	  	<div class="marker-title-container">
			  <h2 class="marker-title">${title} Station</h2>
	  		<p class="marker-latlng"><b>Latitude:</b> ${lat} | <b>Longitude:</b> ${lng}</p>
        <div class="marker-title__tabs">
          <h3 class="tab-item active">Forecast</h3>
          <h3 class="tab-item">Relevant historical data</h3>
        </div>
      </div>
      
			<div class="tab-content">
        <div class="chart active">
          <canvas id="marker-chart-${title}" class="marker-chart" width="1" height="1"></canvas>
          <div class="stats">
            <h4>Current value of O3: </h4>
            <h4>Max value of O3: </h4>
            <h4>Stats</h4>
            <h5>MAE: </h5>
          </div>
        </div>
        <div class="chart">
          <canvas id="NO2-chart-${title}" class="NO2-chart" width="200" height="200"></canvas>
          <canvas id="WDR-chart-${title}" class="WDR-chart" width="200" height="200"></canvas>
          <canvas id="WSP-chart-${title}" class="WSP-chart" width="200" height="200"></canvas>
        </div>
      </div>
		</div>
	`;

  setTimeout(() => {
    const canvas1 = document.getElementById(`marker-chart-${title}`);
    const canvas2 = document.getElementById(`NO2-chart-${title}`);
    const canvas3 = document.getElementById(`WDR-chart-${title}`);
    const canvas4 = document.getElementById(`WSP-chart-${title}`);

    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const ctx3 = canvas3.getContext("2d");
    const ctx4 = canvas4.getContext("2d");

    if (canvas1) {
      getOzoneDataForLocation(title, "./AQSs_Info/forecast1.csv").then(
        (result) => {
          // extract data from forecastData
          const forecastXValues = result.forecastData.map((d) => d.date);
          const forecastYValues = result.forecastData.map((d) => d.ozone);
          // extract data from historyData
          const historyXValues = result.historyData.map((d) => d.date);
          const historyYValues = result.historyData.map((d) => d.ozone);
          // console.log(forecastXValues.map((x, i) => ({ x: x, y: forecastYValues[i] })));
          // console.log(historyXValues.map((x, i) => ({ x: x, y: historyYValues[i] })));

          const stationColorIndex = document.querySelector(
            ".marker-title-container"
          );
          if (forecastYValues[0] <= 2) {
            stationColorIndex.classList.add("good");
          } else if (forecastYValues[0] <= 3) {
            stationColorIndex.classList.add("fair");
          } else if (forecastYValues[0] <= 5) {
            stationColorIndex.classList.add("poor");
          } else {
            stationColorIndex.classList.add("very-poor");
          }

          // generate chart for both canvas elements
          generateChart(
            ctx1,
            forecastXValues,
            forecastYValues,
            historyXValues,
            historyYValues
          );
        }
      );
    }

    let tabs = document.querySelectorAll(".marker-title__tabs h3");
    let tabContents = document.querySelectorAll(".chart");
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabContents.forEach((content) => {
          content.classList.remove("active");
        });
        tabs.forEach((tab) => {
          tab.classList.remove("active");
        });
        // tabContents[index].classList.add('active');
        // tabs[index].classList.add('active');

        if (index === 0) {
          tabContents[index].classList.add("active");
          tabs[index].classList.add("active");
        } else {
          tabContents[index].classList.add("active");
          tabs[index].classList.add("active");
          getHistoryDataForLocation(
            title,
            "NO2",
            "./AQSs_Info/forecast1.csv"
          ).then((result) => {
            // extract data from historyData
            const historyXValues = result.map((d) => d.date);
            console.log(historyXValues);
            const historyYValues = result.map((d) => d.NO2);
            console.log(historyYValues);

            // generate chart for both canvas elements
            generateChart1(ctx2, "NO2", historyXValues, historyYValues);
          });
          getHistoryDataForLocation(
            title,
            "WDR",
            "./AQSs_Info/forecast1.csv"
          ).then((result) => {
            // extract data from historyData
            const historyXValues = result.map((d) => d.date);
            console.log(historyXValues);
            const historyYValues = result.map((d) => d.NO2);
            console.log(historyYValues);

            // generate chart for both canvas elements
            generateChart1(ctx3, "WDR", historyXValues, historyYValues);
          });
          getHistoryDataForLocation(
            title,
            "WSP",
            "./AQSs_Info/forecast1.csv"
          ).then((result) => {
            // extract data from historyData
            const historyXValues = result.map((d) => d.date);
            console.log(historyXValues);
            const historyYValues = result.map((d) => d.NO2);
            console.log(historyYValues);

            // generate chart for both canvas elements
            generateChart1(ctx4, "WSP", historyXValues, historyYValues);
          });
        }
      });
    });
  }, 0);
  return content;
}

const nwlng = 140.9992792;
const nwlat = -28.15701999;
const selng = 153.638889;
const selat = -37.50528021;

const fields = [
  "name",
  "location_type",
  "latitude",
  "longitude",
  "rssi",
  "pm1.0",
  "pm2.5_alt",
  "pm10.0",
  "temperature",
  "humidity",
  "last_seen",
];

// const url = `https://api.purpleair.com/v1/sensors?fields=${fields.join(
//   "%2C%20"
// )}&nwlng=${nwlng}&nwlat=${nwlat}&selng=${selng}&selat=${selat}`;

// Call the fetchData function initially when the page loads
// fetchData();

// if (humidity) {
//   console.log("Not reliable");
// }

// Call the fetchData function every 2 minutes using setInterval()
// setInterval(fetchData, 120000);

function generateMarkerContentPA(id, title, lat, lng) {
  return new Promise((resolve, reject) => {
    const url = `https://api.purpleair.com/v1/sensors/${id}?sensor_index=${id}&fields=${fields.join(
      "%2C%20"
    )}`;
    const fetchData = () => {
      fetch(url, {
        method: "GET",
        headers: {
          "X-API-Key": "D80F3AFD-DDAD-11ED-BD21-42010A800008",
        },
      })
        .then((responsePurpleAir) => responsePurpleAir.json())
        .then((dataPurpleAir) => {
          console.log(dataPurpleAir);
          const unixTimestamp = dataPurpleAir.sensor.last_seen;
          const formattedTime = new Date(unixTimestamp * 1000).toLocaleString(
            "en-AU"
          );
          const currTemp = (
            ((dataPurpleAir.sensor.temperature - 32) * 5) /
            9
          ).toFixed(2);
          console.log(dataPurpleAir.sensor);
          const content = `
            <div class="marker-content">
              <div class="marker-title-container">
                <h2 class="marker-title">${title} Station</h2>
                <p class="marker-latlng">
                  <b>Latitude:</b> ${lat} | <b>Longitude:</b> ${lng}
                </p>
              </div>

              <div class="tab-content">
                <div class="chart active">
                  <div class="stats">
                  <h4>PM1.0: ${dataPurpleAir.sensor["pm1.0"]}</h4>
                  <h4>PM2.5: ${dataPurpleAir.sensor["pm2.5_alt"]}</h4>
                  <h4>PM10.0: ${dataPurpleAir.sensor["pm10.0"]}</h4>
                  <h4>Temperature: ${currTemp}°C</h4>
                  <h4>Humidity: ${dataPurpleAir.sensor.humidity}%</h4>
                  <h4>Reliability: N/A</h4>
                  <h4>Time: ${formattedTime}</h4>
                  </div>
                </div>
              </div>
            </div>
          `;
          resolve(content);
        })
        .catch((error) => reject(error));
    };

    fetchData();

    // // Update the content every 1 minute
    // setInterval(() => {
    //   fetchData()
    //     .then((content) => {
    //       sidebar.setContent(content);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       // Handle the error if needed
    //     });
    // }, 1000);
  });
}

async function generateChart(
  context,
  forecastXValues,
  forecastYValues,
  historyXValues,
  historyYValues
) {
  new Chart(context, {
    type: "line",
    data: {
      labels: historyXValues.concat(forecastXValues),
      datasets: [
        {
          label: "Historical data",
          fill: false,
          backgroundColor: "rgba(255,0,255,1.0)",
          borderColor: "rgba(255,0,255,0.1)",
          data: historyXValues.map((x, i) => ({ x: x, y: historyYValues[i] })),
        },
        {
          label: "Forecast",
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: forecastXValues.map((x, i) => ({
            x: x,
            y: forecastYValues[i],
          })),
        },
      ],
    },
    options: {
      plugins: {
        annotation: {
          annotations: {
            vertLine: {
              type: "line",
              xMin: 12,
              xMax: 12,
              borderColor: "red",
              borderWidth: 2,
              label: {
                content: forecastYValues[0],
                enabled: true,
                position: "start",
                backgroundColor: "rgba(0,0,0,0.6)",
              },
            },
          },
        },
      },
      responsive: true,
      legend: {
        display: true,
        labels: {
          fontSize: 12,
          fontColor: "#333",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Forecast time",
          },
          ticks: {
            maxRotation: 90,
          },
        },

        y: {
          ticks: {
            suggestedMin: 0,
            suggestedMax: Math.max(...historyYValues, ...forecastYValues) * 1.1,
          },
          title: {
            display: true,
            text: "Ozone (ppb)",
          },
        },
      },
    },
  });
}

async function generateChart1(
  context,
  parameter,
  historyXValues,
  historyYValues
) {
  new Chart(context, {
    type: "line",
    data: {
      labels: historyXValues,
      datasets: [
        {
          label: "Forecast",
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(255,0,0,1.0)",
          borderColor: "rgba(255,0,0,0.5)",
          data: historyYValues,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: `${parameter} History Data`,
        fontSize: 15,
        fontColor: "#000000",
        fontStyle: "bold",
      },
      legend: {
        display: true,
        labels: {
          fontSize: 12,
          fontColor: "#333",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Forecast time",
          },
          ticks: {
            maxRotation: 90,
          },
        },
        y: {
          ticks: {
            suggestedMin: 0,
            suggestedMax: Math.max(...historyYValues) * 1.1,
          },
          title: {
            display: true,
            text: `${parameter} ()`,
          },
        },
      },
    },
  });
}

async function getOzoneDataForLocation(location, csvFilePath) {
  const response = await fetch(csvFilePath);
  const file = await response.text();
  const parsedData = Papa.parse(file, { header: true }).data;

  const locationHeader = `OZONE_${location.toUpperCase()}`;
  const data = parsedData.map((row) => parseFloat(row[locationHeader]));
  const forecastHours = parsedData.map((row) =>
    parseFloat(row["forecast_hours"])
  );
  const date = parsedData.map((row) =>
    new Date(row["datetime"]).toLocaleString(undefined, {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  var forecastData = [];
  for (let i = 0; i < data.length; i++) {
    if (!isNaN(forecastHours[i]) && forecastHours[i] > 0) {
      forecastData.push({ date: date[i], ozone: data[i] });
    }
  }
  var historyData = [];
  for (let i = 0; i < data.length; i++) {
    if (!isNaN(forecastHours[i]) && forecastHours[i] <= 0) {
      historyData.push({ date: date[i], ozone: data[i] });
    }
  }
  return { forecastData, historyData };
}

async function getHistoryDataForLocation(location, parameter, csvFilePath) {
  const response = await fetch(csvFilePath);
  const file = await response.text();
  const parsedData = Papa.parse(file, { header: true }).data;

  const locationHeader = `${parameter}_${location.toUpperCase()}`;
  const data = parsedData.map((row) => parseFloat(row[locationHeader]));
  const forecastHours = parsedData.map((row) =>
    parseFloat(row["forecast_hours"])
  );
  const date = parsedData.map((row) =>
    new Date(row["datetime"]).toLocaleString(undefined, {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const historyData = [];
  for (let i = 0; i < data.length; i++) {
    if (!isNaN(forecastHours[i]) && forecastHours[i] <= 0) {
      historyData.push({ date: date[i], NO2: data[i] });
    }
  }
  return historyData;
}

var nswBoundary = L.geoJSON(nswMapData, {
  style: function (geoJsonFeature) {
    return {
      color: "blue",
      opacity: 0.8,
      fillOpacity: 0,
      weight: 3,
    };
  },
}).addTo(map);

// var baseMaps = {
//   Default: osm,
//   "Ozone O3": StamenTerrain,
//   "PM2.5": StadiaAlidadeSmoothDark,
// };
// L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);

// Define a function to fetch data from the API

// Call the fetchData function initially when the page loads
// fetchData();

// Call the fetchData function every 1 minute using setInterval()
// setInterval(fetchData, 60000);

// var ind = 1;
// function change() {
//   var demo = document.getElementById("stat");
//   console.log(demo);
//   demo.innerHTML = (ind + 1) +"";
//   ind++;
//   console.log(demo.innerHTML);
// }
// change();
// setInterval(change, 1000);

const sensorsID = {
  sensor1: {
    id: 180263,
  },
  sensor2: {
    id: 180261,
  },
  sensor3: {
    id: 180259,
  },
  sensor4: {
    id: 180257,
  },
};
