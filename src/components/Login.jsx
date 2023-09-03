import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from './Constant';

function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = (props) => {
        checkLogin();
    }
    const handleUsername = (e) => {
        setUserName(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const checkLogin = () => {
        const data = {
            user: userName,
            password: password
        }
        axios.post(IP + 'ventilia-api/index.php/api/login/login', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Welcome to ventilia CMS.', 'success')
            localStorage.setItem("token_code", response.data.data.token_code);
            localStorage.setItem("user_id", response.data.data.user_id);
            localStorage.setItem("user_name", response.data.data.user_name);
            localStorage.setItem("token_id", response.data.data.token_id);
            localStorage.setItem("user_role", response.data.data.user_role);
            localStorage.setItem("salesmanUserID", response.data.data.user_id);
            if (response.data.data.user_role === 'technical') {
                window.location = "/QuotationUpload";
            } else if (response.data.data.user_role === 'sealseman') {
                window.location = "/LeadGeneration";
            } else {
                window.location = "/Reports";
            }
        }).catch(err => {
            notify('Invalid credentials', 'error')
            console.log(err);
        });
    }
    const notify = (msg, type) => {
        if (type === 'success') {
            toast.success(msg);
        } else if (type === 'error') {
            toast.error(msg);
        } else {
            toast(msg);
        }
    }
    return (
        <>
            <div >
                <body className="login-page">
                    <ToastContainer />
                    <div className="login_page_wrapper">
                        <div className="login-box">
                            <div className="login-box-body">
                                <p className="login-box-msg">Sign in to start your session</p>
                                <div className="login_heading">
                                    <div className="user_avatar"></div>
                                </div>
                                <form>
                                    <div className="form-group has-feedback">
                                        <input type="text" className="form-control" placeholder="Username" onChange={handleUsername} />
                                        <span className="glyphicon glyphicon-user form-control-feedback"></span>
                                    </div>
                                    <div className="form-group has-feedback">
                                        <input type="password" className="form-control" placeholder="Password" onChange={handlePassword} />
                                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <button type="button" onClick={login} className="btn btn-primary btn-block btn-flat">Sign In</button>
                                        </div>
                                    </div>
                                </form>
                                {/* <a href="javascript:void(0)" className="cursor">
                                    <div className="cursor" style={{ "margin-top": "3% !important", "text-align": "center" }}>
                                        <label for="Forgot_password" className="cursor" id="Forgot_password">Forgot password?</label>
                                    </div>
                                </a> */}
                            </div>
                        </div>
                    </div>
                </body>
            </div>
        </>
    )
}
export default Login
