const renderer = new Renderer();
const apiManager = new APIManager();

generateUser = () => {
  const userAndFriendsPromise = apiManager.getUserAndFriendsData();
  const pokemonPromise = apiManager.getPokemonData();
  const quotePromise = apiManager.getQuoteData();
  const meatPromise = apiManager.getMeatData();

  Promise.all([
    userAndFriendsPromise,
    pokemonPromise,
    quotePromise,
    meatPromise,
  ]).then((promiseResults) => {
    let [userAndFriendsData, pokemonData, quoteData, meatData] = promiseResults;
    apiManager.generatedPage = new PageData(
      userAndFriendsData.user,
      quoteData.quote,
      pokemonData,
      userAndFriendsData.friends,
      meatData
    );

    renderer.renderData(
      apiManager.generatedPage.pageData,
      apiManager.savedUsers
    );
  });
};

$("#generate-user").on("click", generateUser);
$("#save-user").on("click", () => {
  apiManager.savedUsers.push(apiManager.generatedPage);
  renderer.renderData(apiManager.generatedPage.pageData, apiManager.savedUsers);
});
$("#load-user").on("click", () => {
  const savedUsersDropdown = $("#saved-users-dropdown")
  console.log(savedUsersDropdown)
  renderer.renderData(apiManager.savedUsers[parseInt(savedUsersDropdown.val())].pageData, apiManager.savedUsers);
});

generateUser();
