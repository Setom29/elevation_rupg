"use strict";

class Renderer {
  constructor() {
    this._userContainerTemplate = Handlebars.compile($("#user-container-template").html());
    this._pokemonContainerTemplate = Handlebars.compile($("#pokemon-container-template").html());

    this._userContainer = $(".user-container");
    this._quoteContainer = $(".quote-container")
    this._friendsContainer = $(".friends-container");
    this._pokemonContainer = $(".pokemon-container");
    this._meatContainer = $(".meat-container")
    this._savedUsersDropdownContainer = $("#saved-users-dropdown-container")
  }
  renderUserContainer(user) {
    const userInfoHTML = this._userContainerTemplate({
      userImageLink: user.userImageLink,
      userName: user.userName,
      userAdress: user.userAdress,
    });
    this._userContainer.html("");
    this._userContainer.append(userInfoHTML);
  }
  renderQuoteContainer(quote) {
    this._quoteContainer.html("");
    this._quoteContainer.append(
      $(
        `
            <p>Favorite quote:</p>
            <div>"${quote}"</div>
            <div>-Kanye West</div>
        `
      )
    );
  }
  renderPokemonContainer(pokemon) {
    const pokemonInfoHTML = this._pokemonContainerTemplate({
      pokemonPictureLink: pokemon.pokemonPictureLink,
      pokemonName: pokemon.pokemonName,
    });
    this._pokemonContainer.html("");
    this._pokemonContainer.append(pokemonInfoHTML);
  }
  renderFriendsContainer(friends) {
    
    this._friendsContainer.html("");
    const friendsList = $("<ul></ul>");

    friends.forEach((friend) => friendsList.append(`<li>${friend}</li>`));
    this._friendsContainer.append(friendsList);
  }

  renderMeatContainer(meatArr){
    this._meatContainer.html("<h4>About me</h4>")
    meatArr.forEach(el => {
      this._meatContainer.append(`<p class="meat-text">${el}</p>`);

    })
  }
  renderSavedUsersDropdown(savedUsers){
     
    const savedUsersDropdown = $(`
    <select id="saved-users-dropdown" name="saved-users-dropdown">
      <option value="" selected disabled hidden>Choose user</option>
    </select>
      `);
    this._savedUsersDropdownContainer.html("");
    for(let i = 0; i < savedUsers.length; i++){
      savedUsersDropdown.append(`<option value=${i}>${savedUsers[i].user.userName}</option>`)
    }

    this._savedUsersDropdownContainer.append(savedUsersDropdown);
  }

  renderData(data, savedUsers) {
    this.renderPokemonContainer(data.pokemon);
    this.renderUserContainer(data.user);
    this.renderQuoteContainer(data.quote);
    this.renderFriendsContainer(data.friends);
    this.renderMeatContainer(data.meat);
    if (savedUsers.length !== 0){
      this.renderSavedUsersDropdown(savedUsers)
    }
  }
}
