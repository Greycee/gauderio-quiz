/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #0d0d11e3;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  z-index: 10;
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://www.alura.com.br/">
        <img src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg" alt="Logo Alura" />
      </a>
      <p>
        Criado durante a {' '}
        <a href="https://www.alura.com.br/">
          <span>Imersão React da Alura</span>
        </a>
        {' '}
        por Greyce Riquinho.
        <br />
        Imagens: Guri de Uruguaiana - personagem de {' '}
        <a href="https://www.facebook.com/jairkobe">
          <span>Jair Kobe.</span>
        </a>
      </p>
    </FooterWrapper>
  );
}
