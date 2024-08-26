import React, { useEffect, useState } from 'react';

const useRead = (text) => {
    const createMap= ()=>{
        let paras= text.split(/\n+/).map(para=>para.trim());
        paras= paras.map(para=>{
            return {
                para,
                characters: para.length,
            }
        })
        let pages= [];
        paras.forEach((para)=>{
            if(pages.length==0)pages.push({
                paras: [para.para],
                characters: para.characters
            });
            else{
                let lastPage= pages[pages.length-1];
                if(para.characters+lastPage.characters>300){
                    const lines= para.para.split(/(?<=[.?!])\s+/).map(line=>({
                        line,
                        characters: line.length,
                    }));
                    let len= lastPage.characters;
                    let index=0;
                    while(index<lines.length){
                        if(len+lines[index].characters<=300){
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
        })
    }

    useEffect(()=>{
        createMap();
    },[])
}

export default useRead