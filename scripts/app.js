angular
  .module('pokemonApp', [])
  .controller('PokemonIndexController', PokemonIndexController);

PokemonIndexController.$inject = ['$http'];

function PokemonIndexController ($http) {
  var vm = this;
  vm.poke = {};
  vm.pokemon = [];
  vm.newPokemon={
    name: "Raichu",
    pokedex: "026",
    evolves_from: "Pikachu",
    image: "https://img.pokemondb.net/artwork/raichu.jpg"
  };
    
 
    $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/pokemon'
  }).then(function successCallback(response) {
    vm.pokemon = response.data.pokemon;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);

});

  vm.createPoke = function (newPoke) {
    console.log(newPoke)
    $http({
      method: 'POST',
      url: 'https://super-crud.herokuapp.com/pokemon',
      data: newPoke,
    }).then(function successCallback(response) {
      vm.pokemon.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }

  vm.editPoke = function (poke) {
    console.log(poke);
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/pokemon/' + poke._id,
      data: poke
    }).then(function successCallback(json) {
      // don't need to do anything!
      console.log("Success! "+poke.name+" was saved");
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

  vm.deletePoke = function (poke) {
    console.log(poke);
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/pokemon/' + poke._id
    }).then(function successCallback(json) {
      var index = vm.pokemon.indexOf(poke);
      vm.pokemon.splice(index,1)
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }
};


