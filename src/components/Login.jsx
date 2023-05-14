import React, { useEffect, useState } from "react";
import axios from 'axios';
function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = (props) => {
        console.log(userName);
        console.log(password)
        checkLogin();
    }
    const handleUsername = (e)=>{
        setUserName(e.target.value)
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }
    const checkLogin = () => {
        const data = {
            user: userName,
            password: password
        }
        axios.post('http://localhost/ventilia-api/api/login/login', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            props.setIsLogin(true);
        }).catch(err => console.log('response catch', err));
    }
    return (
        <>
            <div >
                <body class="login-page">
                    <div class="login_page_wrapper">
                        <div class="login-box">
                            <div class="login-box-body">
                                <p class="login-box-msg">Sign in to start your session</p>
                                <div class="login_heading">
                                    <div class="user_avatar"></div>
                                </div>
                                <form action="../../index2.html" method="post">
                                    <div class="form-group has-feedback">
                                        <input type="text" class="form-control" placeholder="Username" onChange={handleUsername}/>
                                        <span class="glyphicon glyphicon-user form-control-feedback"></span>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <input type="password" class="form-control" placeholder="Password" onChange={handlePassword}/>
                                        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <button type="button" onClick={login} class="btn btn-primary btn-block btn-flat">Sign In</button>
                                        </div>
                                    </div>
                                </form>
                                {/* <a href="javascript:void(0)" class="cursor">
                                    <div class="cursor" style={{ "margin-top": "3% !important", "text-align": "center" }}>
                                        <label for="Forgot_password" class="cursor" id="Forgot_password">Forgot password?</label>
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
