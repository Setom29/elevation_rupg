"use strict";
const renderer = new Renderer();
const apiManager = new APIManager();

const generateUser = () => {
  apiManager.getAllData().then((promiseResults) => {
    let [userAndFriendsData, pokemonData, quoteData, meatData] = promiseResults;
    apiManager.generatedPerson = new PersonData(
      userAndFriendsData.user, 
      quoteData.quote, 
      pokemonData,
      userAndFriendsData.friends,
      meatData
      )

    renderer.renderData(
      apiManager.generatedPerson,
      apiManager.savedUsers
    );
  });
};

$("#generate-user").on("click", generateUser);
$("#save-user").on("click", () => {
  apiManager.savePerson();
  renderer.renderData(apiManager.generatedPerson, apiManager.savedUsers);
});
$("#load-user").on("click", () => {
  const savedUsersDropdown = $("#saved-users-dropdown")
  if (savedUsersDropdown.val()){
    renderer.renderData(apiManager.savedUsers[parseInt(savedUsersDropdown.val())], apiManager.savedUsers);
  }
});

generateUser();
