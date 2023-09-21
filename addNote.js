import AsyncStorage from "@react-native-async-storage/async-storage";
import { Component, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  FlatList,
  View,
  TextInput,
  Button,
  Pressable,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
export function AddNoteUI({ navigation }) {
  const [get_notes_data, set_notes_data] = useState([]);
  const [getNewNote, setNewNote] = useState();
  const [getTitle, setTitle] = useState();
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Study", value: "study" },
    { label: "Travel", value: "travel" },
    { label: "Personal", value: "personal" },
    { label: "Work", value: "work" },
    
  ]);
  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        style={{
          width: 110,
          height: 90,
          marginBottom: 20,
        }}
        source={require("./NOTES.png")}
      />
      <View>
        <Text style={styles.texts}>Add new title</Text>
        <TextInput
          style={styles.input}
          value={getTitle}
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={styles.texts}>Add new note</Text>
        <TextInput
          style={styles.input}
          value={getNewNote}
          onChangeText={(text) => setNewNote(text)}
        />

        <Text style={styles.texts}>Note Type</Text>
        
        <DropDownPicker
          style={styles.dropDown}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={() => {}}
        />
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <Pressable onPress={adNewNote}>
            <View style={styles.addBtnView}>
              <Text style={styles.btnText}>Add Note</Text>
            </View>
          </Pressable>
          <Pressable onPress={logOut}>
            <View style={styles.logOutBtnView}>
              <Text style={styles.btnText}>Log Out</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;

  async function adNewNote() {
    const user_contact = await AsyncStorage.getItem("mobile");
    const loginDetails = {
      mobile: user_contact,
      title: getTitle,
      newNote: getNewNote,
      note_type:value,
      
    };

    fetch("http://10.0.2.2:8090/react_notes/noteProcess.php", {
      method: "POST",
      body: JSON.stringify(loginDetails),
    })
      .then((response) => {
        return response.json();
      })

      .then((user) => {
        Alert.alert("Info", user.information);
        if (user.information == "success") {
          setNewNote("");
          setTitle("");
          navigation.navigate("Home");
        } else {
          Alert.alert(user.information);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  async function logOut() {
    await AsyncStorage.removeItem("mobile");
    navigation.navigate("SignIn");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 70,
    borderWidth: 1,
    width: 400,
    marginBottom: 20,
    padding: 5,
    borderRadius: 5,
  },
  addBtnView: {
    backgroundColor: "black",
    width: 150,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logOutBtnView: {
    backgroundColor: "red",
    width: 150,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginStart: 8,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  texts: {
    fontSize: 18,
    //fontWeight: "bold",
  },
});
