var app = angular.module('appPoesie', []);

app.controller('poesieCtrl', ["$scope", "$http", function($scope, $http) {



    $http.get("js/dico.json")
        .success(function(data) {
            $scope.dico = data;
            $scope.error = false;
            var dicolength = $scope.dico.length;
            console.log($scope.dico.length);

            $scope.search = function(word) {
                $scope.syno = [];
                $scope.ana = [];
                $scope.rimes = [];
                $scope.homo = [];

                if ($scope.categories[0].status == false && $scope.categories[1].status == false && $scope.categories[2].status == false && $scope.categories[3].status == false) {
                    $scope.error = true;
                }

                if ($scope.categories[0].status == true) {
                    if ($scope.dico[word].synonymes) {
                        for (var i = 0; i < $scope.dico[word].synonymes.length; i++) {
                            $scope.syno.push($scope.dico[word].synonymes[i]);
                            console.log($scope.syno);
                        }
                    } else {
                        $scope.syno.push("Pas de synonymes disponibles pour ce mot")
                    }
                }

                if ($scope.categories[2].status == true) {
                    if ($scope.dico[word].anagrammes) {
                        for (var i = 0; i < $scope.dico[word].anagrammes.length; i++) {
                            $scope.ana.push($scope.dico[word].anagrammes[i]);
                        }
                    } else {
                        $scope.ana.push("Pas d'anagrammes disponibles pour ce mot")
                    }
                }

                if ($scope.categories[1].status == true) {
                    var numPoint = $scope.dico[word].phonetique.lastIndexOf(".");
                    var lastSyl = $scope.dico[word].phonetique.slice(numPoint, $scope.dico[word].phonetique.length);
                    if (numPoint !== -1) {
                        for (var mots in $scope.dico) {
                            var numPointDico = $scope.dico[mots].phonetique.lastIndexOf(".");
                            var lastSylDico = $scope.dico[mots].phonetique.slice(numPointDico, $scope.dico[mots].phonetique.length);
                            if (lastSyl === lastSylDico && word !== mots) {
                                $scope.rimes.push(mots)
                            }
                        }
                    } else {
                        for (var mots in $scope.dico) {
                            var numPointDico = $scope.dico[mots].phonetique.lastIndexOf(".");
                            var lastSylDico = $scope.dico[mots].phonetique.slice(numPointDico, $scope.dico[mots].phonetique.length);
                            if (($scope.dico[word].phonetique === $scope.dico[mots].phonetique || $scope.dico[word].phonetique === lastSylDico) && word !== mots) {
                                $scope.rimes.push(mots)
                            }
                        }
                    }
                    if ($scope.rimes.length === 0) {
                      $scope.rimes.push("Pas de rimes disponibles pour ce mot  ")
                    }
                }
                if ($scope.categories[3].status == true) {
                    for (var mots in $scope.dico) {
                        if ($scope.dico[word].phonetique === $scope.dico[mots].phonetique && word !== mots) {
                            $scope.homo.push(mots)
                        }
                    }
                    if ($scope.homo.length === 0) {
                        $scope.homo.push("Pas d'homophones disponibles pour ce mot")
                    }
                };
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
