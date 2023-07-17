const renderer = new Renderer();
const apiManager = new APIManager();

loadPage = () => {
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
    const page = new PageData(
      userAndFriendsData.user,
      quoteData.quote,
      pokemonData,
      userAndFriendsData.friends,
      meatData
    );
    renderer.renderData(page.pageData)
    // apiManager.data.push(page);
    // renderer.renderData(apiManager.data[apiManager.data.length - 1].pageData);
  });
};

const loadData = $("#generate-user").on("click", loadPage);

loadPage();
