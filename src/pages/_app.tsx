/* eslint-disable @next/next/no-page-custom-font */
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { store, persistor } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import '../../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<React.Fragment>
			<Head>
				<title>Code base Front End</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet" />
				{/* eslint-disable-next-line @next/next/no-css-tags */}
				<link rel="stylesheet" href="node_modules/xterm/css/xterm.css" />
				{/* eslint-disable-next-line @next/next/no-sync-scripts */}
				<script src="node_modules/xterm/lib/xterm.js"></script>
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
			</Head>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<NextUIProvider>
						<Component {...pageProps} />
						<Toaster />
					</NextUIProvider>
				</PersistGate>
			</Provider>
		</React.Fragment>
	)
}
