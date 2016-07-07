'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, User) {
  console.log('mainCtrl!');

  $scope.logout = () => {
    User.logout()
      .then(()=>{
        $state.go('home');
      })
  };
});

app.controller('homeCtrl', function($scope, $state, Message){


})

app.controller('profileCtrl', function(CurrentUser, $scope, Message, User) {
  console.log('profileCtrl!');
  $scope.editProfileArea = false;
  $scope.profileArea = true;
  console.log('CurrentUser:', CurrentUser);
  $scope.currentUser = CurrentUser.data;
  $scope.messages = [];

  Message.get()
    .then(res => {
      console.log("res.data: ",res.data);
      $scope.messages = res.data;
    })
    .catch(err => {
      console.log("err: ",err);
    })


  $scope.saveEditProfile = () => {
    console.log("$scope.myInfo: ", $scope.myInfo);
    User.edit($scope.myInfo._id, $scope.myInfo)
      .then(res => {
        console.log("res: ",res);
        $scope.editProfileArea = false;
        $scope.profileArea = true;
      })
      .catch(err => {
        console.log("err: ",err);
      })
  }

  $scope.editProfile = () => {
    $scope.editProfileArea = true;
    $scope.profileArea = false;
    $scope.myInfo = $scope.currentUser;
  }

  $scope.cancelEditArea = () => {
    $scope.editProfileArea = false;
    $scope.profileArea = true;
  }

  $scope.postMessage = () => {
    let userId = $scope.currentUser._id;
    let userName = $scope.currentUser.name;
    let userImage = $scope.currentUser.imageUrl;
    // console.log("userId: ",userId);
    $scope.msg.userId = userId;
    $scope.msg.userName = userName;
    $scope.msg.userImage = userImage;
    console.log("$scope.msg: ", $scope.msg);
    Message.postMessage($scope.msg)
      .then(res => {
        console.log("posted");
        $scope.msg = null;
      })
      .catch(err => {
        console.log("err: ",err);
      })
  }

})



app.controller('loginCtrl', function($scope, $state, User) {
  console.log('loginCtrl!');

  console.log('$state:', $state);

  $scope.login = () => {
    User.login($scope.user)
      .then(res => {
        $state.go('home');
        console.log("res: ",res);
      })
      .catch(err => {
        console.log('err:', err);
        swal('Register failed. \nError in console.');
      });
  };

});

app.controller('registerCtrl', function($scope, $state, User) {
  console.log('registerCtrl!');
  $scope.register = () => {
    // console.log("$scope.user: ",$scope.user);

    if($scope.user.password !== $scope.user.password2) {
      // passwords don't match
      $scope.user.password = null;
      $scope.user.password2 = null;
      swal({   title: "Passwords were not match!",   text: "Try again",   timer: 2000,   showConfirmButton: false });
      // swal('Passwords must match.  Try again.');
    } else {
      // passwords are good
      User.register($scope.user)
        .then(res => {
          $state.go('login');
        })
        .catch(err => {
          console.log('err:', err);
          alert('Register failed. Error in console.');
        });
    }
  }

});
