import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
const theme = extendTheme({
	styles: {
		global: () => ({
			body: {
				bg: "",
			},
		}),
	},
});
function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
