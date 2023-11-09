import React, {useState} from 'react';
import { Text, View, Button, StyleSheet } from 'react-native'



const EmployeeHome = ({navigation}) => {



    const styles = StyleSheet.create({

        button: {
          maxWidth: 200,
          maxHeight: 200,
          padding: 20,
          marginLeft: 85
        },
    
    });


    return (


        <View>


        <View style={styles.button}>



        <Button
          title="SEE YOUR WORKING HOURS AND ENTER ENTRY AND EXIT TIME"
          onPress={() =>
            navigation.navigate('HoursPage')
          }
        />

        </View>

        <View style={styles.button}>

        <Button
          title="ENTER A DATE AND REQUEST PERMISSION"
          onPress={() =>
            navigation.navigate('Permission')
          }
        />

        </View>

        <View style={styles.button}>

        <Button
          title="SEE NOTIFICATIONS"
          onPress={() =>
            navigation.navigate('Notification')
          }
        />

        </View>

        <View style={styles.button}>

        <Button
          title="SEE YOUR PAST WEEKS ACTIVITIES AND ENTER AN EXCUSE"
          onPress={() =>
            navigation.navigate('ExcusePage')
          }
        />

        </View>


        </View>


    );










}


export default EmployeeHome;