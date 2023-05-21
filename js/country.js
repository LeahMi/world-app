export default class Country{
    constructor(_parent, _item, _getCountryNameByCode, _createCountryByCode){
        this.parent = _parent;
        this.name = _item.name.common;
        this.pop = Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
          }).format(_item.population);
        this.capital = _item.capital ? _item.capital : "no info"; 
        this.flag = _item.flags.png;
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
        this.languages = _item.languages ? Object.values(_item.languages).join(", ") : "no info";
        this.borders = _item.borders ? _item.borders : "no info"; 
        this.countryCode = _item.cca3;
        this.coin = _item.currencies ? Object.keys(_item.currencies).join() : "no info";

        this.getCountryNameByCode = _getCountryNameByCode;
        this.createCountryByCode = _createCountryByCode;
    }

    getBorderNamesArr = async() =>{
        if(this.borders == "no info"){
            document.querySelector("#id_borders").innerHTML = `${this.borders}`
        }else{
            await this.borders.forEach(async(item) => { 
                if (item != "PSE") {
                    let name = await this.getCountryNameByCode(item); 
                    let span = document.createElement("span");
                    span.innerHTML = `${name} `;
                    span.style.cursor ="pointer";
                    span.addEventListener("mouseover", (event) => {
                        event.target.style.color = "rgba(0, 0, 0, 0.5)";
                    });
                    span.addEventListener("mouseleave", (event) => {
                        event.target.style.color = "black";
                    });
                    span.className ="span_country";
                    document.querySelector("#id_borders").append(span); 
                    span.addEventListener("click", () =>{
                        this.createCountryByCode(item);
                    })
                }
            })
        }
    }

    render(){
        let parent = document.querySelector(this.parent);
        parent.className = "container w-75 mx-auto my-5 card-deck row align-content-center justify-content-center";
        let div = document.createElement("div");
        div.className = "row m-0 p-0";
        div.style.height = "20%";
        div.setAttribute('data-aos', 'fade-down');
        div.setAttribute('data-aos-duration','1500');
        parent.append(div);
        div.innerHTML = `
        <h2 class="ms-2">${this.name}</h2>
            <div class="col-md-6 px-0">
            <table class="table table-striped h-100">
            <tbody>
            <tr>
                <th scope="col">Population</th>
                <td>${this.pop}</td>
            </tr>
            <tr>
                <th scope="row">Capital</th>
                <td>${this.capital}</td>
            </tr>
            <tr>
                <th scope="row">Languages</th>
                <td>${this.languages}</td>
            </tr>
            <tr>
                <th scope="row">Coins</th>
                <td>${this.coin}</td>
            </tr>
            <tr>
                <th scope="row">Bordering countries</th>
                <td id="id_borders"></td>
            </tr>
            </tbody>
            </table> 
            </div>

            <div class="col-md-6 px-0">
                <img class="w-100 h-100 mx-auto text-center" src="${this.flag}" alt="${this.name}">
            </div>
        `;
        let divMap = document.createElement('div');
        divMap.className = "map p-0";
        divMap.innerHTML = `
        <iframe width="100%" src="https://maps.google.com/maps?q=${this.lat},${this.lon}&z=7&ie=UTF8&iwloc=&output=embed"
            frameborder="0" scrolling="no" marginheight="0" marginwidth="0" loading="lazy">
        </iframe>`;
        parent.append(divMap);
        this.getBorderNamesArr();

    }

    prevRender(){
        let div = document.createElement("div");
        div.className = "firstCard card px-0 col-md-3 col-sm-6 m-3 text-center";
        div.setAttribute('data-aos', 'fade-down');
        div.setAttribute('data-aos-duration','1500');
        let parent = document.querySelector(this.parent);
        parent.append(div);
        div.innerHTML += `
            <img class="card-img-top h-75" src="${this.flag}" alt="${this.name}">
            <div class="card-body">
                <h5 class="card-title text-center">${this.name}</h5>
            </div> 
        `;
        div.addEventListener("click", () => {
            document.querySelector("#id_parent").innerHTML = "";
            this.render();
        });
    }

} 
