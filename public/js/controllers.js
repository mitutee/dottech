'use strict';

/* Controllers */
let controllers = {};

controllers.RootLoginCtrl = function ($scope, $location, $cookies, authService, flashMessageService) {
    $scope.credentials = {
        username: 'mitutee',
        password: 'q1w2e3r4'
    };
    $scope.login = function (credentials) {
        authService.login(credentials).then(function (res) {
            $cookies.loggedInUser = res.data;
            $location.path('/root/pages');
        }, function (err) {
            flashMessageService.setMessage(err);
        })
    }
};

controllers.RootPagesCtrl = function ($scope, pagesService, flashMessageService) {
    flashMessageService.setMessage('Hello')
    pagesService.getPages().then(function (res) {
        $scope.allPages = res.data;
    }, function (err) {
        throw err;
    })
};

controllers.RootEditPageCtrl = function ($scope,
    $routeParams,
    pagesService,
    $location,
    flashMessageService,
    $log, $filter) {
    $scope.pageContent = {};
    $scope.pageContent._id = $routeParams.id;
    $scope.heading = "Add a New Page";

    $scope.updateURL = function () {
        $scope.pageContent.url = $filter('formatURL')($scope.pageContent.title);
    };

    if ($scope.pageContent._id != 0) {
        $scope.heading = "Update page";

        this.pageContent = pagesService.getPage_AsRoot($scope.pageContent._id).then(
            function (res) {
                $scope.pageContent = res.data;
                $log.info($scope.pageContent);
            },
            function (err) {
                flashMessageService.setMessage(err.data);
            }
        );
    }

    $scope.savePage = function () {
        pagesService.savePage($scope.pageContent).then(
            function () {
                flashMessageService.setMessage("Page Saved Successfully");
                $location.path('/root/pages');
            },
            function (err) {
                flashMessageService.setMessage("Page Saved Successfully");
            }
        )
    }
};

controllers.RootLogCtrl = function ($scope, rootService) {

    $scope.logFile = 'Loading logs..';
    rootService.getLog().then(function (data) {
        $scope.logFile = data;
    }, function (err) {
        $scope.logFile = err;
    });
};


angular.module('myApp.controllers', []).controller(controllers)
