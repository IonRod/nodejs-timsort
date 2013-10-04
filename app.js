var timrun = require('./timsort.js');

var arrayLength = 100;

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

var array = [];
initArray(array, arrayLength);
messArray(array);

console.log('Unsorted array:\n' + array);





