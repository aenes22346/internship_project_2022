import React, {useState} from 'react';
import { Text, View, Button, StyleSheet } from 'react-native'



const AdminHome = ({navigation}) => {


    const styles = StyleSheet.create({

        button: {
          maxWidth: 200,
          maxHeight: 200,
          padding: 15,
          marginTop: 10 ,
          marginLeft: 85
        },
    
    });


    return (


      <View>


    <View style={styles.button}>



        <Button
          title="APPROVE OR DISAPPROVE EMPLOYEE EXCUSES"
          onPress={() =>
            navigation.navigate('ExcuseApprove')
          }
        />



    </View>


    
    <View style={styles.button}>



        <Button
          title="APPROVE OR DISAPPROVE REGISTER REQUESTS"
          onPress={() =>
            navigation.navigate('RegisterApprove')
          }
        />



    </View>

    <View style={styles.button}>



        <Button
          title="APPROVE OR DISAPPROVE PERMISSION REQUESTS"
          onPress={() =>
            navigation.navigate('PermissionApprove')
          }
        />



    </View>



    <View style={styles.button}>


    <Button
    title="CHANGE EMPLOYEE WORKING HOURS"
    onPress={() =>
      navigation.navigate('EmployeeHours')
    }
    />

    </View>


    <View style={styles.button}>


      <Button
      title="AUTHORIZE AN EMPLOYEE AS ADMIN"
      onPress={() =>
        navigation.navigate('Authorize')
      }
      />

      </View>


      <View style={styles.button}>


      <Button
      title="SEE ADMIN ACTIVITIES"
      onPress={() =>
        navigation.navigate('AdminActivities')
      }
      />

      </View>

      <View style={styles.button}>


      <Button
      title="DELETE AN EMPLOYEE"
      onPress={() =>
        navigation.navigate('DeleteEmployee')
      }
      />

      </View>


    </View>





    );

}


export default AdminHome;