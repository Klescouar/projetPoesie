var app = angular.module('appPoesie', []);

app.controller('poesieCtrl', ["$scope", function($scope) {
    $scope.lol = "lol";
    $scope.categories = [{
        name: "Synonymes",
        status: false,
    }, {
        name: "Rimes",
        status: false,
    }, {
        name: "Anagrammes",
        status: false,
    }, {
        name: "Homophones",
        status: false,
    }, {
        name: "Antonymes",
        status: false,
    }];

    $scope.select = function() {
        if (this.category.status === false) {
            this.category.status = true;
        }
        else if (this.category.status === true) {
            this.category.status = false;
        }
    }
$scope.search = function(word){
  console.log(word);
}

}]);
