import React from 'react';
import { Typography, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import { Add } from '@mui/icons-material';
import propTypes from 'prop-types';

function Accordion({ questionTypoVariant, answerTypoVariant, question, answer, questionColor, answerColor }) {
  const theme = useTheme();
  const colors = theme.palette;
  const red = colors.red.main;

  return (
    <MuiAccordion disableGutters sx={{ background: 'transparent!important', boxShadow: 'none!important' }}>
      <AccordionSummary
        expandIcon={<Add sx={{ color: red }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="ps-0"
      >
        <Typography variant={questionTypoVariant} color={questionColor} sx={{ overflowWrap: 'break-word' }}>
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="ps-0">
        <Typography variant={answerTypoVariant} color={answerColor} sx={{ overflowWrap: 'break-word' }}>
          {answer}
        </Typography>
      </AccordionDetails>
    </MuiAccordion>
  );
}

Accordion.propTypes = {
  question: propTypes.string.isRequired,
  answer: propTypes.string.isRequired,
  questionTypoVariant: propTypes.string,
  answerTypoVariant: propTypes.string,
  questionColor: propTypes.string,
  answerColor: propTypes.string,
};

Accordion.defaultProps = {
  questionTypoVariant: 'body1',
  answerTypoVariant: 'body1',
  questionColor: '#422438',
  answerColor: '#422438',
};

export default Accordion;
