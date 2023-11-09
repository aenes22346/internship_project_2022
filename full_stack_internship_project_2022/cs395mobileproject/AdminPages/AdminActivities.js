import React, {useState, useEffect} from 'react';
import { Text, View, Button, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const AdminActivities = () => {


    const [data, setData] = useState([]);


    useEffect(() => {

        const getUserInfo = async () => {


            const id = await AsyncStorage.getItem("User_ID");
            const token = await AsyncStorage.getItem("CurrentUser");
    
    
          try {
    
              const res = await axios.get("http://192.168.1.4:8080/admins", 
              
              { headers:  {'Authorization': token} });

              var holder = [];

              var count = 0;
              
              res.data.forEach(element => {
  
                count++;   
  
                holder.push({ id: count, username: element.username, authnum: element.authorityNum, appnum: element.approveNum, dissnum: element.disapproveNum, custnum: element.customizeNum});
          
              });

              setData(holder);

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
            flexDirection: 'column',
            padding: 10,
            margin: 5,
            borderColor: '#2a4944',
            borderWidth: 2,
            backgroundColor: '#d2f7f1',
         },

         eachitem: {

            flexDirection: 'row',
            marginLeft: 10,
            fontWeight: 'bold',
            fontSize: 15,
            maxWidth: 400
         },

    });

        return (
            <View style = {styles.container}>
               <ScrollView>
                  {
                     data.map((item) => (
                        <View style = {styles.item}>
                           <Text style = {styles.eachitem}>ID : {item.id}</Text>
                           <Text style = {styles.eachitem}>USERNAME : {item.username}</Text>
                           <Text style = {styles.eachitem}>AUTHORITY NUMBER : {item.authnum}</Text>
                           <Text style = {styles.eachitem}>APPROVE NUMBER : {item.appnum}</Text>
                           <Text style = {styles.eachitem}>DISAPPROVE NUMBER : {item.dissnum}</Text>
                           <Text style = {styles.eachitem}>CUSTOMIZE NUMBER : {item.custnum}</Text>

                        </View>
                     ))
                  }
               </ScrollView>
            </View>
         )


}

export default AdminActivities;