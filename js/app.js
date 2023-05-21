import {getCountries, showFirstCountries} from "./countryManager.js";
import {declareEvents, countryList} from "./eventsView.js";
const init = () => {
    doApi();
    declareEvents();
}
  
const doApi = async() => {
  let url = "https://restcountries.com/v3.1/all";
  let res = await fetch(url);
  let data = await res.json();
  data = data.filter(item => item.name.common != "Palestine")
  getCountries(data);
  showFirstCountries();
  countryList(data);
}

init()


