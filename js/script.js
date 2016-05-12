var app = angular.module('appPoesie', []);

app.controller('poesieCtrl', ["$scope", "$http", function($scope, $http) {



    $http.get("js/dico.json")
        .success(function(data) {
            $scope.dico = data;
            $scope.error = false;
            var DICOLENGTH = $scope.dico.length;

            $scope.search = function(word) {
                $scope.syno = [];
                $scope.ana = [];
                $scope.rimes = [];
                $scope.homo = [];

                if ($scope.categories[0].status == false && $scope.categories[1].status == false && $scope.categories[2].status == false && $scope.categories[3].status == false) {
                    $scope.error = true;
                }

                if ($scope.categories[0].status == true) {
                    for (var i = 0; i < $scope.dico[word].synonymes.length; i++) {
                        $scope.syno.push($scope.dico[word].synonymes[i]);
                    }
                }
                if ($scope.categories[2].status == true) {
                    for (var i = 0; i < $scope.dico[word].anagramme.length; i++) {
                        $scope.ana.push($scope.dico[word].anagramme[i]);
                    }
                }

                if ($scope.categories[1].status == true) {
                  console.log("lol");
                    var numPoint = $scope.dico[word].phonetique.lastIndexOf(".");
                    var lastSyl = $scope.dico[word].phonetique.slice(numPoint, $scope.dico[word].phonetique.length);
                    for (var i = 0; i < DICOLENGTH; i++) {
                        console.log("lol");
                        var numPointDico = $scope.dico[i].phonetique.lastIndexOf(".");
                        var lastSylDico = $scope.dico[i].phonetique.slice(numPointDico, $scope.dico[i].phonetique.length);
                        if (lastSyl = lastSylDico) {
                            $scope.rimes.push($scope.dico[i])
                        }
                    }
                }
                if ($scope.categories[3].status == true) {
                    for (var i = 0; i < $scope.dico[word].homophone.length; i++) {
                        $scope.homo.push($scope.dico[word].homophone[i]);
                    }
                }
            };
        });

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
    }];


    $scope.select = function() {
        if (this.category.status === false) {
            $scope.error = false;
            this.category.status = true;
        } else if (this.category.status === true) {
            this.category.status = false;
        }
    }
}]);
