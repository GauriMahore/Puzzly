export const generateRandom = (min = 0, max = 100) => {
	// find diff
	let difference = max - min;

	// generate random number
	let rand = Math.random();

	// multiply with difference
	rand = Math.floor(rand * difference);

	// add with min value
	rand = rand + min;

	return rand;
};

export const shuffleArray = (array) => {
	for (var i = array.length - 1; i > 0; i--) {
		// Generate random number
		var j = Math.floor(Math.random() * (i + 1));

		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
};
