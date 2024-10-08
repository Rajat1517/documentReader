import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as DocPicker from "expo-document-picker";
import * as FS from "expo-file-system";
import dummy from "../assets/dummy.json";
import mammoth from "mammoth";
import { TextDecoder } from "text-encoding";
import Error from "../components/Error";

const HomeScreen = ({ navigation }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("No error");
  const pickDocument = async () => {
    try {
      const result = await DocPicker.getDocumentAsync({
        type: [
          "text/plain",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setFile(result);
        switch (result.assets[0].mimeType) {
          case "text/plain":
            readTextFile(result.assets[0].uri);
            break;
          case "application/msword":
            readDocFile(result.assets[0].uri);
            break;
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            readDocFile(result.assets[0].uri);
            break;
          default:
            console.log("Unsupported File Format");
        }
      } else {
        console.log("Document picker was cancelled");
      }
    } catch (error) {
      setErrorMessage("Error while picking document");
      setErrorVisible(true);
    }
  };

  const readTextFile = async (fileURI) => {
    try {
      setLoading(true);
      const content = await FS.readAsStringAsync(fileURI);
      setText(content);
    } catch (error) {
      setErrorMessage("Error while extracting text");
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const readDocFile = async (fileURI) => {
    try {
      setLoading(true);
      const response = await fetch(fileURI);
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const res = await mammoth.extractRawText({ arrayBuffer: uint8Array });
      setText(res.value);
    } catch (error) {
      setErrorMessage("Error while extracting text");
      setErrorVisible(true);
    } finally {
      setLoading(false);
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
              if (text.length > 0) {
                navigation.navigate("Reader", {
                  text,
                  docName: file.assets[0].name,
                });
              }
            }}
            disabled={loading}
          >
            <Text numberOfLines={1} style={styles.buttonText}>
              {file.assets[0].name}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={pickDocument}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={loading}
        transparent={true}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.93)",
          }}
        >
          <Text
            style={{ fontSize: 25, textAlign: "center", fontWeight: "400" }}
          >
            Compiling. 
            This can take a few minutes!
          </Text>
          <ActivityIndicator size={60} color={"black"} />
        </View>
      </Modal>
      <Error
        message={errorMessage}
        errorVisible={errorVisible}
        setErrorVisible={setErrorVisible}
      />
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
