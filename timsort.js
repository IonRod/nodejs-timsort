
var Pair = function(start) {
	this.start = start;
	this.end = 0;
	return this;
};

//--------------------------------------

var getMinrun = function(length) {
	console.log("About to calculate minrun for " + length);
	var r = 0;
	
	while(length >= 64) {
		r |= length & 1;
		length >>= 1;
	}
	length += r;
	
	console.log("Minrun is " + length);
	return length;
}

var splitArray = function(array, minrun) {
	console.log('About to splitArray');
	var length = array.length;
	var splitedArrays = [];
	var isAscend = true;
	var pos = 0;
	var bounds;
	
	while(pos < length) {	
		bounds = new Pair(pos);
		isAscend = (array[pos] <= array[pos+1]);
		pos += 2;
		
		if(isAscend) {
			while((pos < length - 1) && (array[pos] <= array[pos+1])) {
				pos++;
			}
		} else {
			while((pos < length - 1) && (array[pos] > array[pos+1])) {
				pos++;
			}
			
			for(var i = 0; i < (pos - bounds.start) / 2; i++) {
				array[i+bounds.start] = array[pos - i];
			}
		}
		
		if(pos - bounds.start < minrun) {
			bounds.end = bounds.start + minrun;
			if(bounds.end > length - 1) {
				bounds.end = length -1;
			}
		} else {
			bounds.end = pos;
		}
		
		pos = bounds.end + 1;
		splitedArrays.push(bounds);	
	}
	
	console.log('Splitted arrays: ');
	for(var i = 0; i < splitedArrays.length; i++ ) {
		console.log(splitedArrays[i]);
	}
	return splitedArrays;
}

function sort(array) {
	var length = array.length;
	var minrun = getMinrun(length);
	
	var arrays = splitArray(array, minrun);
}

module.exports = {
	'sort': sort,
};