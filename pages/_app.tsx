import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import {
	ApolloProvider
} from "@apollo/client";
import { client } from "../src/apollo";
import { AuthProvider } from "../src/context";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<ApolloProvider client={ client }>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ApolloProvider>
		</SessionProvider>
	);
}

export default MyApp;
