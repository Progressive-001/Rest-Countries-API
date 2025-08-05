// import data from './data.json';

document.addEventListener('DOMContentLoaded', () => {
  const countriesContainer = document.querySelector('.countriesContainer');
  const regionFilter = document.querySelector('#regionFilter');
  const searchInput = document.querySelector('#searchInput');
  const toggleTheme = document.querySelector('#toggleTheme');
  const body = document.querySelector('body');
  const countryCard = document.querySelector('.country-card');

  // console.log(regionFilter);
  

  let allCountries = []

  // fetch data

  // fetch('./data.json').then((response) => {
  // if (!response.ok) {
  //   throw new Error (`HTTP error! status: : ${response.status}`)
  // }

  // return response.json()

  // }).then(data => {
  //   console.log(data)
  // })

  async function fetchData(countries) {

    try{
     let response = await fetch('./data.json')
      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json()
      allCountries = data;

      if (countries) {
        countries(allCountries)
      }

    } catch ( error) {
      console.error("Error during fetch operation:", error);
    }
  }

  // Html template for rendering Countries
  const renderCountries = ((countries) => {
    countriesContainer.innerHTML = "";
    countries.forEach((country) => {
      let population = country.population.toLocaleString('en-US'); 
      const htmlTemp = 
        `
          <div class="country-card">
            <img class="country-flag" src=${country.flags.svg} alt="">
            <h3 class="country-name">${country.name}</h3>
            <p><strong>Population:</strong> <span class="country-population">${population}</span></p>
            <p><strong>Region:</strong> <span class="country-region">${country.region}</span></p>
            <p><strong>Capital:</strong> <span class="country-capital">${country.capital}</span></p>
          </div> 
        `
      countriesContainer.innerHTML += htmlTemp
    })
  });

  fetchData((countries) => {
    renderCountries(countries)
  }) 

  // Filtering and Searching Function
  function filterAndRender () {
    const selectedRegion = regionFilter.value;
    const searchCountry = searchInput.value.trim().toLowerCase();

    let filteredRegion = allCountries;
    
    if (selectedRegion === 'All' || !selectedRegion) {
      renderCountries(filteredRegion);

    }else {
        filteredRegion = filteredRegion.filter((country) => {
        return country.region === selectedRegion;
      })
    }
      if (searchCountry) {
      filteredRegion = filteredRegion.filter((country) => {
        return country.name.toLowerCase().includes(searchCountry);
      });
    }

    if (filteredRegion.length === 0) {
      countriesContainer.innerHTML = `<p>${searchCountry} does not exist</p>`;
    } else {
      renderCountries(filteredRegion);
    }
  }

  function handleToggleTheme(){
    body.classList.toggle("dark-mode")

    if (body.classList.contains("dark-mode")){
      // console.log(true);
      localStorage.setItem("theme", "dark")
      
    } else {
      // console.log(false);
        localStorage.setItem("theme", "light")
    }
    
  }

  if (localStorage.getItem("theme") === "dark"){
    body.classList.add("dark-mode")
  }

  
  function handleRedirect(e){
    const clickedCard = e.target.closest(".country-card")
    if (clickedCard){
      console.log(true);
        // Find the h2 element inside the clicked card
      const nameElement = clickedCard.querySelector('h3');
      
      // Get the text content directly from the h2 element
      const countryName = nameElement.textContent;
      console.log(countryName);
        
        if (countryName) {
          // Use `encodeURIComponent()` to properly format the name for the URL
          // The URL will look something like: `...html?name=United%20States%20of%20America`
          const encodedName = encodeURIComponent(countryName);
          const newUrl = `country.html?name=${encodedName}`;
          window.location.href = newUrl;

        }   
    } else {
      console.log(false); 
    }
  }

  regionFilter.addEventListener('change', filterAndRender);
  searchInput.addEventListener('input', filterAndRender);
  toggleTheme.addEventListener('click', handleToggleTheme);
  countriesContainer.addEventListener('click', handleRedirect);

})




  
  