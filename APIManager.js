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
    this._savedUsers.push(this._generatedPerson);
  }
  get savedUsers() {
    return APIManager.getCopy(this._savedUsers.map(person => person.getPersonData()));
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
  getAllData() {
    const userAndFriendsPromise = apiManager.getUserAndFriendsData();
    const pokemonPromise = apiManager.getPokemonData();
    const quotePromise = apiManager.getQuoteData();
    const meatPromise = apiManager.getMeatData();

    return Promise.all([
      userAndFriendsPromise,
      pokemonPromise,
      quotePromise,
      meatPromise,
    ]);
  }
}

class PersonData {
  constructor(user, quote, pokemon, friends, meat) {
    this._user = user;
    this._quote = quote;
    this._pokemon = pokemon;
    this._friends = friends;
    this._meat = meat;
  }

  getPersonData() {
    return APIManager.getCopy({
      user: this._user,
      quote: this._quote,
      pokemon: this._pokemon,
      friends: this._friends,
      meat: this._meat,
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
}
