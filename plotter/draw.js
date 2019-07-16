
var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);

calculator.setExpression({id:'graph1', latex:'y=x2', color: 'rgb(255,55,4)'});