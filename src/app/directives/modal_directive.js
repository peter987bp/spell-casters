export const modal = [
  'ModalService',
  'LogoutService',
  (ModalService, LogoutService) => {
  return {
    link: function (scope, element, attrs) {
      scope.view = false;
      if (!attrs.id) {
        console.error('modal have no id');
        return;
      }

      element.on('click', function (e) {
        switch (e.target.innerText) {
          case 'Logout':
            ModalService.closeModal(attrs.id);
            LogoutService.userOut('user', 'Guest', false, 'splash');
          break;
          case 'Cancel':
            ModalService.closeModal(attrs.id);
            scope.$digest();
          break;
          default:
            ModalService.closeModal(attrs.id);
            scope.$digest();
        }
      });

      let modal = {
        id: attrs.id,
        open: viewOn,
        close: viewOff
      };
      ModalService.addModal(modal);

      function viewOn() {
        scope.view = true;
      }

      function viewOff() {
        scope.view = false;
      }

      scope.$on('$destroy', function() {
        ModalService.removeModal(attrs.id);
        element.remove();
      });

    }
  }
}];