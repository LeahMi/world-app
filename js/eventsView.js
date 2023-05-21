import { createCountry, showCountiesBySearch } from "./countryManager.js";

let countries = [];

export const declareEvents = () => {
    let id_form = document.querySelector("#id_form");
    // let id_home = document.querySelector("#id_home");

    let search = document.querySelector("#search-input");

    const links = document.querySelectorAll(".nav-link");

    links.forEach(function(link) {
    link.addEventListener('click', () => {
        if(link.getAttribute('value')){

            console.log(link.getAttribute('value'));
            createCountry(`${link.getAttribute('value')}`);
        }
    })
    });


    id_form.addEventListener("submit", e => {
        console.log(countries);
        e.preventDefault()
        showCountiesBySearch(search.value);
    })


    search.addEventListener("input", () => {
        displaySuggestions(getSuggestions(search.value));
    })
}

const getSuggestions = (currentText) => {
    const suggestions = [];
    countries.forEach(function (word) {
        if (word.startsWith(currentText)) {
            suggestions.push(word);
        }
    });
    return suggestions;
}

const displaySuggestions = (suggestions) => {
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = '';
    suggestions.forEach(function (suggestion) {
        const option = document.createElement('option');
        option.value = suggestion;
        dropdown.appendChild(option);
    });
}

export const countryList = (data) => {
    let sorted_arr = _.sortBy(data, "name.common");
    sorted_arr.forEach(item => {
        countries.push(item.name.common.toLowerCase());
    })
}