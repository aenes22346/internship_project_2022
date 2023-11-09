import React, {useState, useEffect} from 'react';
import { Text, View, Button, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const Notification = () => {


    const [notification, SetNotification] = useState([]);
    const [check, setCheck] = useState(false);


    useEffect(() => {

        const getUserInfo = async () => {


            const id = await AsyncStorage.getItem("User_ID");
            const token = await AsyncStorage.getItem("CurrentUser");
    
    
          try {
    
              const res = await axios.get("http://192.168.1.4:8080/employee/get/" + id, 
              
              { headers:  {'Authorization': token} });


              if(res.data.notifications === null) {

                setCheck(true);
              }

              else {
                console.log(res.data.notifications);
                SetNotification(res.data.notifications);
              }

          }
    
          catch (err) {}
        };
    
        getUserInfo();
    
      }, []);


      const styles = StyleSheet.create({

        container: {
            width: '80%',
            height: '85%',
            padding: 20,
            marginTop: 20,
            marginLeft: 30,
            marginTop: 50, 
            elevation: 5, 
            backgroundColor: '#d5dde8',
        },

        row: {
            backgroundColor: 'aliceblue',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 10,
            marginTop: 10,
        },

        item: {
            flexDirection: 'row',
            padding: 30,
            margin: 5,
            borderColor: '#2a4944',
            borderWidth: 2,
            backgroundColor: '#d2f7f1'
         }

    });

        return (
            <View style = {styles.container}>
               <ScrollView>
                  {
                    check ? (<Text>

                        YOU DO NOT HAVE ANY NOTIFICATION
                        </Text>) : (

                     notification.map((item) => (
                        <View style = {styles.item}>
                           <Text>{item}</Text>

                        </View>
                     )))
                  }
               </ScrollView>
            </View>
         )


}

export default Notification;