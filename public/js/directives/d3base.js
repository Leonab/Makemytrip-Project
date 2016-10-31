angular.module('d3directive',[])
    .directive('d3Bars', [function() {
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "@",
          onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {
          var svg = d3.select(iElement[0])
              .append("svg")
              .attr("width", "100%");

          // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };
          scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.data);
            }
          );

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){

            svg.selectAll("*").remove();

            // setup variables
            var width, height, max;
            width = d3.select(iElement[0])[0][0].offsetWidth - 20;

            height = scope.data.length * 20; 

            max = 98;

            svg.attr('height', height);

            //create the rectangles for the bar chart
            svg.selectAll("rect")
              .data(data)
              .enter()
                .append("rect")
				.on("click", function(d, i){return scope.onClick({item: d});})
                .attr("height", 0) // height of each bar
                .attr("width", 30) // initial width for transition
                .attr("y", height)
                .attr("x", function(d, i){
                  return i * 60 +22;
                })
                .transition()
                  .duration(1000) // time of duration
                  .attr("y", function(d){
                    return (height-10)-d.votes/(max/height);
                  })
                  .attr("height", function(d){
					  return d.votes/(max/height);
				  })
				  .attr("fill", "steelblue")

            svg.selectAll("text")
              .data(data)
              .enter()
                .append("text")
                .attr("fill", "#000")
                .attr("x", function(d, i){return i * 60 + 22;})
                .attr("y", height)
                .text(function(d){return d[scope.label];});

          };
        }
      };
    }]);