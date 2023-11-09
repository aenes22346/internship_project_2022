import React, {useState, useEffect} from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TextInput, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const RegisterApprove = () => {


    const [arr, setArr] = useState([]);
    const [arrlength, setArrlength] = useState(0);

    const approveregister  = async (username, surname, name, password) => {

        const token = await AsyncStorage.getItem("CurrentUser");
        const id = await AsyncStorage.getItem("User_ID");

        console.log(arr);
  
        const update = {
  
            name: name,
            surname: surname,
            username: username,
            password: password,
  
    
        };
  
  
        try {
  
          const res = await axios.post("http://192.168.1.4:8080/admins/approveemployee/" + id, update, 
          
          { headers:  {'Authorization': token} });
  
  
        }
  
        catch (err) {}


    }


    const disapproveregister  = async (username) => {


        

        const token = await AsyncStorage.getItem("CurrentUser");
        const id = await AsyncStorage.getItem("User_ID");
  
        const update = {
  
            username: username,
  
    
        };
  
  
        try {
  
          const res = await axios.put("http://192.168.1.4:8080/admins/disapproveemployee/" + id, update, 
          
          { headers:  {'Authorization': token} });
  
  
        }
  
        catch (err) {}

        


    }



    useEffect(() => {
        const getAdmin = async () => {


            const id = await AsyncStorage.getItem("User_ID");
            const token = await AsyncStorage.getItem("CurrentUser");


          try {
            const res = await axios.get("http://192.168.1.4:8080/admins/get/" + id, 
            { headers:  {'Authorization': token}});
            console.log(res.data);


            var holder = [];

            var count = 0;
            
            res.data.registerrequests.forEach(element => {
  
              var result = element.split(" ");

              count++;   

              holder.push({ id: count, username: result[0], name: result[1], surname: result[2], password: result[3]});
        
            });

            holder.reverse();

            setArr(holder);

            setArrlength(holder.length);


          } catch (err) {}
        };
        getAdmin();


      }, []);

      console.log(arr);



      const styles = StyleSheet.create({

        container: {
            width: '80%',
            height: '90%',
            padding: 20,
            marginLeft: 30,
            marginTop: 50, 
            elevation: 5, 
            backgroundColor: '#d5dde8',
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

         items: {

            flexDirection: 'row',
            marginLeft: 10,

         },

         button: {
            marginLeft: 100,
            marginTop: 10,
            width: 200
         },

    });


      return (

        <View style = {{maxHeight: '100%'}}>


        <ScrollView style = {styles.container}>


        <ScrollView horizontal = {true}>

          <ScrollView>


          {arr.requests === null  || arrlength === 0 ? (
                    
                    <Text>
                    You have no request waiting approval
                    </Text> 
                    ) : (



                        arr.map((item, index) => (


                            <View key = {item.id} style = {styles.item}>



                            <Text style = {styles.eachitem}>

                                NAME : {item.name}

                            </Text>


                            <Text style = {styles.eachitem}>

                            USERNAME : {item.username}

                            </Text>



                            <Text style = {styles.eachitem}>

                            SURNAME : {item.surname}

                            </Text>


                            <View style = {styles.button}>

                            <View>

                            <Button
                           title="APPROVE"
                           color="#03ff46"
                           onPress={() => approveregister(item.username, item.surname, item.name, item.password)}
                           />

                           </View>

                           <View style = {{marginTop: 10}}>

                            <Button
                           title="DISAPPROVE"
                           color="#ff0303"
                           onPress={() => disapproveregister(item.username)}
                           />

                           </View>
                           
                            </View>                



                            </View>


                        )


                        )

                )

            }



          </ScrollView>

        </ScrollView>

        </ScrollView>



        </View>




      );



}


export default RegisterApprove;

