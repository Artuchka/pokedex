const { default: axios } = require("axios")
const { times } = require("lodash/fp")

const cardsContainer = document.querySelector("[data-card-container]")

const amountOfPokemons = 100
const api_url_pokemon_data = "https://pokeapi.co/api/v2/pokemon/"

const colors = {
	fire: "#FDDFDF",
	grass: "#DEFDE0",
	electric: "#FCF7DE",
	water: "#DEF3FD",
	ground: "#f4e7da",
	rock: "#d5d5d4",
	fairy: "#fceaff",
	poison: "#98d7a5",
	bug: "#f8d5a3",
	dragon: "#97b3e6",
	psychic: "#eaeda1",
	flying: "#F5F5F5",
	fighting: "#E6E0D4",
	normal: "#F5F5F5",
}

populatePokemons()

function populatePokemons() {
	cardsContainer.innerHTML = ""
	times(async (id) => {
		createPokemonCard(await getPokemonData(id))
	}, amountOfPokemons)
}

function createPokemonCard({ name, type, id, avatarURL }) {
	const card = document.createElement("div")
	card.classList.add("pokemon-card")
	card.innerHTML = `
            <div class="card_avatar">
                <img src="${avatarURL}" alt="">
            </div>
            <div class="card_id">${id}</div>
            <div class="card_name">${name}</div>
            <div class="card_type">${type}</div>
		`
	card.style.backgroundColor = colors[type]

	cardsContainer.append(card)
}

async function getPokemon(id) {
	const res = await fetch(api_url_pokemon_data + id)
	const data = await res.json()

	return data
}

async function getPokemonData(searchId) {
	const { name, types, id: rawId, sprites } = await getPokemon(searchId + 1)

	const { front_default: avatarURL } = sprites
	const type = types[0].type.name
	const id = rawId.toString().padStart(3, "0")

	return {
		name,
		type,
		id,
		avatarURL,
	}
}
