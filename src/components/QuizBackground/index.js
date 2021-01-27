import styled from 'styled-components';
import db from '../../../db.json'

const QuizBackground = styled.div`
  width: 100%;
  background-size: cover;
  background-position: bottom;
  background-image: url(${db.bg});
  flex: 1;
    }
    *:first-child {
      position: relative;
      z-index: 10;
    }
  }
`;

export default QuizBackground;