import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Alert,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export function SignUpUI({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Employee", value: "employee" },
    { label: "Student", value: "student" },
  ]);

  const [getText1, setText1] = useState("");
  const [getText2, setText2] = useState("");
  const [getText3, setText3] = useState("");
  const [getText4, setText4] = useState("");
  const [getText5, setText5] = useState("");
  const ui = (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.infoText}>{getText5}</Text>

      <View style={styles.view}>
        <Text style={styles.texts}>First Name</Text>
        <TextInput
          style={styles.input}
          value={getText1}
          onChangeText={(text) => setText1(text)}
        />
         </View>
         <View>
         <Text style={styles.texts}>Last Name </Text>
        <TextInput
          style={styles.input}
          value={getText2}
          onChangeText={(text) => setText2(text)}
        />
         </View>
        
        <View style={styles.view}>
        <Text style={styles.texts}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={getText3}
          onChangeText={(text) => setText3(text)}
        />
        </View>
        
        <View style={styles.view}>
        <Text style={styles.texts}>Password</Text>
        <TextInput
          style={styles.input}
          value={getText4}
          onChangeText={(text) => setText4(text)}
        />
        </View>
        
        <View style={styles.view}>
        <Text style={styles.texts}>User Type</Text>
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
        </View>
        <Pressable onPress={signUp}>
        <View style={styles.signUpBtnView}> 
          <Text style={styles.btnText}>Sign Up</Text>
        </View>
       </Pressable><Pressable onPress={goToSignIn}>
        <View style={styles.signInBtnView}> 
          <Text style={styles.btnText}>Sign In</Text>
        </View>
       </Pressable>
     

      {/* <Button style={styles.signUpBtn} title="SignUp" onPress={signUp} />
      <Button title="Go To SignIn" onPress={goToSignIn} /> */}
    </SafeAreaView>
  );

  return ui;
  function goToSignIn() {
    navigation.navigate("SignIn");
  }
  function signUp() {

    const loginDetails={
        "first_name":getText1,
        "last_name":getText2,
        "mobile":getText3,
       "password":getText4,
        "user_type":value,
    };

   // Alert.alert(JSON.stringify(loginDetails));
    fetch("http://10.0.2.2:8090/react_notes/signUp.php", {
        method: "POST",
        body: JSON.stringify(loginDetails),
      })
        .then((response) => {
          return response.json();
        })

        .then((user) => {
          Alert.alert("Success", user.information);
          if(user.information=="success"){
            setText5(user.information);
            navigation.navigate("SignIn");
          }else{
            setText5(user.information);
          }
         
        })
        .catch((error) => {
          Alert.alert("Error", error);
        });
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
    height: 45,
    borderWidth: 1,
    width: 300,
    marginBottom: 20,
    padding: 5,
    marginLeft:5,
    borderRadius:5,
  },
  dropDown: {
    height: 45,
    borderWidth: 1,
    width: 300,
    marginBottom: 20,
    padding: 5,
    marginLeft:5,
    borderRadius:5,
  },
  signUpBtn: {
    height: 30,
    width: 40,
  },
  view: {
    //flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",

    marginBottom: 0,
  },
  texts: {
    fontSize: 18,
    //fontWeight: "bold",
  },
  signInBtnView:{
    backgroundColor:"black",
    width:150,
    height:40,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    marginTop:10,   
   },
   signUpBtnView:{
    backgroundColor:"#2D2D2D",
    width:150,
    height:40,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    marginTop:0,   
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

