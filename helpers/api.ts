import axios from 'axios';
require('dotenv').config({path:'./.env'});
const key = process.env.API_KEY as string;
import {Weather, Current, Condition, Location} from '../types';

export const apiMain = async (city: string) => {
    
    city = city.toLocaleLowerCase();
    try{
        const response = await axios.get(
            `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3&aqi=no&alerts=no`
        );
        return response.data;
    }
    catch(error: any){
        console.log(error.message);
        return undefined;
        
    }

}