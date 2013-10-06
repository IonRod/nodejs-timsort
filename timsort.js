
var Pair = function(start) {
	this.start = start;
	this.end = 0;
	this.toString = function() {
		return '(' + this.start + ', ' + this.end + ')';
	};
	this.size = function() {
		return this.end -this.start + 1;
	};
	return this;
};

//--------------------------------------

var getMinrun = function(length) {
//	console.log("About to calculate minrun for " + length);
	var r = 0;
	
	while(length >= 64) {
		r |= length & 1;
		length >>= 1;
	}
	length += r;
	
//	console.log("Minrun is " + length);
	return length;
};

var getRuns = function(array, minrun) {
//	console.log('About to getRuns');
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
		
		if(pos - bounds.start < minrun - 1) {
			bounds.end = bounds.start + minrun - 1;
			if(bounds.end > length - 1) {
				bounds.end = length -1;
			}
		} else {
			bounds.end = pos;
		}
		
		pos = bounds.end + 1;
		runs.push(bounds);	
	}
	
//	console.log('Splitted arrays: ');
	for(var i = 0; i < runs.length; i++ ) {
		console.log(runs[i].toString());
	}
	return runs;
};

//--------------------------------------

var sortRuns = function(array, runs) {
//	console.log('About to sortRuns');
	for(var i = 0; i < runs.length; i++) {
		sortRun(array, runs[i]);
	}
};

var sortRun = function(array, bounds) {
//	console.log('About to sort run with bounds: ' + bounds.toString());
	var key;
	
	var i = 0, j = 0;
	for(i = bounds.start + 1; i <= bounds.end; i++) {
		key = array[i];
		j = i-1;
		while((j >= bounds.start) && array[j] > key) {
			array[j+1] = array[j];
			j = j - 1;
		}
		array[j+1] = key;
	}

};

//--------------------------------------

var mergeRuns = function(array, bounds) {
	console.log('About to merge runs');
	var runStack = [];

	var last = 0;
	var run;
	var temp;

	while(bounds.length > 0) {
		runStack.push(bounds.pop());
		
		last = runStack.length - 1;
		
		while(last >= 2) {
			if((runStack[last].size() <= (runStack[last-1].size() + runStack[last-2].size())) || (runStack[last-1].size() <= runStack[last-2].size())) {				
				
				console.log('runStack values: ')
				for(var i = 0; i < runStack.length; i++ ) {
					console.log(runStack[i].toString());
				}
				
				if(runStack[last].size() <= runStack[last-2].size()) {
					run = mergeRun(array, runStack[last-1], runStack[last]);
					runStack.pop();
					runStack.pop();
					runStack.push(run);
				} else {
					run = mergeRun(array, runStack[last-1], runStack[last-2]);
					temp = runStack.pop();
					runStack.pop();
					runStack.pop();
					runStack.push(run);
					runStack.push(temp);
				}
			} else {
				break;
			}
			last = runStack.length - 1;
		}
	}

	if(runStack.length == 2) {
		mergeRun(array, runStack[0], runStack[1]);
	}
};

function selectRunsToMerge(array, runStack) {
	
}

function mergeRun(array, runA, runB) {
	console.log('About to merge runs: ' + runA + ' and ' + runB);
	var newRun = new Pair(0);
	
	if(runA.size() < runB.size()) {
		
	} else {
		
	}
	
	if(runA.start < runB.start) {
		newRun.start = runA.start;
	} else {
		newRun.start = runB.start;
	}
	
	if(runA.end < runB.end) {
		newRun.end = runB.end
	} else {
		newRun.end = runA.end;
	}
	console.log('New run is ' + newRun.toString() + ' with size ' + newRun.size());
	return newRun;
};

//--------------------------------------
function sort(array) {
	var length = array.length;
	var minrun = getMinrun(length);
	
	var runs = getRuns(array, minrun);
	
	if(runs.length > 1) {
		sortRuns(array, runs);
		mergeRuns(array, runs);
	}
}

module.exports = {
	'sort': sort,
};