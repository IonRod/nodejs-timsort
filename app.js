var timsort = require('./timsort.js');

//------------------------------------------------
var initArray = function(array, length) { 
	for(var i=0; i < length; i++) {
		array.push(i);
	}
};

var messArray = function(array) {
	var length = array.length;
	var temp;
	var moveTo = 0;
	
	for(var i = 0; i < length; i++) {
		moveTo = Math.floor((length-1)*Math.random());
		temp = array[moveTo];
		array[moveTo] = array[i];
		array[i] = temp;
	}
};

//------------------------------------------------

var array = [];
var arrayLength = 128;

initArray(array, arrayLength);
//console.log('Initial array:\n' + array + '\n');

messArray(array);
//console.log('Unsorted array:\n' + array + '\n');

timsort.sort(array);
console.log('Sorted array:\n' + array + '\n');


