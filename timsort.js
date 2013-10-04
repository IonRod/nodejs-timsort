
var Pair = function(start) {
	this.start = start;
	this.end = 0;
	this.toString = function() {
		return '(' + this.start + ', ' + this.end + ')';
	}
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
};

var getRuns = function(array, minrun) {
	console.log('About to getRuns');
	var length = array.length;
	var runs = [];
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
		runs.push(bounds);	
	}
	
	console.log('Splitted arrays: ');
	for(var i = 0; i < runs.length; i++ ) {
		console.log(runs[i].toString());
	}
	return runs;
};

//--------------------------------------

var sortRuns = function(array, runs) {
	console.log('About to sortRuns');
	for(var i = 0; i < runs.length; i++) {
		sortRun(array, runs[i]);
	}
};

var sortRun = function(array, bounds) {
	console.log('About to sort run with bounds: ' + bounds.toString());
	var min;
	var minPos;
	var temp;
	
	for(var i = bounds.start; i <= bounds.end; i++) {
		min = array[i];
		minPos = i;
		for(var j = i; j <= bounds.end; j++) {
			if(min<array[j]) {
				min = array[j];
				minPos = j;
			}
		}
		temp = array[i];
		array[i] = min;
		array[minPos] = temp;
	}
};

//--------------------------------------

function sort(array) {
	var length = array.length;
	var minrun = getMinrun(length);
	
	var runs = getRuns(array, minrun);
	
	sortRuns(array, runs);
}

module.exports = {
	'sort': sort,
};