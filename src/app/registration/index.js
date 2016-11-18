const template = require('./registration.html');
const mainSong = require('../../public/music/Main.ogg');

export const RegistrationCtrlName = 'RegistrationCtrl';

export const RegistrationCtrlState ={
  url:'/registration',
  template,
  controller: RegistrationCtrlName,
  controllerAs: 'registration',
  params: {
    errorMessage: null
  }
};

export const RegistrationCtrl = [
  '$scope',
  '$state',
  '$stateParams',
  'RegistrationServices',
  '$rootScope',
  '$timeout',
  'TimerService',
  class RegistrationCtrl {
    constructor($scope, $state, $stateParams, RegistrationServices, $rootScope, $timeout, TimerService) {
      TimerService.resetGame();

      this.registerData ={
        username: '',
        password: ''
      };
      this.$state = $state;
      this.timeD = false;

      if ($rootScope.currentSong._src !== mainSong) {
        $rootScope.setCurrentSong(mainSong);
      }

      $scope.userName = '';
      $scope.password = '';
      $scope.RegistrationServices = RegistrationServices;

      $scope.registerUser = () => {
        this.registerData.username = $scope.userName;
        this.registerData.password = $scope.password;
        RegistrationServices.registerUser(this.registerData)
          .success(response =>{
            if (response.success === true) {
              $rootScope.user = response.username;
              $rootScope.visible = true;
              if (this.timeD) {
                $timeout.cancel(timer)
              }
              this.timeD = $timeout(() => {
                this.$state.go('splash');
              }, 3000);
            }
        })
      };
      $scope.errorMessage = $stateParams.errorMessage;
    }
  }
];
