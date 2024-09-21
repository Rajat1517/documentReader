import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useSwipe } from "../hooks/useSwipe";
import useRead from "../hooks/useRead";
import Ionicons from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";
import { useFocusEffect } from "@react-navigation/native";

const PageScreen = ({ route }) => {
  const { text } = route.params;
  const readerRef = useRef(null);

  const onSwipeLeft = () => {
    forwardPage();
    readerRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const onSwipeRight = () => {
    backPage();
    readerRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 10);
  const [
    doc,
    page,
    para,
    sentence,
    isReading,
    isPaused,
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
    jumpPage,
  ] = useRead(text);

  const [step, setStep] = useState(1);

  useFocusEffect(
    useCallback(() => {
      setStep(page + 1);
    }, [page])
  );

  return (
    <View style={styles.container}>
      <ScrollView
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        style={{ ...styles.reader }}
        ref={readerRef}
      >
        <Text
          style={{ width: "100%", textAlign: "center", marginVertical: "1%" }}
        >
          [ {page + 1}/{doc.length} ]
        </Text>
        {doc.length > 0 &&
          doc[page].paras.map((paragraph, paraIndex) => (
            <View
              key={paraIndex}
              style={{ paddingBottom: "3%" }}
              onTouchEnd={onTouchEnd}
              onTouchStart={onTouchStart}
            >
              <Text style={{ ...styles.paraText }}>
                {paragraph.map((line, lineIndex) => (
                  <Text
                    key={lineIndex}
                    style={{
                      color:
                        lineIndex === sentence && paraIndex === para
                          ? "rgb(40, 67, 135)"
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
      <View
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        style={{
          textAlign: "center",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          paddingBottom: "5%",
        }}
      >
        <MaterialIcons name="swipe" size={30} style={{ textAlign: "center" }} />
      </View>
      <Text>{step}</Text>
      <Slider
        style={{ width: "90%", height: "2%" }}
        step={1}
        value={step}
        minimumValue={1}
        maximumValue={doc.length}
        minimumTrackTintColor="black"
        maximumTrackTintColor="grey"
        onValueChange={(val) => setStep(val)}
        thumbTintColor={"black"}
        onSlidingComplete={jumpPage}
      />
      <View style={styles.controlPanel}>
        <TouchableOpacity style={styles.navigationButton} onPress={backPara}>
          <Ionicons name="fast-backward" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={backSentence}
        >
          <Ionicons name="step-backward" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={
            !isReading ? startReading : isPaused ? resumeReading : pauseReading
          }
        >
          <Text>
            {!isReading ? (
              <Ionicons name="play" size={30} />
            ) : isPaused ? (
              <Ionicons name="play" size={30} />
            ) : (
              <Ionicons name="pause" size={30} />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={forwardSentence}
        >
          <Ionicons name="step-forward" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={forwardPara}>
          <Ionicons name="fast-forward" size={30} />
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
    flex: 1,
  },
  reader: {
    marginVertical: "5%",
    paddingHorizontal: "10%",
    flexGrow: 0,
    height: "70%",
    width: "98%",
    borderColor: "black",
    borderWidth: 1.5,
    margin: 0,
    paddingTop: 10,
    paddingHorizontal: 25,
  },
  paraText: {
    marginVertical: "1%",
    fontSize: 15,
    textAlign: "justify",
  },
  navigationButton: {
    height: "50%",
    width: "18%",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 360,
    justifyContent: "center",
    alignItems: "center",
  },
  controlPanel: {
    width: "100%",
    height: "25%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 2,
    margin: 0,
  },
});
