import { Text, keyframes } from "@chakra-ui/react";
import React from "react";

const greenBlink = keyframes`
  from { color: green }
  to { color: white }
`;
const redBlink = keyframes`
  from { color: red; }
  to { color: white; }
`;

const Timer = ({ time, totalTime }) => {
	const s = Math.floor(time / 100);
	const ms = time - s * 100;
	const anim = (time / totalTime) * 100 < 20 ? redBlink : greenBlink;
	return (
		<Text
			color={"white"}
			animation={`${anim} 1s infinite alternate`}
			fontSize="2xl"
			fontWeight="bold"
			letterSpacing="2px"
		>{`${("0" + s).slice(-2)}:${("0" + ms).slice(-2)}`}</Text>
	);
};

export default Timer;
