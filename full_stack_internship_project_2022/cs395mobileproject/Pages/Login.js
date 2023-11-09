import React, {useState} from 'react';
import { Text, View, Button, StyleSheet, TextInput, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const Login = ({ navigation }) => {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const clickSubmit = async () => {


    AsyncStorage.clear();


    const update = {

      username: username,
      password: password,

    };

    try {
      const res = await axios.post(
        "http://192.168.1.4:8080/api/login", update
      );

      console.log(res.data);

      await AsyncStorage.setItem("CurrentUser", res.data.accessToken);
      await AsyncStorage.setItem("User_ID", res.data.userId);


      if(res.data.message === "You are not an employee of the company") {

        Alert.alert("You are not an employee of the company")
      }
      else if(res.data.message === "Wrong Password or Username") {

        Alert.alert("Wrong Password or Username");

      }

      else {

        {
          res.data.user_role === "employee" ? 

          
            navigation.navigate('EmployeeHome')

          : 

          navigation.navigate('AdminHome')
        }

      }



    } catch (err) {}



    const keys = await AsyncStorage.getAllKeys();
    const entries = await AsyncStorage.multiGet(keys);
    console.log(entries);

  };


  const styles = StyleSheet.create({

    button: {
      maxWidth: 200,
      maxHeight: 200,
      padding: 20,
      marginLeft: 80
    },

    text: {

      marginLeft: 100,
      marginTop: 50,
      fontWeight: 'bold',
      color: 'blue'
    },

    input: {

      marginLeft: 20,
      color: 'blue',
      borderBottomWidth: 1,
      marginRight: 20,
      paddingVertical: 5
    }

  });


  return (


    <View>


      <Text style = {styles.text}>

        ENTER YOUR USERNAME


        </Text>


        <TextInput
        
        numberOfLines={2}
        style = {styles.input}
        placeholder= "ENTER YOUR USERNAME"
        required
        errorText= "Please Enter your Username"
        onChangeText={text => setUsername(text)}
        
        >
          </TextInput>



          <Text style = {styles.text}>

            ENTER YOUR PASSWORD


            </Text>


            <TextInput

            numberOfLines={2}
            style = {styles.input}
            placeholder= "ENTER YOUR PASSWORD"
            required
            errorText= "Please Enter your Password"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}

            >
              </TextInput>

      <View style={styles.button}>
  
        <Button
          title="LOGIN"
          onPress={clickSubmit}
        />

      </View>

      <View style={styles.button}>
  
      <Button
        title="GO TO REGISTER"
        onPress={() =>
          navigation.navigate('Register')
        }
      />

      </View>


      </View>
  
  
  
  );


}

export default Login;