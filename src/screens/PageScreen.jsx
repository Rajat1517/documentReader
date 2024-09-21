import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useCallback, useRef, useState, useLayoutEffect } from "react";
import { useSwipe } from "../hooks/useSwipe";
import useRead from "../hooks/useRead";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import IonIcons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { useFocusEffect } from "@react-navigation/native";
import { languageCodes } from "../constants";
import DropDownPicker from "react-native-dropdown-picker";

const PageScreen = ({ navigation, route }) => {
  const { text, docName } = route.params;
  const readerRef = useRef(null);
  const [customise, setCustomise] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [items, setItems] = useState(
    languageCodes.map((code) => ({
      label: code.label,
      value: code.value,
    }))
  );

  useLayoutEffect(() => {
    if (docName !== undefined) {
      navigation.setOptions({
        title: `${docName}`,
      });
    }
  }, [navigation]);

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
    shrill,
    speed,
    language,
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
    setShrill,
    setSpeed,
    setLangugae,
  ] = useRead(text);

  useFocusEffect(
    useCallback(() => {
      setStep(page + 1);
    }, [page])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settings}
        onPress={() => {
          pauseReading();
          setCustomise(true);
        }}
      >
        <MaterialIcons name="settings" size={21} />
      </TouchableOpacity>
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
        style={styles.swipeArea}
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
          <FontAwesome5 name="fast-backward" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={backSentence}
        >
          <FontAwesome5 name="step-backward" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={
            !isReading ? startReading : isPaused ? resumeReading : pauseReading
          }
        >
          <Text>
            {!isReading ? (
              <FontAwesome5 name="play" size={30} />
            ) : isPaused ? (
              <FontAwesome5 name="play" size={30} />
            ) : (
              <FontAwesome5 name="pause" size={30} />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={forwardSentence}
        >
          <FontAwesome5 name="step-forward" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={forwardPara}>
          <FontAwesome5 name="fast-forward" size={30} />
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={customise}>
        <View style={styles.modalContainer}>
          <View style={styles.settingsMenu}>
            <Text style={styles.settingsTitle}>Language</Text>
            <DropDownPicker
              open={open}
              value={language}
              items={items}
              setOpen={setOpen}
              setValue={setLangugae}
              setItems={setItems}
              searchable={true}
              searchPlaceholder="Search language..."
              placeholder="Choose a language"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              scrollViewProps={{
                nestedScrollEnabled: true,
                contentContainerStyle: styles.scrollContent,
              }}
            />
            <Text style={styles.settingsTitle}>Speed: {speed}</Text>
            <Slider
              style={{ width: "80%", height: "2%" }}
              step={0.25}
              value={speed}
              minimumValue={0.5}
              maximumValue={5}
              minimumTrackTintColor="black"
              maximumTrackTintColor="grey"
              onValueChange={(val) => setSpeed(val)}
              thumbTintColor={"black"}
              onSlidingComplete={(val) => setSpeed(val)}
            />
            <Text style={styles.settingsTitle}>Pitch: {shrill}</Text>
            <Slider
              style={{ width: "80%", height: "2%" }}
              step={0.25}
              value={shrill}
              minimumValue={0.5}
              maximumValue={1.5}
              minimumTrackTintColor="black"
              maximumTrackTintColor="grey"
              onValueChange={(val) => setShrill(val)}
              thumbTintColor={"black"}
              onSlidingComplete={(val) => setShrill(val)}
            />
            <TouchableOpacity
              onPress={() => {
                setCustomise(false);
                setOpen(false);
                if (isReading) resumeReading();
              }}
            >
              <IonIcons name="checkmark-done-circle" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  swipeArea: {
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    paddingBottom: "5%",
  },
  modalContainer: {
    backgroundColor: "rgba(255,255,255,1)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  settings: {
    position: "absolute",
    top: "4%",
    left: "4%",
    zIndex: 1,
  },
  settingsTitle: { fontWeight: "600", fontSize: 20 },
  settingsMenu: {
    justifyContent: "space-evenly",
    height: "60%",
    width: "80%",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
  },
  dropdown: {
    height: "10%",
    width: "80%",
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: "10%",
  },
  dropdownContainer: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#888",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: "10%",
  },
  scrollContent: {
    paddingRight: 10,
  },
});
