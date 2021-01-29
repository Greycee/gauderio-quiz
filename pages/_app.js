/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VP23G4T2GP" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;700;900&display=swap" rel="stylesheet" />
        <meta name="title" content="Gaudério Quiz" />
        <meta name="description" content="O quanto tu sabe do vocabulário gaudério?" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gaudério Quiz" />
        <meta property="og:url" content="https://gauderio-quiz.greycee.vercel.app/" />
        <meta property="og:description" content="O quanto tu sabe do vocabulário gaudério?" />
        <meta property="og:image" content="https://i.ytimg.com/vi/JLBBtLLkz7w/maxresdefault.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://gauderio-quiz.greycee.vercel.app/" />
        <meta property="twitter:title" content="Gaudério Quiz" />
        <meta property="twitter:description" content="O quanto tu sabe do vocabulário gaudério?" />
        <meta property="twitter:image" content="https://i.ytimg.com/vi/JLBBtLLkz7w/maxresdefault.jpg" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
