import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSwipe } from "../hooks/useSwipe";
import useRead from "../hooks/useRead";


const text= `
                  Hello!   Baby

Para 1 line 1Para 1 line 1Para 1 line 1Para 1 line 1Para 1 line 1Para 1 line 1Para 1 line 1Para 1 line 1Para 1 line 1. Para1 line 2Para1 line 2Para1 line 2Para1 line 2Para1 line 2Para1 line 2Para1 line 2Para1 line 2Para1 line 2Para1 line 2.

Para 2 line 1Para 2 line 1Para 2 line 1Para 2 line 1Para 2 line 1Para 2 line 1. Para 2 line 2Para 2 line 2Para 2 line 2Para 2 line 2Para 2 line 2Para 2 line 2Para 2 line 2. Para 2 line 3 Para 2 line 3Para 2 line 3Para 2 line 3Para 2 line 3Para 2 line 3.

Para 3 line 1Para 3 line 1Para 3 line 1Para 3 line 1Para 3 line 1. 

Para 4 line 1 Para 4 line 1Para 4 line 1Para 4 line 1Para 4 line 1Para 4 line 1Para 4 line 1.`

const PageScreen = ({ route }) => {
  const { textMap } = route.params;

  const onSwipeLeft = () => {
    console.log("left swipe");
    forwardPage();
  };
  const onSwipeRight = () => {
    console.log("right swipe");
    backPage();
  };
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 10);
  const [startReading,stopReading,resumeReading,pauseReading,forwardPage,forwardSentence,forwardPara, backPage,backPara,backSentence]= useRead(text);

  return (
    <View
      style={styles.container}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
    >
      <ScrollView style={{ ...styles.reader }}>
        {textMap.map((para, index) => {
          let text = para.map((line) => line).join(" ");
          return (
            <Text key={index} style={styles.paraText}>
              {text}
            </Text>
          );
        })}
        {textMap.map((para, index) => {
          let text = para.map((line) => line).join(" ");
          return (
            <Text key={index} style={styles.paraText}>
              {text}
            </Text>
          );
        })}
  
      </ScrollView>
        <View style={styles.controlPanel}>
          <TouchableOpacity style={styles.navigationButton} onPress={startReading} >
          <Text>Read</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={stopReading} >
          <Text>stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={pauseReading} >
          <Text>pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={resumeReading} >
          <Text>resume</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

export default PageScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  reader: {
    marginVertical: "5%",
    paddingHorizontal: "10%",
    flexGrow: 0,
    height: "80%",
  },
  paraText: {
    marginVertical: "2%",
    fontSize: 15,
    textAlign: "justify",
  },
  navigationButton: {
    height: "50%",
    width: "10%",
    borderColor: "#000",
    borderWidth: 1,
  },
  controlPanel:{
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  }
});
