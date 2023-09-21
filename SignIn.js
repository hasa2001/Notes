import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, View, TextInput ,Pressable, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SignInUI({ navigation }) {
  const [getText1, setText1] = useState("");
  const [getText2, setText2] = useState("");
  const [getText3, setText3] = useState("");

  checkUser();
  async function checkUser(){
    const user_contact = await AsyncStorage.getItem("mobile");
   
    if(user_contact !== null){
      navigation.navigate("Home");
    }else{
    
    }
  }

  ui = (
    <SafeAreaView style={styles.container}>
      <Image style={{
        width:110,
        height:100,
        marginBottom:20,
      }} source={require("./NOTES.png")}/>
     
      <Text style={styles.infoText}>{getText3}</Text>
      <View style={styles.view}>
        <Text style={styles.texts}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={getText1}
          onChangeText={(text) => setText1(text)}
        />
      </View>
      <View style={styles.view}>
        <Text style={styles.texts}>Password</Text>
        <TextInput
          style={styles.input}
          value={getText2}
          onChangeText={(text) => setText2(text)}
        />
      </View>

      
      <Pressable onPress={signIn}>
        <View style={styles.signInBtnView}> 
          <Text style={styles.btnText}>Sign In</Text>
        </View>
       </Pressable>
       <Pressable onPress={goToSignUp}>
        <View style={styles.signUpBtnView}> 
          <Text style={styles.btnText}>Go to SignUp</Text>
        </View>
       </Pressable>
    </SafeAreaView>
  );
  return ui;
  function signIn() {
    const loginDetails = {
      mobile: getText1,
      password: getText2,
    };

    fetch("http://10.0.2.2:8090/react_notes/signIn.php", {
      method: "POST",
      body: JSON.stringify(loginDetails),
    })
      .then((response) => {
        return response.json();
      })

      .then((user) => {
        Alert.alert("Info", user.information);
        if (user.information == "success") {
          setText3(user.information);
          async function saveData() {
            await AsyncStorage.setItem("mobile", user.mobile);
            await AsyncStorage.setItem("password", user.password);

            navigation.navigate("Home");
          }
          saveData();
        } else {
          setText3(user.information);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  function goToSignUp() {
    navigation.navigate("SignUp");
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:0,
  },
  input: {
    height: 50,
    borderWidth: 1,
    width: 300,
    marginBottom: 20,
    padding: 5,
    marginLeft:5,
    borderRadius:5,
  },
  view: {
    //flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",

    marginBottom: 5,
  },
  texts: {
    fontSize: 18,
    //fontWeight: "bold",
  },

  signIn:{
    width:50,
    height:40,
    color:"red",
  },

  signUp:{
    width:50,
    height:40,
    color:"red",
  },
  signInBtnView:{
    backgroundColor:"black",
    width:150,
    height:40,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    marginTop:20,   
   },
   signUpBtnView:{
    backgroundColor:"#2D2D2D",
    width:150,
    height:40,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    marginTop:20,   
   },
   btnText:{
    color:"white",
   fontSize:18,
   fontWeight:"bold", 
  },
  infoText:{
    color:"red",
    fontSize:20,
    fontWeight:"bold",
  }
});
