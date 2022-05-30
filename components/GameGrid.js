import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { APLHABETS } from "../constants";
import { generateRandom, shuffleArray } from "../utils";
import GridBox from "./GridBox";

const GameGrid = ({
	gridConfig,
	compulsoryLeter,
	selectedLetter,
	handleSelectedLetterChange,
	currentWord,
}) => {
	const [displayLetters, setDisplayLetters] = useState([]);
	const [selectedIndex, setselectedIndex] = useState(null);
	const createBoard = () => {
		const size = gridConfig["rows"] * gridConfig["columns"];
		const tempArray = APLHABETS.filter(
			(item) => item.toLowerCase() !== compulsoryLeter.toLowerCase()
		);
		const arr = [];
		for (let i = 0; i < size; i++) {
			let random_index = generateRandom(0, size);
			arr.push(tempArray[random_index]);
		}
		let posForCompulsory = generateRandom(0, size);
		arr[posForCompulsory] = compulsoryLeter;
		setDisplayLetters(arr);
	};
	useEffect(() => {
		createBoard();
	}, [currentWord]);
	return (
		<>
			<Grid
				templateColumns={`repeat(${gridConfig["rows"]}, ${gridConfig["rows"]}fr)`}
				mt="1rem"
				gap={3}
			>
				{displayLetters.length
					? displayLetters.map((item, index) => {
							return (
								<GridItem key={index} margin="0">
									<GridBox
										isSelected={
											index === selectedIndex &&
											selectedLetter.toLowerCase() ===
												item.toLowerCase()
										}
										handleSelectedLetterChange={
											handleSelectedLetterChange
										}
										handleIndex={() =>
											setselectedIndex(index)
										}
										letter={item}
										index={index}
									/>
								</GridItem>
							);
					  })
					: null}
			</Grid>
		</>
	);
};

export default GameGrid;
