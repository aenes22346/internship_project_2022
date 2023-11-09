import React, {useState, useEffect} from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TextInput, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import SelectList from 'react-native-dropdown-select-list'


const EmployeeHours = () => {


    const [all, setAll] = useState([]);
    const [selected, setSelected] = useState("");
    const [value, setValue] = useState("");
    const [entry, setEntry] = useState("");
    const [exit, setExit] = useState("");
    
    
    function setvalue(params) {

      const val = params.split(" ");
      setValue(val[1]);
      
    }



    const styles = StyleSheet.create({

        container: {
            width: '80%',
            height: '60%',
            padding: 20,
            marginLeft: 30,
            marginTop: 50, 
            elevation: 5, 
            backgroundColor: '#d5dde8',
        },

         button: {
            marginTop: 20,
         },

          text: {


            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: '15%',
            marginTop: 20,
            color: 'blue'

          },

          input: {

            marginLeft: 20,
            color: 'blue',
            borderBottomWidth: 2,
            marginRight: 20,
            paddingVertical: 5
          }




    });


    const clickSubmit = async () => {


      const token = await AsyncStorage.getItem("CurrentUser");
      const id = await AsyncStorage.getItem("User_ID");


      console.log(entry);
      console.log(exit);
      console.log(value);

      const update = {

        entry: entry,
        exit: exit,
        empid: value

  
      };


      try {

        const res = await axios.put("http://192.168.1.4:8080/admins/sendhours/" + id, update, 
        
        { headers:  {'Authorization': token} });


      }

      catch (err) {}



    }


    useEffect(() => {
        const getAllEmployees = async () => {

        const token = await AsyncStorage.getItem("CurrentUser");

        try {
            const res = await axios.get("http://192.168.1.4:8080/employee", 
            { headers:  {'Authorization': token}});

            var holder = [];

            res.data.forEach(element => {

              holder.push({id: element.id, name: element.name, surname: element.surname});
              
            });
            setAll(holder);
          } 
          catch (err) {}
        };
        getAllEmployees();
      }, []);


      console.log(all);


      return (


        <View style = {styles.container}>


          
          <SelectList setSelected={setSelected} data={all.map((item) => ("id: " + item.id + " " + "name: " + item.name + " " + "surname: " + item.surname))} onSelect={() => setvalue(selected)} />

          <Text style = {{fontWeight: 'bold', marginTop: 10}}>


          PLEASE ENTER SUGGESTED ENTRY HOUR : 


          </Text>


          <TextInput
        
        numberOfLines={2}
        style = {styles.input}
        placeholder= "ENTER ENTRY HOUR"
        required
        errorText= "Please Enter A Value"
        onChangeText={text => setEntry(text)}
        
        >
          </TextInput>



          <Text style = {{fontWeight: 'bold', marginTop: 30}}>


          PLEASE ENTER SUGGESTED EXIT HOUR : 


          </Text>


          <TextInput

          numberOfLines={2}
          style = {styles.input}
          placeholder= "ENTER EXIT HOUR"
          required
          errorText= "Please Enter A Value"
          onChangeText={text => setExit(text)}

          >
          </TextInput>



          <View style={styles.button}>
  
          <Button
            title="CUSTOMIZE"
            onPress={clickSubmit}
          />

        </View>



        </View>


      );


}

export default EmployeeHours;



