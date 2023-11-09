import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import EmployeeHome from "./Pages/EmployeeHome"
import AdminHome from "./Pages/AdminHome"
import HoursPage from "./EmployeePages/HoursPage"
import Permission from "./EmployeePages/Permission"
import Notification from "./EmployeePages/Notification"
import ExcusePage from "./EmployeePages/ExcusePage"
import ExcuseApprove from "./AdminPages/ExcuseApprove"
import EmployeeHours from "./AdminPages/EmployeeHours"
import Authorize from "./AdminPages/Authorize"
import RegisterApprove from "./AdminPages/RegisterApprove"
import PermissionApprove from "./AdminPages/PermissionApprove"
import AdminActivities from "./AdminPages/AdminActivities"
import DeleteEmployee from "./AdminPages/DeleteEmployee"

const Stack = createNativeStackNavigator();


const App = () => {


  return (

    <>


    <NavigationContainer>

    <Stack.Navigator>

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="EmployeeHome" component={EmployeeHome} />
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="HoursPage" component={HoursPage} />
      <Stack.Screen name="Permission" component={Permission} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ExcusePage" component={ExcusePage} />
      <Stack.Screen name="ExcuseApprove" component={ExcuseApprove} />
      <Stack.Screen name="EmployeeHours" component={EmployeeHours} />
      <Stack.Screen name="Authorize" component={Authorize} />
      <Stack.Screen name="RegisterApprove" component={RegisterApprove} />
      <Stack.Screen name="PermissionApprove" component={PermissionApprove} />
      <Stack.Screen name="AdminActivities" component={AdminActivities} />
      <Stack.Screen name="DeleteEmployee" component={DeleteEmployee} />

    </Stack.Navigator>
    </NavigationContainer>

    </>



  );
}


export default App;