/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function MoreQuizPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen
        externalQuestions={externalDb.questions}
        externalBg={externalDb.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [project, user] = context.query.id.split('___');

  try {
    const externalDb = await fetch(`https://${project}.${user}.vercel.app/api/db`)
      .then((serverResponse) => {
        if (serverResponse.ok) {
          return serverResponse.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((responseConvertedToObject) => responseConvertedToObject);

    return {
      props: {
        externalDb,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
