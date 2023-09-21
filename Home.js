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

export function HomeUI({ navigation }) {
  const [get_notes_data, set_notes_data] = useState([]);
  const [getNewNote, setNewNote] = useState();
  const [getTitle, setTitle] = useState();
  getData();

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

      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "row",
        }}
      >
        <Pressable onPress={logOut}>
          <View style={styles.logOutBtnView}>
            <Text style={styles.btnText}>Log Out</Text>
          </View>
        </Pressable>
        <Pressable onPress={addNote}>
          <View style={styles.logOutBtnView}>
            <Text style={styles.btnText}>Add Note</Text>
          </View>
        </Pressable>
      </View>

      <FlatList data={get_notes_data} renderItem={NotesUI} />
    </SafeAreaView>
  );
  return ui;

  function addNote() {
    navigation.navigate("Note");
  }

  async function getData() {
    //Alert.alert("a","OK");
    const user_mobile = await AsyncStorage.getItem("mobile");
    const loginDetails = {
      mobile: user_mobile,
    };
    fetch("http://10.0.2.2:8090/react_notes/home.php", {
      method: "POST",
      body: JSON.stringify(loginDetails),
    })
      .then((response) => {
        return response.json();
      })

      .then((user) => {
        if (user.length > 0) {
          //  Alert.alert("Success");

          set_notes_data(user);
        } else {
          //  Alert.alert("No Notes");
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
function NotesUI({ item }) {
  if(item.note_type=="study"){
    const ui = (
      <View
        style={{
          width: 400,
  
          justifyContent: "center",
          alignContent: "center",
          marginTop: 2,
          flexDirection: "row",
         // backgroundColor:"blue",
          flex:1,
        }}
      >
  
        
        <Image
          style={{
            width: 110,
            height: 90,
            marginBottom: 20,
            borderRadius:50,
          }}
          source={require("./study.jpg")}
        />
  
      <View
      style={{
        justifyContent:"flex-start",
       // backgroundColor:"red",
        flexDirection:"row",
        flex:2,
      }}
    
      >
   
    <View style={{
      flexDirection:"column",
      alignContent:"center",
      justifyContent:"center",
    }}>
      <Text style={styles.note_text}>{item.date}</Text>
      <Text style={styles.note_text}>{item.title}</Text>
      <Text style={styles.note_text}>{item.description}</Text>
    </View>
      </View>
  
      </View>
    );
    return ui;
  }else if(item.note_type=="travel"){
    const ui = (
      <View
        style={{
          width: 400,
  
          justifyContent: "center",
          alignContent: "center",
          marginTop: 2,
          flexDirection: "row",
         // backgroundColor:"blue",
          flex:1,
        }}
      >
  
        
        <Image
          style={{
            width: 110,
            height: 90,
            marginBottom: 20,
            borderRadius:50,
          }}
          source={require("./travel.jpg")}
        />
  
      <View
      style={{
        justifyContent:"flex-start",
       // backgroundColor:"red",
        flexDirection:"row",
        flex:2,
      }}
    
      >
   
    <View style={{
      flexDirection:"column",
      alignContent:"center",
      justifyContent:"center",
    }}>
      <Text style={styles.note_text}>{item.date}</Text>
      <Text style={styles.note_text}>{item.title}</Text>
      <Text style={styles.note_text}>{item.description}</Text>
    </View>
      </View>
  
      </View>
    );
    return ui;
  }else if(item.note_type=="personal"){
    const ui = (
      <View
        style={{
          width: 400,
  
          justifyContent: "center",
          alignContent: "center",
          marginTop: 2,
          flexDirection: "row",
         // backgroundColor:"blue",
          flex:1,
        }}
      >
  
        
        <Image
          style={{
            width: 110,
            height: 90,
            marginBottom: 20,
            borderRadius:50,
          }}
          source={require("./personal.jpg")}
        />
  
      <View
      style={{
        justifyContent:"flex-start",
       // backgroundColor:"red",
        flexDirection:"row",
        flex:2,
      }}
    
      >
   
    <View style={{
      flexDirection:"column",
      alignContent:"center",
      justifyContent:"center",
    }}>
      <Text style={styles.note_text}>{item.date}</Text>
      <Text style={styles.note_text}>{item.title}</Text>
      <Text style={styles.note_text}>{item.description}</Text>
    </View>
      </View>
  
      </View>
    );
    return ui;
  }else if(item.note_type=="work"){
    const ui = (
      <View
        style={{
          width: 400,
  
          justifyContent: "center",
          alignContent: "center",
          marginTop: 2,
          flexDirection: "row",
         // backgroundColor:"blue",
          flex:1,
        }}
      >
  
        
        <Image
          style={{
            width: 110,
            height: 90,
            marginBottom: 20,
            borderRadius:50,
          }}
          source={require("./work.jpg")}
        />
  
      <View
      style={{
        justifyContent:"flex-start",
       // backgroundColor:"red",
        flexDirection:"row",
        flex:2,
      }}
    
      >
   
    <View style={{
      flexDirection:"column",
      alignContent:"center",
      justifyContent:"center",
    }}>
      <Text style={styles.note_text}>{item.date}</Text>
      <Text style={styles.note_text}>{item.title}</Text>
      <Text style={styles.note_text}>{item.description}</Text>
    </View>
      </View>
  
      </View>
    );
    return ui;
  }else{
    const ui = (
      <View
        style={{
          width: 400,
  
          justifyContent: "center",
          alignContent: "center",
          marginTop: 2,
          flexDirection: "row",
         // backgroundColor:"blue",
          flex:1,
        }}
      >
  
        
        <Image
          style={{
            width: 110,
            height: 90,
            marginBottom: 20,
            borderRadius:50,
          }}
          source={require("./NOTES.png")}
        />
  
      <View
      style={{
        justifyContent:"flex-start",
       // backgroundColor:"red",
        flexDirection:"row",
        flex:2,
      }}
    
      >
   
    <View style={{
      flexDirection:"column",
      alignContent:"center",
      justifyContent:"center",
    }}>
      <Text style={styles.note_text}>{item.date}</Text>
      <Text style={styles.note_text}>{item.title}</Text>
      <Text style={styles.note_text}>{item.description}</Text>
    </View>
      </View>
  
      </View>
    );
    return ui;
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

  note_text:{
    marginStart:12,
    fontSize:18,
    
  }
});
