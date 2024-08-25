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

const PageScreen = ({ route }) => {
  const { textMap } = route.params;

  const onSwipeLeft = () => {
    console.log("Left swipe");
  };
  const onSwipeRight = () => {
    console.log("Right swipe");
  };
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 10);
  return (
    <View
      style={styles.container}
    >
      <ScrollView style={{ ...styles.reader }}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}>
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
      <View
        style={{
          height: "15%",
        }}
      >
        {/* <TouchableOpacity style={styles.navigationButton}>
          <Text>Next</Text>
        </TouchableOpacity> */}
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
});
