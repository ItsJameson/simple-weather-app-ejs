import express from "express";
import { apiMain } from "./helpers/api";
import { AppData, Weather } from "./types";
const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("port", 3020);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let standards: string[] = ["C", "F"];

let appData: AppData = {
  apiData: undefined,
  dayOfWeek: [],
  standard: standards[0],
  error: undefined,
};

let savedSearchQuery: string = "";

const getData = async (cityName: string) => {
  try {
    appData.apiData = await apiMain(cityName);
    appData.dayOfWeek = appData.apiData!.forecast.forecastday.map(
      (day) => days[new Date(day.date).getDay()]
    );
  } catch (error: any) {
    console.log(error.message);
  }
};

app.get("/", async (req, res) => {
  let apiDataTemp = appData.apiData;
  appData.error = undefined;

  if (savedSearchQuery === "" && !req.query.standard) {
    await getData("Antwerp");
    res.render("index", { appData });
  } else if (req.query.standard) {
    appData.apiData = apiDataTemp;
    appData.standard =
      standards[0] === req.query.standard ? standards[1] : standards[0];
    res.render("index", { appData });
  } else {
    await getData(savedSearchQuery);
    res.render("index", { appData });
  }
  
});

app.post("/", async (req, res) => {
  let apiDataTemp = appData.apiData;
  let searchQuery: string = req.body.search as string;
  appData.error = undefined;

  if (searchQuery.match(/^[a-zA-Z0-9 ]*$/)) {
    await getData(searchQuery);

    if (appData.apiData) {
      savedSearchQuery = searchQuery;
      res.render("index", { appData });
    } else {
      appData.apiData = apiDataTemp;
      appData.error = "Not Found";
      res.render("index", { appData });
    }
  } else {
    appData.apiData = apiDataTemp;
    appData.error = "Not Found";
    res.render("index", { appData });
  }
});

app.listen(app.get("port"), async () =>
  console.log("[server] http://localhost:" + app.get("port"))
);

export {};
