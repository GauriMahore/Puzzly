import {
	Box,
	Button,
	Flex,
	Heading,
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Spinner,
	keyframes,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { GameGrid, Timer, WordDisaply } from "../components";
import { generateRandom, getRandomWord } from "../utils";
import { LEVELCONFIG } from "../constants";
import Confetti from "react-confetti";

const borderMagic = keyframes`
from { border-color: red; }
  to { border-color: white; }`;

let interval = null;
export default function Home() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [currentLevel, setCurrentLevel] = useState(0);
	const [currentWord, setCurrentWord] = useState("");
	const [currentRandomIndex, setCurrentRandomIndex] = useState(null);
	const [selectedLetter, setSelectedLetter] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);
	const [score, setScore] = useState(0);
	const [confetti, setConfetti] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [showReset, setShowReset] = useState(false);
	const toast = useToast();
	const gameReset = () => {
		setScore(0);
		setConfetti(false);
		onClose();
		setCurrentLevel(1);
		changeLevelHandle(1);
		setShowReset(false);
		setTimeRemaining(LEVELCONFIG[1]["time"] * 100);
	};
	useEffect(() => {
		if (interval) {
			if (timeRemaining <= 0) {
				clearInterval(interval);
				setCanSubmit(false);
				setShowReset(true);
				toast({ status: "error", title: "Time's up" });
			}
		}
	}, [timeRemaining]);
	useEffect(() => {
		if (currentLevel > 5) {
			setCurrentLevel(1);
		} else {
			let l = currentLevel ? currentLevel : 1;
			setTimeRemaining(LEVELCONFIG[l]["time"] * 100);
			interval = setInterval(() => {
				setTimeRemaining((current) => current - 1);
				if (timeRemaining < 0) {
					clearInterval(interval);
					setShowReset(true);
				}
			}, 1);
		}
		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [currentLevel, currentWord]);
	const changeLevelHandle = async (level) => {
		let res = null;
		try {
			res = await getRandomWord(
				LEVELCONFIG[level.toString()]["wordLength"]
			);
		} catch (err) {
			res = await getRandomWord(LEVELCONFIG[1]["wordLength"]);
		}
		setCurrentLevel(level);
		const word = res.data[0];
		setCurrentWord(word);
		const index = generateRandom(0, word.length);
		setCurrentRandomIndex(index);
		setSelectedLetter("");
		setCanSubmit(false);
	};
	useEffect(() => {
		if (currentLevel == 0) {
			changeLevelHandle(1);
		}
	}, []);
	useEffect(() => {
		if (selectedLetter.length > 0 && timeRemaining > 0) {
			setCanSubmit(true);
		}
	}, [selectedLetter]);
	const handleSubmit = () => {
		if (
			currentWord[currentRandomIndex].toLowerCase() ===
			selectedLetter.toLowerCase()
		) {
			toast({
				status: "success",
				title: "Guessed right",
				description: "Taking to next level",
			});
			setScore(score + 10);
			if (currentLevel === 5) {
				setConfetti(true);
				setTimeRemaining(10000);
				onOpen();
			} else if (currentLevel < 5) {
				changeLevelHandle(currentLevel + 1);
			}
		} else {
			toast({
				status: "error",
				title: "Guessed wrong!",
				description: "Will have to start from level 1 now.",
			});
			setTimeRemaining(0);
			setShowReset(true);
		}
	};
	const handleSelectedLetterChange = (newLetter) => {
		if (timeRemaining > 0) {
			setSelectedLetter(newLetter);
			return;
		}
		setSelectedLetter("");
	};
	return (
		<>
			{confetti ? <Confetti height={2000} width={2000} /> : null}
			<Head>
				<title>Puzzly - The puzzle story</title>
			</Head>
			<Heading
				color="green.200"
				fontSize="5xl"
				textAlign="center"
				lineHeight="15vh"
				h="15vh"
			>
				Puzzly
			</Heading>
			{currentRandomIndex !== null && currentLevel ? (
				<Flex
					width="60%"
					height="83vh"
					borderRadius="3xl"
					borderColor="green.200"
					borderWidth="4px"
					margin="auto"
					direction="column"
					alignItems="center"
					p={"1rem"}
					position="relative"
					animation={
						timeRemaining < 500
							? `${borderMagic} 0.5s infinite alternate-reverse`
							: ``
					}
				>
					<Timer
						time={timeRemaining}
						totalTime={LEVELCONFIG[currentLevel]["time"] * 100}
					/>
					{/* display current level */}
					<Box pos="absolute" right={8} top={5}>
						<Heading fontSize={"large"} color="whiteAlpha.600">
							{`Level : ${currentLevel}/5`}
						</Heading>
					</Box>
					<Box pos="absolute" left={8} top={5}>
						<Heading fontSize={"large"} color="whiteAlpha.600">
							{`Score : ${score}`}
						</Heading>
					</Box>
					<WordDisaply
						word={currentWord}
						indexToHide={currentRandomIndex}
					/>
					<GameGrid
						compulsoryLeter={currentWord[currentRandomIndex]}
						gridConfig={
							LEVELCONFIG[currentLevel.toString()]["gridConfig"]
						}
						handleSelectedLetterChange={handleSelectedLetterChange}
						selectedLetter={selectedLetter}
						currentWord={currentWord}
					/>
					<Flex gap={3} mt="auto">
						{showReset ? (
							<Button
								rightIcon={<ArrowForwardIcon />}
								colorScheme="red"
								marginTop="auto"
								variant={"outline"}
								size="md"
								onClick={gameReset}
							>
								Reset
							</Button>
						) : null}
						<Button
							rightIcon={<ArrowForwardIcon />}
							colorScheme="green"
							marginTop="auto"
							variant={"outline"}
							size="md"
							disabled={!canSubmit}
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Flex>
				</Flex>
			) : (
				<>
					<Flex
						width="100vw"
						height="50vh"
						justifyContent="center"
						alignItems="center"
					>
						<Spinner
							thickness="4px"
							speed="0.65s"
							emptyColor="gray.200"
							color="blue.500"
							size="xl"
						/>
					</Flex>
				</>
			)}
			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
				width={"400px"}
			>
				<ModalOverlay />
				<ModalContent maxW={"70vw"}>
					<ModalHeader>Game Finished Successfully</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Flex
							width={"100%"}
							direction="column"
							justifyContent={"center"}
							alignItems="center"
						>
							<Heading fontSize={"5xl"} color="gray.700">
								Congratulations !!!
							</Heading>
							<Heading
								fontSize={"6xl"}
								color="gray.300"
								mt={"2rem"}
							>
								{`Score : ${score}/50`}
							</Heading>
							<Heading
								fontSize={"3xl"}
								color="gray.800"
								mt={"2rem"}
							>
								5 Levels completed successfully
							</Heading>
							<Button
								variant="solid"
								onClick={gameReset}
								colorScheme="green"
								mt="2rem"
								size="lg"
							>
								Restart
							</Button>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
