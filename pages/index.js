/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import GitHubCorner from '../src/components/GitHubCorner';
import Link from '../src/components/Link';
// import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Gaudério Quiz</title>
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p style={{ fontSize: 'xx-large' }}>{db.description}</p>
          </Widget.Content>
          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input placeholder="Como é teu nome, tchê?" onChange={(e) => setName(e.target.value)} value={name} />
              <Button type="submit" disabled={name.length === 0}>Testar!</Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget style={{ marginBottom: '190px' }}>
          <Widget.Header>
            <h1>Veja também:</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>{db.external.map((externalLink) => {
              const [project, user] = externalLink
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('vercel.app', '')
                .split('.');
              return (<li key={externalLink}><Widget.Topic as={Link} href={`/quiz/${project}___${user}`}>{`${project} by ${user} `}</Widget.Topic></li>);
            })}
            </ul>
          </Widget.Content>
        </Widget>
      </QuizContainer>
      <Footer />
      <GitHubCorner projectUrl="https://github.com/Greycee" />
    </QuizBackground>
  );
}
