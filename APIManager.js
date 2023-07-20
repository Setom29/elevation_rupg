"use strict";

class APIManager {
  constructor() {
    this._generatedPerson = {};
    this._savedUsers = [];
    this._usersURL = "https://randomuser.me/api/?results=7";
    this._pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
    this._quoteURL = "https://api.kanye.rest";
    this._meatURL =
      "https://baconipsum.com/api/?type=all-meat&format=json&paras=";

    this.gifsURL =
      "https://api.giphy.com/v1/gifs/search?api_key=kH6TdS5ZJ3HHIoxp4Mxsm8PdBiVkWL6s&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips&q=";
  }

  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static getCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  get generatedPerson() {
    return this._generatedPerson.getPersonData();
  }
  set generatedPerson(person) {
    this._generatedPerson = person;
  }

  savePerson() {
    for (let i = 0; i < this._savedUsers.length; i++) {
      if (
        JSON.stringify(this._generatedPerson.getPersonData()) ===
        JSON.stringify(this._savedUsers[i].getPersonData())
      ) {
        return;
      }
    }
    this._savedUsers.push(this._generatedPerson);
  }
  get savedUsers() {
    return APIManager.getCopy(
      this._savedUsers.map((person) => person.getPersonData())
    );
  }
  set savedUsers(val) {
    this._savedUsers.push(val);
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

  getUserAndFriendsData() {
    return this.fetchData(this._usersURL).then((data) => {
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
      this._pokemonURL + APIManager.getRandomNumber(1, 1010).toString() + "/"
    ).then((data) => {
      return {
        pokemonType: data.types[0].type.name,
        pokemonPictureLink: data.sprites.front_default,
        pokemonName: data.name,
      };
    });
  }
  getQuoteData() {
    return this.fetchData(this._quoteURL);
  }

  getMeatData() {
    return this.fetchData(
      this._meatURL + APIManager.getRandomNumber(1, 3).toString()
    );
  }

  getGIF(pokemonPromise) {
    // https://giphy.com/embed/rAm0u2k17rM3e
    return pokemonPromise.then((data) =>
      this.fetchData(this.gifsURL + data.pokemonName).then((data) =>{
        if (data.data.length === 0){
          return "https://giphy.com/embed/W04QVzelTHsNW" // if result is empty 
        } else {
          return data.data[0].embed_url
        }
      })
    );
  }

  getAllData() {
    const userAndFriendsPromise = this.getUserAndFriendsData();
    const pokemonPromise = this.getPokemonData();
    const quotePromise = this.getQuoteData();
    const meatPromise = this.getMeatData();
    const gifPromise = this.getGIF(pokemonPromise);
    return Promise.all([
      userAndFriendsPromise,
      pokemonPromise,
      quotePromise,
      meatPromise,
      gifPromise,
    ]);
  }
}

class PersonData {
  constructor(user, quote, pokemon, friends, meat, gif) {
    this._user = user;
    this._quote = quote;
    this._pokemon = pokemon;
    this._friends = friends;
    this._meat = meat;
    this._pokemonGIF = gif;
  }

  getPersonData() {
    return APIManager.getCopy({
      user: this._user,
      quote: this._quote,
      pokemon: this._pokemon,
      friends: this._friends,
      meat: this._meat,
      pokemonGIF: this._pokemonGIF,
    });
  }

  get user() {
    return APIManager.getCopy(this._user);
  }
  set user(val) {
    this._user = val;
  }
  get quote() {
    return APIManager.getCopy(this._quote);
  }
  set quote(val) {
    this._quote = val;
  }
  get pokemon() {
    return APIManager.getCopy(this._pokemon);
  }
  set pokemon(val) {
    this._pokemon = val;
  }
  get friends() {
    return APIManager.getCopy(this._friends);
  }
  set friends(val) {
    this._friends = val;
  }
  get meat() {
    return APIManager.getCopy(this._meat);
  }
  set meat(val) {
    this._meat = val;
  }
  get pokemonGIF() {
    return APIManager.getCopy(this._pokemonGIF);
  }
  set pokemonGIF(val) {
    this._pokemonGIF = val;
  }
}
