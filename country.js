
document.addEventListener('DOMContentLoaded', async() => {
  const countryDetails = document.querySelector('.countryDetails');
  const toggleTheme = document.querySelector('#toggleTheme');
  const body = document.querySelector('body');

  const urlParams = new URLSearchParams(window.location.search)
  const name = urlParams.get('name')
  // console.log(name);

  async function fetchData(countries) {

  try{
    const response = await fetch('data.json');

    if (!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`)
    }

    const data = await response.json();
    if(countries){
      countries(data)
    }
    

    }catch(err){
        console.error("Error during fetch operation:", err)
    }

  }
    fetchData((countries) => {
      renderCountryDetails(countries)
    })

    function renderCountryDetails(countries){
      // console.log(countries);

      const countryName = countries.find((country) => {
        return country.name === name;
      })

      // if (countryName.borders && countryName.borders.length > 0) {
      //   countryName.borders.forEach(border => {
      //     // console.log(border)
      //   });
      // }

      let population = countryName.population.toLocaleString('en-US'); 
      const countryNames = countryName.borders.map(border => {
        const borderCountry = countries.find((bor) => bor.alpha3Code === border);
        return borderCountry ? `<a href="country.html?name=${encodeURIComponent(borderCountry.name)}" class="border-link">${borderCountry.name}</a>` : " ";
      }).join(", ")

      const htmlTemp =
         
        `
          <div class="countryDetails-1">

            <div class="countryFlagContainer">
              <img id="countryFlag" src=${countryName.flags.svg} alt="">
            </div>

            <div id="countryDetails-2" class="countryContainer">
              <h2 id="countryName"></h2>
              <div  class="countryCombine">
                <div  class="countryDetail-1">
                  <p><strong>Native Name:</strong> <span id="nativeName">${countryName.name}</span></p>
                  <p><strong>Population:</strong> <span id="population">${population}</span></p>
                  <p><strong>Region:</strong> <span id="region">${countryName.region}</span></p>
                  <p><strong>Sub Region:</strong> <span id="subRegion">${countryName.subregion}</span></p>
                  <p><strong>Capital:</strong> <span id="capital">${countryName.capital}</span></p>
                </div>
                <div class="countryDetail-2">
                  <p><strong>Top Level Domain:</strong> <span id="tld">${countryName.topLevelDomain}</span></p>
                  <p><strong>Currencies:</strong> <span id="currencies">${countryName.currencies.map((currency) => {return currency.name})}</span></p>
                  <p><strong>Languages:</strong> <span id="languages">${countryName.languages.map((language) =>  {return language.name}).join(", ")}</span></p>
                </div>
              </div>
              <p class="border"><strong>Border Countries:</strong> <span id="borderCountries">${countryNames}</span></p>
            </div>
          </div>
        `
        countryDetails.innerHTML += htmlTemp   
    }

      function handleToggleTheme(){
    body.classList.toggle("dark-mode")

    if (body.classList.contains("dark-mode")){
      localStorage.setItem("theme", "dark")
      
    } else {
        localStorage.setItem("theme", "light")
    }
    
  }

  if (localStorage.getItem("theme") === "dark"){
    body.classList.add("dark-mode")
  }

  toggleTheme.addEventListener('click', handleToggleTheme);



})