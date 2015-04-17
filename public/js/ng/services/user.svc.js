angular.module('pullPix')
    .service('UserSvc', function ($http, $window) {
        var svc = this;
        svc.getUser = function () {
            return $http.get('/users',{
                headers: {'X-Auth': this.token}
            })
                .then(function (response) {
                    return response.data;
                });
        };
        svc.login = function (username, password) {
            return $http.post('/sessions', {
                username: username, password: password
            }).then(function (response) {
                console.log("Res data " + response.data);
                $window.localStorage.setItem('access_token', response.data);
                $window.localStorage.setItem('username', username);
                svc.token = response.data;
                $http.defaults.headers.common['X-Auth'] = response.data;
                return svc.getUser();
            });
        };
        svc.register = function (username, password) {
            return $http.post('/users', {
                username: username, password: password
            }).then(function () {
                return svc.login(username, password);
            });
        };


//***************creates the update functionality***************
        svc.update = function(User) {
            return $http.put('/users', User);
        }
    });


//************create the delete functionality*****************




