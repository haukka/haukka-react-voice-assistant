import React, { useCallback, useEffect, useRef, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/newsCards.tsx/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import { Typography } from '@material-ui/core';
import { AlanButton } from '@alan-ai/alan-sdk-web/dist/AlanButton';

const alanKey = '';
let alanBtnInstance: AlanButton;

const isNumeric = (val: unknown): val is string | number => {
  return (
    !isNaN(Number(Number.parseFloat(String(val)))) &&
    isFinite(Number(val))
  );
}

const App = () => {
  const [articles, setArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  const alanBtnContainer: any = useRef();

  useEffect(() => {
    alanBtnInstance = alanBtn({
      key: alanKey,
      rootEl: alanBtnContainer.current,
      onCommand: ({ command, articles, number }: any) => {
        if (command === 'testCommand') {
          alert('this code was executed');
        } else if (command === 'getArticles') {
          setArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highLight') {
          setActiveArticle((prevActiveArticles: any) => {
            return prevActiveArticles + 1
          })
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
          if (isNumeric(parsedNumber)) {
            const selectedArticle = articles[Number(parsedNumber) - 1].url;
            if (parsedNumber > 20) {
              alanBtnInstance.playText('Please select a number between 1 and 20.');
            } else if (selectedArticle) {
              window.open(selectedArticle, '_blank');
              alanBtnInstance.playText('Opening in progress....');
            }
          } else {
            alanBtnInstance.playText('Please retry with another sentence.');
          }
        }
      }
    });
  }, []);

  const activateCb = useCallback(() => {
    alanBtnInstance.activate();
  }, []);

  const deactivateCb = useCallback(() => {
    alanBtnInstance.deactivate();
  }, []);

  return (
    <div>
      <Typography variant={'body2'} color={'textSecondary'} component={'h1'} align={'center'}>IA articles</Typography>
      <button onClick={activateCb}>activate</button>
      <button onClick={deactivateCb}>desactivate</button>
      <NewsCards articles={articles} activeArticle={activeArticle} />
      <div ref={alanBtnContainer}></div>
    </div>
  );
}

export default App;
