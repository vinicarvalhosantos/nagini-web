import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import RegisterView from "./components/pages/Register/RegisterView";
import LoginView from "./components/pages/Login/Login";
import ConfirmEmail from "./components/pages/ConfirmEmail/ConfirmEmail";
import RecoveryPasswordView from "./components/pages/RecoveryPassword/RecoveryPasswordView";
import ChangePassword from "./components/pages/ChangePassword/ChangePasswordView";

ReactDOM.render(
    <BrowserRouter>
        <MyNavbar/>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/register" element={<RegisterView/>}/>
            <Route path="/login" element={<LoginView/>}/>
            <Route path="/confirm-account/:token" element={<ConfirmEmail/>}/>
            <Route path="recovery-password" element={<RecoveryPasswordView/>}/>
            <Route path="change-password/:token" element={<ChangePassword/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
