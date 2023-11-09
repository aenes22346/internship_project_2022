import React, {useState, useEffect} from 'react';
import { Text, View, Button, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const HoursPage = () => {


    const styles = StyleSheet.create({

        container: {
            width: '80%',
            height: '80%',
            padding: 20,
            marginTop: 20,
            marginLeft: 30,
            marginTop: 50, 
            elevation: 5, 
        },

        text: {

            marginLeft: 30,
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
          },


          button: {
            maxWidth: 200,
            maxHeight: 200,
            padding: 20,
            marginLeft: 40
          },
    
    });


    const handleClick = async () => {


        var result = getFormattedDate(startDate);


        const id = await AsyncStorage.getItem("User_ID");
        const token = await AsyncStorage.getItem("CurrentUser");



        const update = {

            start_hour: entry,
            end_hour: exit,
            start_date: result
      
          };



        try {
        await axios.put("http://192.168.1.4:8080/employee/put/" + id, update,
        { headers:  {'Authorization': token} });


        ToastAndroid.showWithGravity('Your information has been updated', ToastAndroid.LONG, ToastAndroid.TOP)


        }
        catch (err) {}

    }


    const [entry, setEntry] = useState("");
    const [exit, setExit] = useState("");
    const [getentry, setGetEntry] = useState("");
    const [getexit, setGetExit] = useState("");
    const [startDate, setStartDate] = useState("");


    function getFormattedDate(date) {
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
      }


    const getUserInfo = async () => {


        try {


            const id = await AsyncStorage.getItem("User_ID");
            const token = await AsyncStorage.getItem("CurrentUser");

            console.log(id);
            console.log(token);

            const res = await axios.get("http://192.168.1.4:8080/employee/get/" + id, 
            
            { headers:  {'Authorization': token} });


            console.log(res.data);


            setGetEntry(res.data.start_hour);
            setGetExit(res.data.end_hour);
            
            const d = new Date();
            setStartDate(d);

        }

        catch (err) {}


    }



    useEffect(() => {
        getUserInfo();
      }, []);



      return (

        <View style={styles.container}>


            <Text style={styles.text}>


                YOUR ENTRY HOURS SHOULD BE:

                {getentry}


            </Text>



            <Text style={styles.text}>


                YOUR EXIT HOURS SHOULD BE:

                {getexit}


            </Text>


            <Text style={styles.text}>


            ENTER YOUR ENTRY TIME:


            </Text>


            <TextInput

                numberOfLines={2}
                style = {styles.input}
                onChangeText={text => setEntry(text)}
                secureTextEntry={true}

                >
                </TextInput>


                <Text style={styles.text}>


                ENTER YOUR EXIT TIME:


                </Text>


                <TextInput

                numberOfLines={2}
                style = {styles.input}
                onChangeText={text => setExit(text)}
                secureTextEntry={true}

                >
                </TextInput>  


                <View style={styles.button}> 

                <Button
                title="SEND"
                onPress = {handleClick}
                />


                </View>



        </View>
      );

}


export default HoursPage;

