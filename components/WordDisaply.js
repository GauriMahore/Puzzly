import { Heading } from "@chakra-ui/react";

const WordDisaply = ({ word, indexToHide }) => {
	let displayWord = "";
	for (let i = 0; i < word.length; i++) {
		if (i == indexToHide) {
			displayWord += "_";
			continue;
		}
		displayWord += word[i];
	}
	return (
		<Heading
			color={"gray.200"}
			letterSpacing="15px"
			fontSize="4xl"
			textTransform="uppercase"
		>
			{displayWord.toUpperCase()}
		</Heading>
	);
};

export default WordDisaply;
