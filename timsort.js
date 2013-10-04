


var getMinrun = function GetMinrun(length) {
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


function sort(array) {
	var minrun;
	var length = array.length;
	
	minrun = getMinrun(length);
}

module.exports = {
	'sort': sort,
};