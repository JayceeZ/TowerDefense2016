/**
 * @author Jean-Christophe Isoard
 */

appTable.controller('MapCtrl', function($scope, socket) {
  // Template model
  $scope.message = "Phase de placement";
  $scope.map = new Map();
  $scope.stage = new PIXI.Container();

  var g = new PIXI.Graphics();
  g.lineStyle(0);
  g.beginFill(0xFFCC00, 1);
  g.drawCircle(20,20,20);
  g.endFill();
  $scope.stage.addChild(g);

  $scope.pixiRender = function pixiRender(g) {

  };


  socket.emit('performTestsMap');
});

appTable.directive('pixi', function($parse) {
  return {
    // template: '<canvas></canvas>',
    restrict: 'A',
    scope: false,
    controller: function postLink($scope, $element, $attrs) {

      var self = this,
        stageAttr = $parse($attrs.pixi),
        stage = stageAttr($scope),
        renderFunc = $scope.$eval($attrs.pixiRender);

      if (!stage) {
        // create a new instance of a pixi stage
        stage = new PIXI.Container();
        stageAttr.assign($scope, stage);
      }

      var antialias = $scope.$eval($attrs.pixiAntialias || 'false'),
        transparent = $scope.$eval($attrs.pixiTransparent || 'false'),
        rendererType = $scope.$eval($attrs.pixiRenderer || 'auto'),
        renderer;
      // create a renderer instance.
      switch (rendererType) {
        case 'canvas':
          renderer = new PIXI.CanvasRenderer($element.width(), $element.height(), $element[0], transparent);
          break;
        case 'webgl':
          try {
            renderer = new PIXI.WebGLRenderer($element.width(), $element.height(), $element[0], transparent, antialias);
          } catch (e) {
            $scope.$emit('pixi.webgl.init.exception', e);
            return;
          }
          break;
        default:
          renderer = PIXI.autoDetectRenderer($element.width(), $element.height(), $element[0], antialias, transparent);
      }

      this.render = function render(force) {
        var doRender = true;
        if (renderFunc) doRender = renderFunc(stage, renderer);

        // render the stage
        if (force || doRender !== false) renderer.render(stage);
      };

      function renderLoop() {
        self.render();
        requestAnimationFrame(renderLoop);
      }

      requestAnimationFrame(renderLoop);

      this.getStage = function() {
        return stage;
      };

      this.getRenderer = function() {
        return renderer;
      };

      this.getContext = function() {
        return renderer.gl ? renderer.gl : renderer.context;
      };

      // $($window).resize(function() {
      //     renderer.resize(element.width(), element.height())
      // })
    }
  };
});

appTable.directive("message", function() {
  return {
    restrict: "A",
    link: function(scope, element) {
      scope.$watch("message", function(newValue, oldValue) {
        element[0].content = newValue;
      });
    }
  };
});