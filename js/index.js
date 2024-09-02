// Fetch URL: https://api.tcgdex.net/v2/en/cards
const search = document.querySelector('#search');
const pokemonContainer = document.querySelector('#pokemonContainer');
let max = 20;
let count = 0;

search.addEventListener('input', () => {
    const url = 'https://api.tcgdex.net/v2/en/cards?name=' + search.value;

    if(search.value.length < 3){
        pokemonContainer.innerHTML = '';
        return;
    }
    
    fetch(url)
        .then(response => response.json())
        .then(json => {

            pokemonContainer.innerHTML = '';
            count = 0;

            for(const card of json){
                if(count >= max){
                    return;
                }

                if(!card.image){
                    continue;
                }

                const elem = document.createElement('div');
                elem.innerHTML = `<img class="pokemon" src="${card.image}/low.webp" alt="${card.name}">`;
                pokemonContainer.append(elem);
                count++;

                elem.addEventListener('click', () => {
                    alert(card.name);
                    search.value = card.name;

                    const event = new Event('input');
                    search.dispatchEvent(event);
                })

            }

        })
});
