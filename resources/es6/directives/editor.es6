export default /** @ngInject */  function() {
    if (angular.isUndefined(window.ace)) {
        throw new Error('Ace required');
    }

    return {
        restrict: 'EA',
        require: '?ngModel',
        link: function (scope, element, attributes, ngModel) {
            let editor = window.ace.edit(element[0]),
                session = editor.getSession(),
                options = scope.$eval(attributes.aceEditor);

            scope.fitEditorHeight = function() {
                let height = session.getScreenLength() * editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth();

                element.css('height', height.toString() + "px");
            };

            editor.setOption('useWorker', false);

            editor.commands.addCommand({
                name: 'save',
                bindKey: {
                    win: 'Ctrl-S',
                    mac: 'Command-S'
                },
                exec: function() {
                    // @TODO init save preferences from parent
                }
            });

            if (options.mode){
                session.setMode("ace/mode/"+options.mode);
            }

            if (options.theme) {
                editor.setTheme("ace/theme/"+options.theme);
            }

            scope.fitEditorHeight();

            element.on('$destroy', function () {
                editor.session.$stopWorker();
                editor.destroy();
            });

            scope.$watch(function() {
                return [element[0].offsetWidth, element[0].offsetHeight];
            }, function() {
                editor.resize();
                editor.renderer.updateFull();
            }, true);

            session.on('change', function(){
                scope.fitEditorHeight();
                ngModel.$setViewValue(session.getValue());
            });

            ngModel.$render = function(){
                session.setValue(ngModel.$viewValue);
            };
        }
    }
}
