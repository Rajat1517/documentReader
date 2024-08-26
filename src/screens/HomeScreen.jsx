import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";

const HomeScreen = ({navigation}) => {

    const [textMap,setTextMap]= useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require("../assets/book-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Document Reader</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setTextMap([
                ["Hello, there.","I am Rajat Mishra.","I am interested in frontend development, after working on react for web dev, am trying my skills in cross-platform devlopment with the help of react native."],
                ["I am developing a document reader app for android.","Let's see how will that turn out!","Fingers crossed!"]
            ]);

            navigation.navigate("Reader",{
                textMap:[
                    ["Hello, there.","I am Rajat Mishra.","I am interested in frontend development, after working on react for web dev, am trying my skills in cross-platform devlopment with the help of react native."],
                    ["I am developing a document reader app for android.","Let's see how will that turn out!","Fingers crossed!"]
                ]
            })
          }}
        >
          <Text style={styles.buttonText}>Read</Text>
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
    margin: "5%",
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
    height: "20%",
    justifyContent: "center",
    backgroundColor: "rgba(253,155,6,0.8)"
  },
  textInput: {
    width: "80%",
    padding: 2,
  },
  logo: {
    borderRadius: 10,
  },
  buttonText:{
    fontSize: 20,
  },
  row: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "50%",
    width: "auto",
    // borderColor: "#000",
    // borderWidth: 1,
    width: "100%",
  },
});
