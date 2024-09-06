import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Speech from "expo-speech";

const useRead = (text) => {
  const [doc, setDoc] = useState([]);
  const [page, setPage] = useState(0);
  const [para, setPara] = useState(0);
  const [sentence, setSentence] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const paraRef = useRef(0);
  const pageRef = useRef(0);
  const sentenceRef = useRef(0);
  const docRef = useRef([]);
  const readingRef = useRef(false);
  const pausedRef = useRef(false);

  const createMap = useCallback(() => {
    let paras = text.split(/\n+/).map((para) => para.trim());
    paras = paras.map((para) => {
      return {
        para,
        characters: para.length,
      };
    });
    paras = paras.filter((para) => para.characters > 0);

    let pages = [];
    paras.forEach((para) => {
      if (pages.length == 0) {
        pages.push({
          paras: [para.para.split(/(?<=[.?!])\s+/)],
          characters: para.characters,
        });
      } else {
        let lastPage = pages[pages.length - 1];

        if (para.characters + lastPage.characters > 1400) {
          let lines = para.para.split(/(?<=[.?!])\s+/).map((line) => ({
            line,
            characters: line.length,
          }));
          lines = lines.filter((line) => line.characters > 0);
          let len = lastPage.characters;
          let index = 0;
          while (index < lines.length) {
            if (len + lines[index].characters <= 1400) {
              len += lines[index].characters;
              index++;
            } else break;
          }
          const para1Text = lines.slice(0, index).map((line) => line.line);
          let para1 = {
            para: para1Text,
            characters: para1Text.reduce(
              (sum, line) => (sum += line.length),
              0
            ),
          };
          const para2Text = lines.slice(index).map((line) => line.line);
          let para2 = {
            para: para2Text,
            characters: para2Text.reduce(
              (sum, line) => (sum += line.length),
              0
            ),
          };
          if (para1.para.length > 0) {
            pages[pages.length - 1] = {
              ...pages[pages.length - 1],
              paras: [...pages[pages.length - 1].paras, para1.para],
              characters: pages[pages.length - 1].characters + para1.characters,
            };
          }
          if (para2.para.length > 0) {
            pages.push({
              paras: [para2.para],
              characters: para2.characters,
            });
          }
        } else {
          pages[pages.length - 1] = {
            ...pages[pages.length - 1],
            paras: [
              ...pages[pages.length - 1].paras,
              para.para.split(/(?<=[.?!])\s+/),
            ],
            characters: pages[pages.length - 1].characters + para.characters,
          };
        }
      }
    });
    setDoc(pages);
  }, [text]);

  useEffect(() => {
    readingRef.current = isReading;
    pausedRef.current = isPaused;
    docRef.current = doc;
    pageRef.current = page;
    paraRef.current = para;
    sentenceRef.current = sentence;
  }, [doc, para, sentence, page, isPaused, isReading]);

  useEffect(() => {
    createMap();
    return () => {
      stopReading();
    };
  }, []);

  const handleSentenceEnd = () => {
    if (
      sentenceRef.current <
      docRef.current[pageRef.current].paras[paraRef.current].length - 1
    ) {
      // console.log("changed line",pageRef.current, paraRef.current, sentenceRef.current + 1)
      readThisSentence(
        pageRef.current,
        paraRef.current,
        sentenceRef.current + 1
      );
      setSentence(sentenceRef.current + 1);
    } else if (
      paraRef.current <
      docRef.current[pageRef.current].paras.length - 1
    ) {
      // console.log("changed para",pageRef.current, paraRef.current + 1, 0);
      readThisSentence(pageRef.current, paraRef.current + 1, 0);
      setPara(paraRef.current + 1);
      setSentence(0);
    } else if (pageRef.current < docRef.current.length - 1) {
      // console.log("changed page",pageRef.current + 1, 0, 0);
      readThisSentence(pageRef.current + 1, 0, 0);
      setPage(pageRef.current + 1);
      setPara(0);
      setSentence(0);
    } else stopReading();
  };

  const startReading = async () => {
    setIsReading(true);
    setIsPaused(false);
    // let  languages= await Speech.getAvailableVoicesAsync();
    // languages= new Set(languages.map(lang=> lang.language));
    // console.log(languages);
    readThisSentence(0, 0, 0);
  };

  const stopReading = () => {
    setIsReading(false);
    setIsPaused(false);
    Speech.stop();
    setPage(0);
    setPara(0);
    setSentence(0);
  };

  const pauseReading = () => {
    setIsPaused(true);
    setIsReading(false);
    Speech.stop();
  };

  const resumeReading = () => {
    setIsPaused(false);
    setIsReading(true);
    readThisSentence(pageRef.current, paraRef.current, sentenceRef.current);
  };

  const readThisSentence = (page, para, sentence) => {
    Speech.stop();
    Speech.speak(docRef.current[page].paras[para][sentence], {
      onDone: handleSentenceEnd,
      language: "en-IN",
    });
  };

  const forwardPage = () => {
    if (pageRef.current < docRef.current.length - 1) {
      setPage(pageRef.current+1);
      setPara(0);
      setSentence(0);
      if(isReading && !isPaused)readThisSentence(pageRef.current+1,0,0);
    }
  };

  const backPage = () => {
    if (pageRef.current > 0) {
      setPage(pageRef.current-1);
      setPara(0);
      setSentence(0);
      if(isReading && !isPaused)readThisSentence(pageRef.current-1,0,0);
    }
  };

  const forwardPara = () => {
    if (paraRef.current < docRef.current[pageRef.current]?.paras.length - 1) {
      setPara(paraRef.current+1);
      setSentence(0);
      if(isReading && !isPaused) readThisSentence(pageRef.current,paraRef.current+1,0);
    } else forwardPage();
  };

  const backPara = () => {
    if (paraRef.current > 0) {
      setPara(paraRef.current-1);
      setSentence(0);
      if(isReading && !isPaused)readThisSentence(pageRef.current,paraRef.current-1,0);
    } else {
      if (pageRef.current > 0) {
        const newPage = pageRef.current - 1;
        const newPara = docRef.current[newPage].paras.length - 1;
        setPage(newPage);
        setPara(newPara);
        setSentence(0);
        if(isReading && !isPaused)readThisSentence(newPage,newPara,0);
      }
    }
  };

  const forwardSentence = () => {
    if ( sentenceRef.current < docRef.current[pageRef.current]?.paras[paraRef.current].length - 1) {
      const newSentence = sentenceRef.current + 1;
      setSentence(newSentence);
      // console.log(pageRef.current, paraRef.current, sentenceRef.current + 1);
      if (isReading && !isPaused) readThisSentence( pageRef.current, paraRef.current, sentenceRef.current + 1);
    } else forwardPara();
  };

  const backSentence = () => {
    if (sentenceRef.current > 0) {
      const newSentence = sentenceRef.current - 1;
      setSentence(newSentence);
      // console.log(pageRef.current, paraRef.current, sentenceRef.current - 1);
      if(isReading && !isPaused)readThisSentence(pageRef.current,paraRef.current,sentenceRef.current-1);
    } else {
      if (paraRef.current > 0) {
        const newPara = paraRef.current - 1;
        const newSentence =
          docRef.current[pageRef.current].paras[newPara].length - 1;
        setPara(newPara);
        setSentence(newSentence);
        if(isReading && !isPaused)readThisSentence(pageRef.current,newPara,newSentence);
      } else if (pageRef.current > 0) {
        const newPage = pageRef.current - 1;
        const newPara = docRef.current[newPage].paras.length - 1;
        const newSentence = docRef.current[newPage].paras[newPara].length - 1;
        setPage(newPage);
        setPara(newPara);
        setSentence(newSentence);
        if(isReading && !isPaused)readThisSentence(newPage,newPara,newSentence);
      }
    }
  };

  return [
    doc,
    page,
    para,
    sentence,
    startReading,
    stopReading,
    resumeReading,
    pauseReading,
    forwardPage,
    forwardSentence,
    forwardPara,
    backPage,
    backPara,
    backSentence,
  ];
};

export default useRead;
