import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ChoiceContextProvider } from "../context/ChoiceContext";
import { SlotsContextProvider } from "../context/SlotsContext";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
	colors: {
		primary: "#0070f3",
	},
};

export default function App({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle />
			<SlotsContextProvider>
				<ChoiceContextProvider>
					<ThemeProvider theme={theme}>
						<Component {...pageProps} />
					</ThemeProvider>
				</ChoiceContextProvider>
			</SlotsContextProvider>
		</>
	);
}
