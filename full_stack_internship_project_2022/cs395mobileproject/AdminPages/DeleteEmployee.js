import React, {useState, useEffect} from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TextInput, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import SelectList from 'react-native-dropdown-select-list'


const DeleteEmployee = ({ navigation }) => {


    const [allemployees, setAll] = useState([]);
    const [selected, setSelected] = useState("");
    const [value, setValue] = useState("");

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

    });


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


      const senddelete = async () => {


        const token = await AsyncStorage.getItem("CurrentUser");
        const id = await AsyncStorage.getItem("User_ID");

        console.log(id);
        console.log(value)
        try {

          await axios.delete("http://192.168.1.4:8080/employee/" + id, 

          
          { headers:  {'Authorization': token} });



      }

      catch (err) {}

    }



    return (

        <View style = {styles.container}>

        <View>


            <SelectList setSelected={setSelected} data={allemployees.map((item) => ("id: " + item.id + " " + "name: " + item.name + " " + "surname: " + item.surname))} onSelect={() => setvalue(selected)} />


        </View>

        <View style={styles.button}>
        
        <Button
        title="DELETE EMPLOYEE"
        onPress={senddelete}
        />

        </View>


        </View>



    );






}

export default DeleteEmployee;