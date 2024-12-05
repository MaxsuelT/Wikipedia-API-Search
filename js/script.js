async function fetchJson(query){
    const BASE_URL = 'https://en.wikipedia.org/w/api.php'
    let params = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: query                              ,
        format: "json", 
        origin: "*",
        srlimit: 5
    })

    try{
        const response = await fetch(`${BASE_URL}?${params}`)
        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`)
        }
        const json = await response.json()
        
        const querySearch = json.query.search
        const noResults = json.query.searchinfo.totalhits
        
        if(noResults === 0){
            console.log("No results found.")
            
        }
        else{
            const results = querySearch
            updateDisplay(results)
        }

    }catch(error){
        console.log(error)
    }

    
}

function searchWikipedia(){
    const form = document.querySelector("form")
    let userInput = form.querySelector("input")
  
    form.addEventListener("submit", () =>{ 
        fetchJson(userInput.value)
        userInput.value = " "
    });

    
    
}

function updateDisplay(results){
    const sectionResults = document.querySelector("#section-results")
    sectionResults.innerHTML = ""


    results.forEach(result =>{
        const div = document.createElement('div')
        const a = document.createElement("a")
        const p = document.createElement("p");  
        a.href = `https://en.wikipedia.org/w/index.php?curid=${result.pageid}`
        a.innerHTML = result.title
        a.target = "_blank"
        p.innerHTML = `${result.snippet} ... `
        div.appendChild(a)
        div.appendChild(p)
        sectionResults.appendChild(div)
        
        
    })

}

window.addEventListener("DOMContentLoaded", searchWikipedia)

