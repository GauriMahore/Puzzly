import { Box } from "@chakra-ui/react";

const GridBox = ({
	letter,
	index,
	isSelected,
	handleSelectedLetterChange,
	handleIndex,
}) => {
	const handleClick = () => {
		handleSelectedLetterChange(letter.toLowerCase());
		handleIndex();
	};
	return (
		<Box
			width={"50px"}
			height={"50px"}
			display="flex"
			alignItems={"center"}
			justifyContent="center"
			borderRadius={"md"}
			color="white"
			bgColor={isSelected ? "orange.400" : "green.400"}
			transform={isSelected ? "scale(1.1)" : "scale(1)"}
			fontSize={"large"}
			fontWeight="bold"
			margin={0}
			transition="all 0.3s ease"
			_hover={
				!isSelected
					? {
							bgColor: "green.600",
							transform: "scale(1.1)",
					  }
					: {}
			}
			cursor="pointer"
			onClick={handleClick}
		>
			{letter.toUpperCase()}
		</Box>
	);
};

export default GridBox;
