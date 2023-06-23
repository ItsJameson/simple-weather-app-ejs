import express from 'express';
import {apiMain} from './helpers/api'
import { Weather } from './types';
const app = express();

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('port', 3000);

let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

let dayOfWeek: string[] = [];

let apiData: Weather | undefined = undefined;

const getData = async(cityName: string) =>{
    try{
        apiData = await apiMain(cityName);
        dayOfWeek = apiData!.forecast.forecastday.map((day) => days[new Date(day.date).getDay()]);

        return apiData;
    }
    catch(error:any){
        console.log(error.message);
    }
}

app.get('/', async(req, res) => {
    apiData = await getData("Antwerp");
    
    res.render('index', {apiData: apiData, dayOfWeek: dayOfWeek, error : undefined});
});

app.post('/', async(req, res) => {
    let apiDataTemp = apiData;
    let searchQuery: string = req.body.search as string;

    if (searchQuery.match(/^[a-zA-Z0-9 ]*$/)){
        apiData = await getData(searchQuery);
        if (apiData){
            res.render('index', {apiData: apiData, dayOfWeek: dayOfWeek, error : undefined});
        }
        else{
            apiData = apiDataTemp;
            res.render('index', {apiData: apiData, dayOfWeek: dayOfWeek, error: "Not found"});
        }
    }
    else{
            apiData = apiDataTemp;
            res.render('index', {apiData: apiData, dayOfWeek: dayOfWeek, error: "Not found"});
    }
  
});

app.listen(app.get('port'), async() =>

    console.log('[server] http://localhost:' + app.get('port'))
);

export { }