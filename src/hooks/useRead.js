import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Speech from "expo-speech";

const useRead = (text) => {
  const [doc, setDoc] = useState([]);
  const [page, setPage] = useState(0);
  const [para, setPara] = useState(0);
  const [sentence, setSentence] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const ref = useRef({
    para: 0,
    sentence: 0,
    page: 0,
    doc: [],
    isPaused: false,
    isReading: false,
  });

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

        if (para.characters + lastPage.characters > 300) {
          let lines = para.para.split(/(?<=[.?!])\s+/).map((line) => ({
            line,
            characters: line.length,
          }));
          lines = lines.filter((line) => line.characters > 0);
          let len = lastPage.characters;
          let index = 0;
          while (index < lines.length) {
            if (len + lines[index].characters <= 300) {
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
    ref.current = {
      ...ref.current,
      page: page,
      para: para,
      sentence: sentence,
      doc: doc,
      isPaused: isPaused,
      isReading: isReading,
    };
  }, [doc, para, sentence, page, isPaused, isReading]);

  useEffect(() => {
    createMap();
    return () => {
      stopReading();
    };
  }, []);

  const handleSentenceEnd = () => {
    const { sentence, page, para, doc } = ref.current;
    console.log(page, para, sentence);
    if (sentence < doc[page].paras[para].length - 1) {
      Speech.speak(doc[page].paras[para][sentence + 1], {
        onDone: handleSentenceEnd,
        language: "en-IN"
      });
      setSentence(sentence + 1);
    } else if (para < doc[page].paras.length - 1) {
      Speech.speak(doc[page].paras[para + 1][0], {
        onDone: handleSentenceEnd,
        language: "en-IN"
      });
      setPara(para + 1);
      setSentence(0);
    } else if (page < doc.length - 1) {
      Speech.speak(doc[page + 1].paras[0][0], {
        onDone: handleSentenceEnd,
        language: "en-IN"
      });
      setPage(page + 1);
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
    Speech.speak(ref.current.doc[0].paras[0][0], {
      onDone: handleSentenceEnd,
      language: "en-IN",
    });
  };

  const stopReading = () => {
    setIsReading(false);
    setIsPaused(false);
    Speech.stop();
  };

  const pauseReading = () => {
    setIsPaused(true);
    setIsReading(false);
    Speech.stop();
  };

  const resumeReading = () => {
    setIsPaused(false);
    setIsReading(true);
    Speech.speak(
      ref.current.doc[ref.current.page].paras[ref.current.para][
        ref.current.sentence
      ],
      {
        onDone: handleSentenceEnd,
        language: "en-IN"
      }
    );
  };

  const forwardPage = () => {
    if (ref.current.page < ref.current.doc.length - 1) {
      setPage((prev) => prev + 1);
      setPara(0);
      setSentence(0);
    }
  };

  const backPage = () => {
    if (ref.current.page > 0) {
      setPage((prev) => prev - 1);
      setPara(0);
      setSentence(0);
    }
  };

  const forwardPara = () => {
    if (
      ref.current.para <
      ref.current.doc[refref.current.page].paras.length - 1
    ) {
      setPara((prev) => prev + 1);
      setSentence(0);
    } else forwardPage();
  };

  const backPara = () => {
    if (ref.current.para > 0) {
      setPara((prev) => prev - 1);
      setSentence(0);
    } else {
      if (ref.current.page > 0) {
        const newPage = ref.current.page - 1;
        const newPara = ref.current.doc[newPage].paras.length - 1;
        setPage(newPage);
        setPara(newPara);
        setSentence(0);
      }
    }
  };

  const forwardSentence = () => {
    if (
      ref.current.sentence <
      ref.current.doc[ref.current.page].paras[ref.current.para].length - 1
    ) {
      const newSentence = ref.current.sentence + 1;
      setSentence(newSentence);
    } else forwardPara();
  };

  const backSentence = () => {
    if (ref.current.sentence > 0) {
      const newSentence = ref.current.sentence - 1;
      setSentence(newSentence);
    } else {
      if (ref.current.para > 0) {
        const newPara = ref.current.para - 1;
        const newSentence =
          ref.current.doc[ref.current.page].paras[ref.current.para].length - 1;
        setPara(newPara);
        setSentence(newSentence);
      } else if (ref.current.page > 0) {
        const newPage = ref.current.page - 1;
        const newPara = ref.current.doc[newPage].paras.length - 1;
        const newSentence = ref.current.doc[newPage].paras[newPara].length - 1;
        setPage(newPage);
        setPara(newPara);
        setSentence(newSentence);
      }
    }
  };

  return [startReading,stopReading,resumeReading,pauseReading,forwardPage,forwardSentence,forwardPara, backPage,backPara,backSentence];
};

export default useRead;
