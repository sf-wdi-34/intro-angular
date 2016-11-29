angular
  .module('noodleApp',[])
  .controller('NoodleController', NoodleController);

  function NoodleController() {
    var vm = this;
    vm.flavor = "delicious";
    vm.noodles = [
      {'name': 'spaghetti', 'sauce': 'tomato sauce'},
      {'name': 'macaroni', 'sauce': 'cheese'},
      {'name': 'udon', 'sauce': 'beef broth'}
    ];
  }
