import axios from "axios";

export const getRandomWord = (wordLength) =>
	axios.get(
		`https://random-word-api.herokuapp.com/word?length=${wordLength}`
	);
