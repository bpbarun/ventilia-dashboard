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
                <body className="login-page">
                    <div className="login_page_wrapper">
                        <div className="login-box">
                            <div className="login-box-body">
                                <p className="login-box-msg">Sign in to start your session</p>
                                <div className="login_heading">
                                    <div className="user_avatar"></div>
                                </div>
                                <form action="../../index2.html" method="post">
                                    <div className="form-group has-feedback">
                                        <input type="text" className="form-control" placeholder="Username" onChange={handleUsername}/>
                                        <span className="glyphicon glyphicon-user form-control-feedback"></span>
                                    </div>
                                    <div className="form-group has-feedback">
                                        <input type="password" className="form-control" placeholder="Password" onChange={handlePassword}/>
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
