import React, {useState, useEffect} from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TextInput, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const ExcuseApprove = () => {


    const [arr, setArr] = useState([]);
    const [arrlength, setArrlength] = useState(0);



    const handleapprove = async (username, index, permission) => {


      console.log(username);
      console.log(index);
      console.log(arr[index].date);


      const id = await AsyncStorage.getItem("User_ID");
      const token = await AsyncStorage.getItem("CurrentUser");

      const update = {

          index: index,
          username: username,
          date: arr[index].date,
          reason: permission
      }


      try {

          await axios.put("http://192.168.1.4:8080/admins/handleapprove/" + id, update,
          { headers:  {'Authorization': token} });
    
        }
    
        catch (err) {}


  }

  const handledisapprove = async (username, index, permission) => {


      console.log(username);
      console.log(index);
      console.log(arr[index].date);


      const id = await AsyncStorage.getItem("User_ID");
      const token = await AsyncStorage.getItem("CurrentUser");



      const update = {

          index: index,
          username: username,
          date: arr[index].date,
          reason: permission
      }


      try {

          await axios.put("http://192.168.1.4:8080/admins/handledisapprove/" + id, update,
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
            
            res.data.requests.forEach(element => {
  
              var result = element.split(" ");

              count++;   

              holder.push({ id: count, name: result[0], surname: result[1], username: result[2], date: result[3], excuse: result[4]});
        
            });

            holder.reverse();

            setArr(holder);

            setArrlength(holder.length);


          } catch (err) {}
        };
        getAdmin();


      }, []);



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


                            <Text style = {styles.eachitem}>

                            DATE : {item.date}

                            </Text>   



                            <Text style = {styles.eachitem}>

                            EXCUSE : {item.excuse}

                            </Text>  


                            <View style = {styles.button}>

                            <View>

                            <Button
                           title="APPROVE"
                           color="#03ff46"
                           onPress = {() => handleapprove(item.username, index, item.excuse)}
                           />

                           </View>

                           <View style = {{marginTop: 10}}>

                            <Button
                           title="DISAPPROVE"
                           color="#ff0303"
                           onPress = {() => handledisapprove(item.username, index, item.excuse)}
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


export default ExcuseApprove;

