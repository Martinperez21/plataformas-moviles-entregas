const containerPokemon = document.querySelector("#poke-container")
const spinner = document.querySelector("#spinner")
let offset = 1;
let limit = 150;

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data)
            spinner.style.display = "none";
        })
        .catch(error => alert(error));
}

function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
            fetchPokemon(i);
    }
}

function createPokemon(data){
    let pokemon = data
    let elemento = document.createElement("div")
    elemento.innerHTML = `
        <div class="col m-3 ">
            <div class="card pb-3 bg-dark text-white ">
                <h6 class="mt-2">
                    Nº${pokemon.id}
                </h6>
                <h5 class="card-title text-uppercase">
                    ${pokemon.name}
                </h5>
                <img src="${pokemon.sprites.front_default}" alt="">
                <button class="btn btn-success ms-3 me-3" type="button" data-bs-toggle="collapse" data-bs-target="#flush-${pokemon.id}" aria-expanded="false" aria-controls="collapseExample">
                    Informacion
                </button>
            </div>

            <div class="collapse mt-2" id="flush-${pokemon.id}">
                <div class="card card-body bg-dark text-white">
                <b>
                    Tipo: ${pokemon.types[0].type.name}
                </b>
                <b>
                    Altura: ${pokemon.height} cm
                </b>
                <b>
                    Peso: ${pokemon.weight} kg
                </b>
            </div>
        </div>
    `;
    containerPokemon.appendChild(elemento)
}
fetchPokemons(offset,limit);
