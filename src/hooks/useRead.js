import React, { useCallback, useEffect, useRef, useState } from 'react';
import Tts from "react-native-tts"

const useRead = (text) => {

    const [doc,setDoc]= useState([]);
    const [page,setPage]= useState(0);
    const [para,setPara]= useState(0);
    const [sentence,setSentence]= useState(0);
    const [isReading,setIsReading]= useState(false);
    const [isPaused,setIsPaused]= useState(false);

    const ref= useRef({
        para: 0,
        sentence: 0,
        page: 0,
        doc: [],
        isPaused: false,
        isReading: false,
    });

    const createMap= useCallback(()=>{
        let paras= text.split(/\n+/).map(para=>para.trim());
        paras= paras.map(para=>{
            return {
                para,
                characters: para.length,
            }
        });

        let pages= [];
        paras.forEach((para)=>{
            if(pages.length==0)pages.push({
                paras: [para.para],
                characters: para.characters
            });
            else{
                let lastPage= pages[pages.length-1];
                if(para.characters+lastPage.characters>1000){
                    const lines= para.para.split(/(?<=[.?!])\s+/).map(line=>({
                        line,
                        characters: line.length,
                    }));
                    let len= lastPage.characters;
                    let index=0;
                    while(index<lines.length){
                        if(len+lines[index].characters<=1000){
                            len+=lines[index].characters;
                            index++;
                        }
                        else break;
                    }
                    const para1Text= lines.slice(0,index).map(line=>line.line).join(" ");
                    let para1={
                        para: para1Text,
                        characters: para1Text.length,
                    }
                    const para2Text= lines.slice(index).map(line=>line.line).join(" ");
                    let para2={
                        para: para2Text,
                        characters: para2Text.length
                    }
                    pages = pages.map((page,index,arr)=>{
                        if(index==arr.length-1){
                            let temp= {
                                ...page
                            }
                            temp.paras.push(para1.para);
                            temp.characters+= para1.characters;
                            return temp;
                        }
                        return page
                    })
                    pages.push({
                        paras: [para2.para],
                        characters: para2.characters
                    })
                }
                else {
                    pages = pages.map((page,index,arr)=>{
                        if(index==arr.length-1){
                            let temp= {
                                ...page
                            }
                            temp.paras.push(para.para);
                            temp.characters+= para.characters;
                            return temp;
                        }
                        return page
                    })
                }
            }
        });
        // console.log(pages);
        setDoc(pages);
    },[text])

    useEffect(()=>{
        ref.current= {
            ...ref.current,
            page:page,
            para: para,
            sentence: sentence,
            doc:doc,
            isPaused:isPaused,
            isReading: isReading,
        }
    },[doc,para,sentence,page,isPaused,isReading])

    useEffect(()=>{
        createMap();
        const finishListner= Tts.addEventListener("tts-finish", handleSentenceEnd);

        return ()=>{
            finishListner.remove();
        }
    },[]);

    const handleSentenceEnd= ()=>{

        const {sentence,page,para,doc}= ref.current;
        if(sentence< doc[page].paras[para].length-1){
            Tts.speak(doc[page].paras[para][sentence+1]);
            setSentence(sentence+1);
        }
        else if(para< doc[page].paras.length-1){
            Tts.speak(doc[page].paras[para+1][0]);
            setPara(para+1);
            setSentence(0);
        }
        else if(page< doc.length-1){
            Tts.speak(doc[page+1].paras[0][0]);
            setPage(page+1);
            setPara(0);
            setSentence(0);
        }
        else stopReading();
    }

    const startReading= ()=>{
        setIsReading(true);
        setIsPaused(false);
        Tts.speak(ref.current.doc[0].paras[0][0]);
    }

    const stopReading= ()=>{
        setIsReading(false);
        setIsPaused(false);
        Tts.stop();
    }

    const pauseReading= ()=>{
        setIsPaused(true);
        setIsReading(false);
        Tts.stop();
    }

    const resumeReading= ()=>{
        setIsPaused(false);
        setIsReading(true);
        Tts.speak(ref.current.doc[ref.current.page].paras[ref.current.para][ref.current.sentence]);
    }

    const forwardPage= ()=>{
        if(ref.current.page<ref.current.doc.length-1){
            setPage(prev=>prev+1);
            setPara(0);
            setSentence(0);
        }
    }

    const backPage= ()=>{
        if(ref.current.page>0){
            setPage(prev=>prev-1);
            setPara(0);
            setSentence(0);
        }
    }

    const forwardPara= ()=>{
        if(ref.current.para< ref.current.doc[refref.current.page].paras.length-1){
            setPara(prev=>prev+1);
            setSentence(0);
        }
        else forwardPage();
    }

    const backPara= ()=>{
        if(ref.current.para>0){
            setPara(prev=>prev-1);
            setSentence(0);
        }
        else{
            if(ref.current.page>0){
                const newPage= ref.current.page -1;
                const newPara= ref.current.doc[newPage].paras.length-1;
                setPage(newPage);
                setPara(newPara);
                setSentence(0);
            }
        }
    }

    const forwardSentence= ()=>{
        if(ref.current.sentence<ref.current.doc[ref.current.page].paras[ref.current.para].length-1){
            const newSentence= ref.current.sentence+1;
            setSentence(newSentence);
        }
        else forwardPara();
    }

    const backSentence= ()=>{
        if(ref.current.sentence>0){
            const newSentence= ref.current.sentence-1;
            setSentence(newSentence);
        }
        else{
            if(ref.current.para>0){
                const newPara= ref.current.para-1;
                const newSentence= ref.current.doc[ref.current.page].paras[ref.current.para].length-1;
                setPara(newPara);
                setSentence(newSentence);
            }
            else if(ref.current.page>0){
                const newPage= ref.current.page-1;
                const newPara= ref.current.doc[newPage].paras.length-1;
                const newSentence= ref.current.doc[newPage].paras[newPara].length-1;
                setPage(newPage);
                setPara(newPara);
                setSentence(newSentence);
            }
        }
    }

    return [startReading];

}

export default useRead