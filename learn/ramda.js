const R = require('ramda')

var square = x => x * 2;
//console.log(R.map(square)([1, 2, 3]))
//console.log(R.map(square,[1, 2, 3]))

var reduce = x=>x-2
//R.compose(square(3),reduce(4))
console.log(R.compose(square,reduce)(4))
//console.log(R.compose(square,reduce(14))) //报错First argument to _arity must be a non-negative integer no greater than ten