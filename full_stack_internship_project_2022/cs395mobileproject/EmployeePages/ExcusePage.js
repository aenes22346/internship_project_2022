import React, {useState, useEffect} from 'react';
import { Text, View, Button, StyleSheet, ScrollView, TextInput, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const ExcusePage = () => {


    const [refreshdata, setrefreshData] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [reason, SetReason] = useState("");
    const [date, SetDate] = useState("");


    const sendexcuse = async (date) => {

      setClicked(clicked => !clicked);
      SetDate(date);

    }

    useEffect(() => {

        const getUserInfo = async () => {


            const id = await AsyncStorage.getItem("User_ID");
            const token = await AsyncStorage.getItem("CurrentUser");
    
    
          try {
    
              const res = await axios.get("http://192.168.1.4:8080/employee/get/" + id, 
              
              { headers:  {'Authorization': token} });
    
    
              var holder = [];

              var count = 0;
              
              res.data.table_info.forEach(element => {
    
                var result = element.split(" ");

                count++;   

                holder.push({ id: count, date: result[1], entrytime: result[2], exittime: result[3], workedhours: result[4], minrequiredtime: result[6]});
          
              });

              holder.reverse();
              setrefreshData(holder);

          }
    
          catch (err) {}
        };
    
        getUserInfo();
    
      }, []);


        const sendclick = async () => {


         const id = await AsyncStorage.getItem("User_ID");
         const token = await AsyncStorage.getItem("CurrentUser");



         const update = {

            date: date,
            excuse: reason,
         };


         try {

            await axios.put("http://192.168.1.4:8080/admins/send/excuse/" + id, update,
            { headers:  {'Authorization': token} });



         }

         catch (err) {}

   }


      const styles = StyleSheet.create({

        container: {
            width: '80%',
            height: '60%',
            padding: 5,
            marginLeft: 30,
            marginTop: 50, 
            elevation: 5, 
            backgroundColor: '#d5dde8',
        },

        item: {
            flexDirection: 'row',
            padding: 5,
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
         },

         items: {

            flexDirection: 'row',
            marginLeft: 10,

         },

         button: {
            marginLeft: 20,
         },

         input: {

            marginLeft: 20,
            color: 'blue',
            borderBottomWidth: 2,
            marginRight: 20,
            paddingVertical: 5,
            height:100, 
            textAlignVertical: 'top',
            backgroundColor: '#7dffe7',
            marginTop: 30
          },


          text: {


            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: '15%',
            marginTop: 20,
            color: 'blue'

          }


    });



      return (


         <View style = {{maxHeight: '100%'}}>

        <ScrollView style = {styles.container}>


         <ScrollView horizontal = {true}>

           <ScrollView>
              {
                 refreshdata.map((item) => (
                    <View style = {styles.item}>


                     <View style = {styles.items}>


                     <View>

                     <Text style = {styles.eachitem}>DATE</Text>
                     <Text style = {styles.eachitem}>ENTRY-TIME</Text>
                     <Text style = {styles.eachitem}>EXIT-TIME</Text>
                     <Text style = {styles.eachitem}>WORKED-HOURS</Text>
                     <Text style = {styles.eachitem}>MIN-REQUIRED TIME</Text>

                     </View>


                     <View>


                       <Text style = {styles.eachitem}>{item.date}</Text>
                       <Text style = {styles.eachitem}>{item.entrytime}</Text>
                       <Text style = {styles.eachitem}>{item.exittime}</Text>
                       <Text style = {styles.eachitem}>{item.workedhours}</Text>
                       <Text style = {styles.eachitem}>{item.minrequiredtime}</Text>

                     </View>

                     <View style = {styles.button}>


                        { item.minrequiredtime > item.workedhours ? (

                           <Button
                           title="ENTER AN EXCUSE"
                           color="#841584"
                           onPress= {() => sendexcuse(item.date)}
                           />
                        ) : (

                           <Button
                           title=" NO NEED TO ENTER AN EXCUSE"
                           color="blue"
                           />

                        )


                        }

                     </View>

                     </View>

                    </View>
                    
                 ))
              }
           </ScrollView>

         </ScrollView>

      </ScrollView>
        
      { clicked ? (

         <View>


         <Text style = {styles.text}>


            ENTER YOUR EXCUSE BELOW:


         </Text>

         <TextInput
         multiline={true}
         numberOfLines={5}
         style = {styles.input}
         onChangeText={text => SetReason(text)}
         placeholder = "EXCUSE-TEXT"/>


         <View style = {{marginTop: 10}}>

         <Button
         title="SEND EXCUSE"
         color="#ff0303"
         onPress = {sendclick}
         />

         </View>


         </View>

      ) : (

         <>

         </>


      )
      }

     </View>


   );
}
export default ExcusePage;


