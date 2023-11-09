import React, {useState, useEffect} from 'react';
import { Text, View, Button, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import DatePicker from 'react-native-date-picker'


const Permission = () => {

    const [permission, SetPermission] = useState("");
    const [reason, SetReason] = useState("");
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);


    function getFormattedDate(date) {
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
      }


    const styles = StyleSheet.create({

        container: {
            width: '80%',
            height: '85%',
            padding: 20,
            marginTop: 20,
            marginLeft: 30,
            marginTop: 50, 
            elevation: 5, 
            backgroundColor: '#d5dde8'
        },

        text: {

            marginLeft: 30,
            marginTop: 50,
            fontWeight: 'bold',
            color: 'blue'
        },

        button: {
            maxWidth: 200,
            maxHeight: 200,
            padding: 20,
            marginTop: 5,
            marginLeft: 30
        },


        input: {

            marginLeft: 20,
            color: 'blue',
            borderBottomWidth: 1,
            marginRight: 20,
            paddingVertical: 5,
            height:100, 
            textAlignVertical: 'top',
            backgroundColor: '#edfaf1',
            marginTop: 30
          }

    });


    const sendpermission = async () => {



        const id = await AsyncStorage.getItem("User_ID");
        const token = await AsyncStorage.getItem("CurrentUser");


        var result = getFormattedDate(date);

        console.log(result);

        console.log(reason);


        const update = {

            result: result,
            permission: reason,
      
        };


        try {

            await axios.put("http://192.168.1.4:8080/admins/send/" + id, update,
            { headers:  {'Authorization': token} });


            ToastAndroid.showWithGravity('You have sent your permission reason', ToastAndroid.LONG, ToastAndroid.TOP)


        }

        catch (err) {}
    

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


            SetPermission(res.data.permissions);

        }

        catch (err) {}


    }



    useEffect(() => {
        getUserInfo();
      }, []);

    
    return (

        <View style={styles.container}>


            <Text style={styles.text}>

            {permission} DAYS LEFT TO GET PERMISSION




            </Text>


            <Text style={styles.text}>

                SELECT A DATE THAT YOU WANT TO PERMISSION:

                


            </Text>

            <>
            <Button title="Open Calender" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                open={open}
                date={date}
                mode = "date"
                onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                }}
                onCancel={() => {
                setOpen(false)
                }}
            />
            </>


            <Text style={styles.text}>

                {date.toString()} is selected.




            </Text>


            <Text style={styles.text}>

                ENTER YOUR PERMISSION BELOW:




            </Text>


            <TextInput
                multiline={true}
                numberOfLines={5}
                style = {styles.input}
                onChangeText={text => SetReason(text)}/>


            <View style={styles.button}>
  
                <Button
                    title="SEND"
                    onPress={sendpermission}
                />

            </View>


        </View>


        


    );



}


export default Permission;