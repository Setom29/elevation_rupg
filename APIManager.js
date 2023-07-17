class APIManager {
  constructor() {
    this.data = [];
    this.usersURL = "https://randomuser.me/api/?results=7";
    this.pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
    this.quoteURL = "https://api.kanye.rest";
    this.meatURL =
      "https://baconipsum.com/api/?type=all-meat&format=json&paras=";
  }

  fetchData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed");
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getUserAndFriendsData() {
    return this.fetchData(this.usersURL).then((data) => {
      let user = {};
      const friends = [];
      for (let i = 0; i < data.results.length; i++) {
        if (i === 0) {
          user = {
            userImageLink: data.results[i].picture.large,
            userName: `${data.results[i].name.first} ${data.results[i].name.last}`,
            userAdress: `${data.results[i].location.country}, ${data.results[i].location.city}`,
          };
        } else {
          friends.push(
            `${data.results[i].name.first} ${data.results[i].name.last}`
          );
        }
      }
      return { user: user, friends: friends };
    });
  }

  getPokemonData() {
    return this.fetchData(
      this.pokemonURL + this.getRandomNumber(1, 1010).toString() + "/"
    ).then((data) => {
      return {
        pokemonPictureLink: data.sprites.front_default,
        pokemonName: data.name,
      };
    });
  }
  getQuoteData() {
    return this.fetchData(this.quoteURL);
  }

  getMeatData() {
    return this.fetchData(this.meatURL + this.getRandomNumber(1, 3).toString());
  }
}

class PageData {
  constructor(user, quote, pokemon, friends, meat) {
    this.pageData = {
      user: user,
      quote: quote,
      pokemon: pokemon,
      friends: friends,
      meat: meat,
    };
  }
}
