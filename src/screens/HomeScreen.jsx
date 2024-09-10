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
              text: `
Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.

A random paragraph can also be an excellent way for a writer to tackle writers' block. Writing block can often happen due to being stuck with a current project that the writer is trying to complete. By inserting a completely random paragraph from which to begin, it can take down some of the issues that may have been causing the writers' block in the first place.

Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers. Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.
`,
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
