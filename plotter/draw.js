var data;
$.getJSON("data.json", function(json) {
    data = json // this will show the info it in firebug console
});
var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);

calculator.setExpression({id:'graph1', latex:'y=x2', color: 'rgb(255,55,4)'});