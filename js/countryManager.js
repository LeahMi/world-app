import Country from "./country.js";

export let ar_countries = [];
const firstCountries = [ "israel", "united states", "france", "united kingdom", "thailand"];
export const getCountries = (data) =>{
    ar_countries = [...data];
}

export const showFirstCountries = () =>{
    document.querySelector("#id_parent").innerHTML = "";

    let ar_firstCountries = ar_countries.filter((item) =>
    firstCountries.includes(item.name.common.toLowerCase()));
    ar_firstCountries.forEach((item) => {    
        let country = new Country("#id_parent", item, getCountryNameByCode, createCountryByCode);
        country.prevRender();
    });
}

export const showCountiesBySearch = (input) =>{
    document.querySelector("#id_parent").innerHTML = "";

    let ar_filtered = ar_countries.filter((item) => 
        item.name.common.toLowerCase().startsWith(input.toLowerCase())
    );
    if(ar_filtered.length == 0){
        document.querySelector("#id_parent").innerHTML = `<h3 class="display-3 text-center">Country ${input} is not found</h3>`;
    }else{
    ar_filtered.forEach((item) => {
        let country = new Country("#id_parent", item, getCountryNameByCode, createCountryByCode);
        country.prevRender();
      });
    }
}
export const createCountry = (name) =>{
    document.querySelector("#id_parent").innerHTML = "";
    ar_countries.forEach((item) => {
        if(item.name.common.toLowerCase() == name.toLowerCase()){
            let country = new Country("#id_parent", item, getCountryNameByCode, createCountryByCode);
            country.render();
        }
      });
}

export const getCountryNameByCode = async(code) =>{
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    let res = await fetch(url);
    let data = await res.json();
    return data[0].name.common;
}

export const createCountryByCode = (code) => {
    document.querySelector("#id_parent").innerHTML = "";
  
    let ar = ar_countries.filter((item) =>
      item.cca3.toLowerCase().includes(code.toLowerCase())
    );
    ar.forEach((item) => {
        let country = new Country("#id_parent", item, getCountryNameByCode, createCountryByCode);
        country.render();
      });
}