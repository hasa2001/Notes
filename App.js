import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUpUI } from "./SignUp";
import { SignInUI } from "./SignIn";
import { HomeUI } from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddNoteUI, addNoteUI } from "./addNote";

const Stack = createNativeStackNavigator();
function App() {
  const ui = (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="SignIn"  component={SignInUI} />
      <Stack.Screen name="SignUp" component={SignUpUI} />
        <Stack.Screen name="Home" options={{headerBackVisible:false}}   component={HomeUI} />
        <Stack.Screen name="Note" component={AddNoteUI} />
       
       

      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;
}
export default App;
