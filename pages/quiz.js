/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';

const QuestionWidget = ({
  question,
  questionIndex,
  onSubmit,
  addResult,
}) => {
  const questionId = `question_${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const choseAlternative = selectedAlternative !== undefined;
  const isCorrect = selectedAlternative === question.answer;
  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${db.questions.length}`}</h3>
      </Widget.Header>
      <img
        style={{
          width: '100%', height: '150px', objectFit: 'contain', objectPosition: 'top',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          setQuestionSubmitted(true);
          setTimeout(() => {
            setQuestionSubmitted(false);
            onSubmit();
            addResult(isCorrect);
            setSelectedAlternative(undefined);
          }, 3000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={questionSubmitted && alternativeStatus}
              >
                <input name={questionId} type="radio" id={alternativeId} style={{ display: 'none' }} onChange={() => { setSelectedAlternative(alternativeIndex); }} />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!choseAlternative}>Confirmar</Button>
          {questionSubmitted && isCorrect && <p>Certo!</p>}
          {questionSubmitted && !isCorrect && <p>Errado!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
};

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
    </Widget>
  );
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tu acertou
        {' '}
        {/* {results.reduce((_, result) => {
          const correctAnswer = result === true;
          if (correctAnswer) { return result + 1; }
          return correctAnswer;
        }, 0)} */}
        {results.filter((x) => x).length}
        {' '}
        perguntas!
      </Widget.Header>
      <Widget.Content>
        <p>
          Domina
          {' '}
          {results.filter((x) => x).length}
          0% do vocabulário gauchês. Merece ou não merece um churrasco?!
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {console.log(index)}
              {result === true ? '✅' : '❌'}{' '}
              {index + 1}
              {' '}
              -
              {' '}
              {result === true ? 'Certo' : 'Errado'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = { QUIZ: 'QUIZ', LOADING: 'LOADING', RESULT: 'RESULT' };

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  const addResult = (result) => {
    setResults([...results, result]);
  };

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  const handleSubmit = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < db.questions.length) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  };

  return (
    <QuizBackground>
      <QuizContainer>
        {screenState === screenStates.QUIZ
          && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              onSubmit={handleSubmit}
              addResult={addResult}
            />
          )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
