const sitesDetails = [
  {
    Site_Id: 33,
    SiteName: "RANDWICK",
    Longitude: 151.24278,
    Latitude: -33.93175,
    Region: "Sydney East",
  },
  {
    Site_Id: 39,
    SiteName: "ROZELLE",
    Longitude: 151.16395,
    Latitude: -33.86433,
    Region: "Sydney East",
  },
  {
    Site_Id: 70,
    SiteName: "LINDFIELD",
    Longitude: 151.1509,
    Latitude: -33.78113,
    Region: "Sydney East",
  },
  {
    Site_Id: 107,
    SiteName: "LIVERPOOL",
    Longitude: 150.90727,
    Latitude: -33.93132,
    Region: "Sydney South-west",
  },
  {
    Site_Id: 171,
    SiteName: "BRINGELLY",
    Longitude: 150.76192,
    Latitude: -33.91766,
    Region: "Sydney South-west",
  },
  {
    Site_Id: 190,
    SiteName: "CHULLORA",
    Longitude: 151.0461,
    Latitude: -33.89156,
    Region: "Sydney East",
  },
  {
    Site_Id: 206,
    SiteName: "EARLWOOD",
    Longitude: 151.13577,
    Latitude: -33.91619,
    Region: "Sydney East",
  },
  {
    Site_Id: 259,
    SiteName: "WYONG",
    Longitude: 151.43239,
    Latitude: -33.27891,
    Region: "Central Coast",
  },
  {
    Site_Id: 287,
    SiteName: "WALLSEND",
    Longitude: 151.67021,
    Latitude: -32.89435,
    Region: "Lower Hunter",
  },
  {
    Site_Id: 294,
    SiteName: "CARRINGTON",
    Longitude: 151.76335,
    Latitude: -32.90964,
    Region: "Newcastle Local",
  },
  {
    Site_Id: 295,
    SiteName: "STOCKTON",
    Longitude: 151.78429,
    Latitude: -32.90201,
    Region: "Newcastle Local",
  },
  {
    Site_Id: 300,
    SiteName: "NEWCASTLE",
    Longitude: 151.75965,
    Latitude: -32.9312,
    Region: "Lower Hunter",
  },
  {
    Site_Id: 304,
    SiteName: "MAYFIELD",
    Longitude: 151.72842,
    Latitude: -32.88488,
    Region: "Newcastle Local",
  },
  {
    Site_Id: 322,
    SiteName: "BERESFIELD",
    Longitude: 151.66099,
    Latitude: -32.79677,
    Region: "Lower Hunter",
  },
  {
    Site_Id: 340,
    SiteName: "TAMWORTH",
    Longitude: 150.91451,
    Latitude: -31.1099,
    Region: "North-west Slopes",
  },
  {
    Site_Id: 500,
    SiteName: "WOLLONGONG",
    Longitude: 150.88733,
    Latitude: -34.41706,
    Region: "Illawarra",
  },
  {
    Site_Id: 526,
    SiteName: "KEMBLA GRANGE",
    Longitude: 150.81913,
    Latitude: -34.47408,
    Region: "Illawarra",
  },
  {
    Site_Id: 573,
    SiteName: "RICHMOND",
    Longitude: 150.74731,
    Latitude: -33.61641,
    Region: "Sydney North-west",
  },
  {
    Site_Id: 574,
    SiteName: "BARGO",
    Longitude: 150.58061,
    Latitude: -34.30621,
    Region: "Sydney South-west",
  },
  {
    Site_Id: 640,
    SiteName: "ALBURY",
    Longitude: 146.93986,
    Latitude: -36.05182,
    Region: "South-west Slopes",
  },
  {
    Site_Id: 650,
    SiteName: "WAGGA WAGGA",
    Longitude: 147.360846,
    Latitude: -35.115598,
    Region: "South-west Slopes",
  },
  {
    Site_Id: 760,
    SiteName: "ST MARYS",
    Longitude: 150.76677,
    Latitude: -33.79512,
    Region: "Sydney North-west",
  },
  {
    Site_Id: 765,
    SiteName: "VINEYARD",
    Longitude: 150.847682,
    Latitude: -33.65623,
    Region: "Sydney North-west",
  },
  {
    Site_Id: 795,
    SiteName: "BATHURST",
    Longitude: 149.57456,
    Latitude: -33.40178,
    Region: "Central Tablelands",
  },
  {
    Site_Id: 914,
    SiteName: "PORT KEMBLA STEELWORKS",
    Longitude: 150.881703,
    Latitude: -34.47964,
    Region: "Port Kembla Steelworks",
  },
  {
    Site_Id: 919,
    SiteName: "PARRAMATTA NORTH",
    Longitude: 150.99777,
    Latitude: -33.7995,
    Region: "Sydney North-west",
  },
  {
    Site_Id: 1560,
    SiteName: "MACARTHUR",
    Longitude: 150.78218,
    Latitude: -34.07087,
    Region: "Sydney South-west",
  },
  {
    Site_Id: 1570,
    SiteName: "OAKDALE",
    Longitude: 150.49819,
    Latitude: -34.0517,
    Region: "Sydney South-west",
  },
  {
    Site_Id: 2921,
    SiteName: "ALBION PARK SOUTH",
    Longitude: 150.78252,
    Latitude: -34.57781,
    Region: "Illawarra",
  },
  {
    Site_Id: 333,
    SiteName: "MUSWELLBROOK",
    Longitude: 150.88563,
    Latitude: -32.27152,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 330,
    SiteName: "SINGLETON",
    Longitude: 151.17707,
    Latitude: -32.55734,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 3330,
    SiteName: "MAISON DIEU",
    Longitude: 151.06183,
    Latitude: -32.52468,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 2330,
    SiteName: "CAMBERWELL",
    Longitude: 151.09188,
    Latitude: -32.47231,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 1330,
    SiteName: "SINGLETON NW",
    Longitude: 151.15006,
    Latitude: -32.52981,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 5330,
    SiteName: "MOUNT THORLEY",
    Longitude: 151.128,
    Latitude: -32.63589,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 4330,
    SiteName: "BULGA",
    Longitude: 151.03598,
    Latitude: -32.64864,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 1650,
    SiteName: "WAGGA WAGGA NORTH",
    Longitude: 147.36037,
    Latitude: -35.10411,
    Region: "South-west Slopes",
  },
  {
    Site_Id: 1333,
    SiteName: "MUSWELLBROOK NW",
    Longitude: 150.88119,
    Latitude: -32.25317,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 2333,
    SiteName: "WYBONG",
    Longitude: 150.67342,
    Latitude: -32.19505,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 336,
    SiteName: "ABERDEEN",
    Longitude: 150.88415,
    Latitude: -32.17718,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 6330,
    SiteName: "SINGLETON SOUTH",
    Longitude: 151.20895,
    Latitude: -32.5871,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 7330,
    SiteName: "JERRYS PLAINS",
    Longitude: 150.86416,
    Latitude: -32.46622,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 8330,
    SiteName: "WARKWORTH",
    Longitude: 151.02721,
    Latitude: -32.57398,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 329,
    SiteName: "MERRIWA",
    Longitude: 150.45824,
    Latitude: -32.12665,
    Region: "Upper Hunter",
  },
  {
    Site_Id: 2560,
    SiteName: "CAMPBELLTOWN WEST",
    Longitude: 150.79558,
    Latitude: -34.06666,
    Region: "Sydney South-west",
  },
  {
    Site_Id: 2570,
    SiteName: "CAMDEN",
    Longitude: 150.69013,
    Latitude: -34.04168,
    Region: "Sydney South-west",
  },
  {
    Site_Id: 4560,
    SiteName: "CATARACT",
    Longitude: 150.823516,
    Latitude: -34.244788,
    Region: "Cataract RFS",
  },
  {
    Site_Id: 1107,
    SiteName: "LIVERPOOL SWAQS",
    Longitude: 150.93252,
    Latitude: -33.91889,
    Region: "Research Monitoring ",
  },
  {
    Site_Id: 113,
    SiteName: "MACQUARIE PARK",
    Longitude: 151.1178,
    Latitude: -33.76524,
    Region: "Sydney East",
  },
  {
    Site_Id: 9880,
    SiteName: "Tibooburra",
    Longitude: 142.057,
    Latitude: -29.4448,
    Region: "Western LLS",
  },
  {
    Site_Id: 390,
    SiteName: "NARRABRI",
    Longitude: 149.82932,
    Latitude: -30.31842,
    Region: "North-west Slopes",
  },
  {
    Site_Id: 380,
    SiteName: "GUNNEDAH",
    Longitude: 150.26069,
    Latitude: -30.98178,
    Region: "North-west Slopes",
  },
  {
    Site_Id: 9840,
    SiteName: "Bourke",
    Longitude: 145.952,
    Latitude: -30.0362,
    Region: "Western LLS",
  },
  {
    Site_Id: 94880,
    SiteName: "Broken Hill",
    Longitude: 141.469,
    Latitude: -32.0012,
    Region: "Western LLS",
  },
  {
    Site_Id: 9738,
    SiteName: "Euston",
    Longitude: 142.889,
    Latitude: -34.443,
    Region: "Western LLS",
  },
  {
    Site_Id: 9739,
    SiteName: "Buronga",
    Longitude: 142.201,
    Latitude: -34.1747,
    Region: "Western LLS",
  },
  {
    Site_Id: 9835,
    SiteName: "Cobar",
    Longitude: 145.829,
    Latitude: -31.4837,
    Region: "Western LLS",
  },
  {
    Site_Id: 9877,
    SiteName: "Condobolin",
    Longitude: 147.22832,
    Latitude: -33.06646,
    Region: "Central West LLS",
  },
  {
    Site_Id: 9794,
    SiteName: "Cowra",
    Longitude: 148.65413,
    Latitude: -33.83818,
    Region: "Central Tablelands LLS",
  },
  {
    Site_Id: 9731,
    SiteName: "Deniliquin",
    Longitude: 144.946,
    Latitude: -35.5575,
    Region: "Murray LLS",
  },
  {
    Site_Id: 9830,
    SiteName: "Dubbo",
    Longitude: 148.578,
    Latitude: -32.2195,
    Region: "Central West LLS",
  },
  {
    Site_Id: 9585,
    SiteName: "Kyalite",
    Longitude: 143.530932,
    Latitude: -35.033047,
    Region: "Murray LLS",
  },
  {
    Site_Id: 9680,
    SiteName: "Griffith",
    Longitude: 146.06981,
    Latitude: -34.24889,
    Region: "Riverina LLS",
  },
  {
    Site_Id: 9238,
    SiteName: "Gunnedah SE",
    Longitude: 150.269,
    Latitude: -31.0261,
    Region: "North West LLS",
  },
  {
    Site_Id: 9711,
    SiteName: "Hay",
    Longitude: 144.83449,
    Latitude: -34.5413,
    Region: "Riverina LLS",
  },
  {
    Site_Id: 9675,
    SiteName: "Hillston",
    Longitude: 145.52482,
    Latitude: -33.49147,
    Region: "Western LLS",
  },
  {
    Site_Id: 9878,
    SiteName: "Ivanhoe",
    Longitude: 144.154,
    Latitude: -33.0548,
    Region: "Western LLS",
  },
  {
    Site_Id: 9663,
    SiteName: "Junee",
    Longitude: 147.51,
    Latitude: -34.8254,
    Region: "Riverina LLS",
  },
  {
    Site_Id: 9648,
    SiteName: "Lake Victoria",
    Longitude: 141.063,
    Latitude: -34.0485,
    Region: "Western LLS",
  },
  {
    Site_Id: 9302,
    SiteName: "Lameroo",
    Longitude: 140.538,
    Latitude: -35.3778,
    Region: "SA Murray Darling Basin",
  },
  {
    Site_Id: 92648,
    SiteName: "Pooncarie",
    Longitude: 142.531,
    Latitude: -33.6016,
    Region: "Western LLS",
  },
  {
    Site_Id: 92551,
    SiteName: "Loddon Plains",
    Longitude: 144.319,
    Latitude: -36.4538,
    Region: "North Central CMA",
  },
  {
    Site_Id: 92731,
    SiteName: "Moolawatana",
    Longitude: 139.737,
    Latitude: -29.9072,
    Region: "SA Arid Lands",
  },
  {
    Site_Id: 9400,
    SiteName: "Moree",
    Longitude: 149.847,
    Latitude: -29.4897,
    Region: "North West LLS",
  },
  {
    Site_Id: 9700,
    SiteName: "Narrandera",
    Longitude: 146.514,
    Latitude: -34.705,
    Region: "Riverina LLS",
  },
  {
    Site_Id: 9870,
    SiteName: "Parkes",
    Longitude: 148.244,
    Latitude: -33.1277,
    Region: "Central West LLS",
  },
  {
    Site_Id: 9642,
    SiteName: "Rand",
    Longitude: 146.475,
    Latitude: -35.6296,
    Region: "Murray LLS",
  },
  {
    Site_Id: 9666,
    SiteName: "Temora",
    Longitude: 147.512,
    Latitude: -34.4278,
    Region: "Riverina LLS",
  },
  {
    Site_Id: 9832,
    SiteName: "Walgett",
    Longitude: 148.123,
    Latitude: -30.0359,
    Region: "North West LLS",
  },
  {
    Site_Id: 9507,
    SiteName: "Walpeup",
    Longitude: 142,
    Latitude: -35.12,
    Region: "Mallee CMA",
  },
  {
    Site_Id: 9671,
    SiteName: "West Wyalong",
    Longitude: 147.196,
    Latitude: -33.9384,
    Region: "Riverina LLS",
  },
  {
    Site_Id: 9836,
    SiteName: "White Cliffs",
    Longitude: 143.074,
    Latitude: -30.8517,
    Region: "Western LLS",
  },
  {
    Site_Id: 95880,
    SiteName: "Coombah",
    Longitude: 141.618344,
    Latitude: -32.976177,
    Region: "Western LLS",
  },
  {
    Site_Id: 9551,
    SiteName: "Wycheproof",
    Longitude: 143.355,
    Latitude: -36.0971,
    Region: "North Central CMA",
  },
  {
    Site_Id: 92650,
    SiteName: "Wagga Wagga North2",
    Longitude: 147.36037,
    Latitude: -35.10411,
    Region: "Riverina LLS",
  },
  {
    Site_Id: 1350,
    SiteName: "ARMIDALE",
    Longitude: 151.66173,
    Latitude: -30.50851,
    Region: "Northern Tablelands",
  },
  {
    Site_Id: 1800,
    SiteName: "ORANGE",
    Longitude: 149.09447,
    Latitude: -33.27429,
    Region: "Central Tablelands",
  },
  {
    Site_Id: 93496,
    SiteName: "Werrimull",
    Longitude: 141.566805,
    Latitude: -34.466564,
    Region: "Mallee CMA",
  },
  {
    Site_Id: 802,
    SiteName: "RR POD2",
    Longitude: 150.4102,
    Latitude: -34.4879,
    Region: "Incident Monitoring",
  },
  {
    Site_Id: 803,
    SiteName: "PORT MACQUARIE",
    Longitude: 152.88819,
    Latitude: -31.45405,
    Region: "Mid-North Coast",
  },
  {
    Site_Id: 9350,
    SiteName: "Armidale ",
    Longitude: 151.661658,
    Latitude: -30.50845,
    Region: "Northern Tablelands LLS",
  },
  {
    Site_Id: 61,
    SiteName: "BRADFIELD HIGHWAY",
    Longitude: 151.21109,
    Latitude: -33.84327,
    Region: "Roadside Monitoring",
  },
  {
    Site_Id: 780,
    SiteName: "KATOOMBA",
    Longitude: 150.299588,
    Latitude: -33.71028,
    Region: "Research Monitoring ",
  },
  {
    Site_Id: 155,
    SiteName: "ROUSE HILL",
    Longitude: 150.90366,
    Latitude: -33.68275,
    Region: "Sydney North-west",
  },
  {
    Site_Id: 99381,
    SiteName: "Gunnedah 2",
    Longitude: 150.260666,
    Latitude: -30.981876,
    Region: "North West LLS",
  },
  {
    Site_Id: 1001,
    SiteName: "COOK AND PHILLIP",
    Longitude: 151.21323,
    Latitude: -33.87288,
    Region: "Sydney East",
  },
  {
    Site_Id: 1580,
    SiteName: "GOULBURN",
    Longitude: 149.72416,
    Latitude: -34.73452,
    Region: "Southern Tablelands",
  },
  {
    Site_Id: 99801,
    SiteName: "Grafton",
    Longitude: 152.96063,
    Latitude: -29.62236,
    Region: "North Coast LLS",
  },
  {
    Site_Id: 99802,
    SiteName: "Taree",
    Longitude: 152.50861,
    Latitude: -31.88944,
    Region: "Bushfire Monitoring",
  },
  {
    Site_Id: 99803,
    SiteName: "Coffs Harbour",
    Longitude: 153.11806,
    Latitude: -30.29833,
    Region: "Bushfire Monitoring",
  },
  {
    Site_Id: 450,
    SiteName: "COFFS HARBOUR",
    Longitude: 153.11811,
    Latitude: -30.29828,
    Region: "Mid-North Coast",
  },
  {
    Site_Id: 811,
    SiteName: "LISMORE",
    Longitude: 153.293502,
    Latitude: -28.83213,
    Region: "Bushfire - Lismore (offline)",
  },
  {
    Site_Id: 99804,
    SiteName: "Batemans Bay",
    Longitude: 150.1872,
    Latitude: -35.7234,
    Region: "Bushfire Monitoring",
  },
  {
    Site_Id: 99805,
    SiteName: "Ulladulla",
    Longitude: 150.4828,
    Latitude: -35.3635,
    Region: "Bushfire Monitoring",
  },
  {
    Site_Id: 99806,
    SiteName: "Merimbula",
    Longitude: 149.89893,
    Latitude: -36.90775,
    Region: "South East LLS",
  },
  {
    Site_Id: 99807,
    SiteName: "Cooma",
    Longitude: 149.1331,
    Latitude: -36.2226,
    Region: "South East LLS",
  },
  {
    Site_Id: 1148,
    SiteName: "PROSPECT",
    Longitude: 150.91417,
    Latitude: -33.79424,
    Region: "Sydney North-west",
  },
  {
    Site_Id: 9480,
    SiteName: "Lismore",
    Longitude: 153.26275,
    Latitude: -28.83622,
    Region: "North Coast LLS",
  },
  {
    Site_Id: 1141,
    SiteName: "LIDCOMBE",
    Longitude: 151.04676,
    Latitude: -33.88143,
    Region: "Sydney East",
  },
  {
    Site_Id: 1750,
    SiteName: "PENRITH",
    Longitude: 150.70385,
    Latitude: -33.72687,
    Region: "Sydney North-west",
  },
  {
    Site_Id: 264,
    SiteName: "MORISSET",
    Longitude: 151.55257,
    Latitude: -33.10801,
    Region: "Lake Macquarie",
  },
  {
    Site_Id: 805,
    SiteName: "Test Site",
    Longitude: 151.042577,
    Latitude: -33.884341,
    Region: "Test Region",
  },
  {
    Site_Id: 15,
    SiteName: "ALEXANDRIA",
    Longitude: 151.197267,
    Latitude: -33.905317,
    Region: "Sydney East",
  },
  {
    Site_Id: 62,
    SiteName: "CAMMERAY",
    Longitude: 151.216707,
    Latitude: -33.827271,
    Region: "Research Monitoring ",
  },
];

const regionDetails = {
  "Sydney East": {
    largestLatitude: -33.76524,
    smallestLatitude: -33.93175,
    largestLongitude: 151.24278,
    smallestLongitude: 151.0461,
  },
  "Sydney South-west": {
    largestLatitude: -33.91766,
    smallestLatitude: -34.30621,
    largestLongitude: 150.90727,
    smallestLongitude: 150.49819,
  },
  Illawarra: {
    largestLatitude: -34.41706,
    smallestLatitude: -34.57781,
    largestLongitude: 150.88733,
    smallestLongitude: 150.78252,
  },
  "Sydney North-west": {
    largestLatitude: -33.61641,
    smallestLatitude: -33.7995,
    largestLongitude: 150.99777,
    smallestLongitude: 150.70385,
  },
  "Upper Hunter": {
    largestLatitude: -32.12665,
    smallestLatitude: -32.64864,
    largestLongitude: 151.20895,
    smallestLongitude: 150.45824,
  },
  "Lower Hunter": {
    largestLatitude: -32.79677,
    smallestLatitude: -32.9312,
    largestLongitude: 151.75965,
    smallestLongitude: 151.66099,
  },
};

export { sitesDetails, regionDetails };
