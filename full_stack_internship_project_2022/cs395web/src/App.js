import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import { Register } from "./Register/Register";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeHome from "./Home/EmployeeHome";
import AdminHome from "./Home/AdminHome";
import HoursPage from "./HoursPage/HoursPage";
import PermissionPage from "./HoursPage/PermissionPage";
import AuthorizePage from "./HoursPage/AuthorizePage";
import TableInfo from "./HoursPage/TableInfo";
import ExcusePage from "./HoursPage/ExcusePage";
import ExcuseApprove from "./HoursPage/ExcuseApprove";
import PermissionApprove from "./HoursPage/PermissionApprove";
import RegisterApprove from "./HoursPage/RegisterApprove";
import Notification from "./HoursPage/Notification";

function App() {


  return (

    <BrowserRouter>

    <ToastContainer style={{justifyContent: "center"}}/>

      <Routes>


        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/employeehome" element={<EmployeeHome />} />
        <Route exact path="/adminhome" element={<AdminHome />} />
        <Route exact path="/hourspage" element={<HoursPage />} />
        <Route exact path="/permissionpage" element={<PermissionPage />} />
        <Route exact path="/authorizepage" element={<AuthorizePage />} />
        <Route exact path="/tableinfo" element={<TableInfo />} />
        <Route exact path="/excusepage" element={<ExcusePage />} />
        <Route exact path="/excuseapprove" element={<ExcuseApprove />} />
        <Route exact path="/permissionapprove" element={<PermissionApprove />} />
        <Route exact path="/registerapprove" element={<RegisterApprove />} />
        <Route exact path="/notification" element={<Notification />} />

      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
