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
import Ionicons from "@expo/vector-icons/FontAwesome6";

const text = `
Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.

A random paragraph can also be an excellent way for a writer to tackle writers' block. Writing block can often happen due to being stuck with a current project that the writer is trying to complete. By inserting a completely random paragraph from which to begin, it can take down some of the issues that may have been causing the writers' block in the first place.

Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.
`;

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
  const [
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
  ] = useRead(text);

  return (
    <View
      style={styles.container}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
    >
      <ScrollView style={{ ...styles.reader }}>
        {/* {textMap.map((para, index) => {
          let text = para.map((line) => line).join(" ");
          return (
            <Text key={index} style={styles.paraText}>
              {text}
            </Text>
          );
        })} */}
        {doc.length > 0 &&
          doc[page].paras.map((paragraph, paraIndex) => (
            <View key={paraIndex}>
              <Text style={{ ...styles.paraText }}>
                {paragraph.map((line, lineIndex) => (
                  <Text
                    key={lineIndex}
                    style={{
                      color:
                        lineIndex === sentence && paraIndex === para
                          ? "blue"
                          : "black",
                      ...styles.paraText,
                    }}
                  >
                    {" "}
                    {line}
                  </Text>
                ))}
              </Text>
            </View>
          ))}
      </ScrollView>
      <View style={styles.controlPanel}>
        <TouchableOpacity style={styles.navigationButton} onPress={backPara}>
          <Text>Back Para</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={backSentence}
        >
          <Text>back Sentence</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={startReading}
        >
          <Text>play/pause</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={forwardSentence}
        >
          <Text>next sentence</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={forwardPara}>
          <Text>next Para</Text>
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
    width: "15%",
    borderColor: "#000",
    borderWidth: 1,
  },
  controlPanel: {
    width: "100%",
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
});
