
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
	var key;
	var minPos;
	var temp;
	
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
	
	/*
	 * for i = 2, 3, ..., n:  
    key := A[i]
    j := i - 1
    while j >= 1 and A[j] > key:
        A[j+1] := A[j]
        j := j - 1
    A[j+1] := key
	 */
};

//--------------------------------------

var mergeRuns = function(array, bounds) {
	console.log('About to merge runs');
	var runStack = [];

	var last = 0;
	var run;
	var temp;

	while(bounds.length > 0) {
		
		if(bounds.length > 0)
			runStack.push(bounds.pop());
		
		last = runStack.length - 1;
		
		while(last >= 2) {
			if((runStack[last] > runStack[last-1] + runStack[last-2]) || (runStack[last-1] > runStack[last-2])) {
				if(runStack[last] > runStack[last-2]) {
					run = mergeRun(array, runStack[last-1], runStack[runStack[last]]);
					runStack.pop();
					runStack.pop();
					runStack.push(run);
				} else {
					run = mergeRun(array, runStack[last-1], runStack[runStack[last-2]]);
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
			console.log('Last is ' + last);
		}
		
		console.log('Bounds length is' + bounds.length);
		if(bounds.length == 0) {
			while(runStack.length > 1) {
				run = mergeRun(array, runStack.pop(), runStack.pop());
				runStack.push(run);
			}
		}
	}
};

function selectRunsToMerge(array, runStack) {
	
}

function mergeRun(array, runA, runB) {
	console.log('About to merge runs: ' + runA + ' and ' + runB);
	var newRun = new Pair(0);
	
	if((runA.end-runA.start) < (runB.end-runB.start)) {
		
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
	console.log('New run is ' + newRun.toString());
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