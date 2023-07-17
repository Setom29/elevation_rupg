class Renderer {
  constructor() {}
  renderUserContainer(user) {
    const source = $("#user-container-template").html();
    const template = Handlebars.compile(source);
    const userInfoHTML = template({
      userImageLink: user.userImageLink,
      userName: user.userName,
      userAdress: user.userAdress,
    });
    $(".user-container").html("");
    $(".user-container").append(userInfoHTML);
  }
  renderQuoteContainer(quote) {
    $(".quote-container").html("");
    $(".quote-container").append(
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
    const source = $("#pokemon-container-template").html();
    const template = Handlebars.compile(source);
    const pokemonInfoHTML = template({
      pokemonPictureLink: pokemon.pokemonPictureLink,
      pokemonName: pokemon.pokemonName,
    });
    $(".pokemon-container").html("");
    $(".pokemon-container").append(pokemonInfoHTML);
  }
  renderFriendsContainer(friends) {
    const friendsContainer = $(".friends-container");
    friendsContainer.html("");
    const friendsList = $("<ul></ul>");

    friends.forEach((friend) => friendsList.append(`<li>${friend}</li>`));
    friendsContainer.append(friendsList);
  }

  renderMeatContainer(meat){
    const meatContainer = $(".meat-container")
    meatContainer.html("<h4>About me</h4>")
    meat.forEach(el => {
        meatContainer.append(`<p class="meat-text">${el}</p>`);

    })
  }

  renderData(data) {
    this.renderPokemonContainer(data.pokemon);
    this.renderUserContainer(data.user);
    this.renderQuoteContainer(data.quote);
    this.renderFriendsContainer(data.friends);
    this.renderMeatContainer(data.meat);
  }
}
