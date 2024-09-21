import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Error = ({ message, errorVisible, setErrorVisible }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={errorVisible}>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          height: "7%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderWidth: 2,
            borderColor: "black",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 50,
            height: "80%",
            width: "80%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "10%",
            }}
          >
            <MaterialIcons name="error" color={"red"} size={25} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "80%",
            }}
          >
            <Text numberOfLines={1}>{message}</Text>
            <TouchableOpacity onPress={()=>setErrorVisible(false)}>
              <AntDesign name="closecircle" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Error;
