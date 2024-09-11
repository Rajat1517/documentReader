import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";
import * as DocPicker from "expo-document-picker";
import * as FS from "expo-file-system";
import dummy from "../assets/dummy.json";

const HomeScreen = ({ navigation }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const pickDocument = async () => {
    try {
      const result = await DocPicker.getDocumentAsync({
        type: "text/plain",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setFile(result);
        readFile(result.assets[0].uri);
      } else {
        console.log("Document picker was cancelled");
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const readFile = async (fileURI) => {
    try {
      const content = await FS.readAsStringAsync(fileURI);
      setText(content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require("../assets/book-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Book Reader</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Reader", {
              text: dummy.text,
            });
          }}
        >
          <Text style={styles.buttonText}>Dummy</Text>
        </TouchableOpacity>
        {file && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Reader", {
                text,
              });
            }}
          >
            <Text style={styles.buttonText}>{file.assets[0].name}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={pickDocument}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "10%",
  },
  button: {
    padding: 10,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
    height: "20%",
    justifyContent: "center",
    backgroundColor: "rgba(253,155,6,0.8)",
  },
  textInput: {
    width: "80%",
    padding: 2,
  },
  logo: {
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  row: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "50%",
    width: "auto",
    width: "100%",
  },
});
