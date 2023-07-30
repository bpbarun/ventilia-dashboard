import React from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from './Constant';
function Header() {
    const logoutPopup = (id) => {
        let element = document.getElementById(id);
        element.classList.toggle('open');
    }
    const callLogout = () => {
        axios.delete(IP + 'ventilia-api/index.php/api/login/login/' + localStorage.getItem("token_id"), {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Logout successfully.', 'success')
            localStorage.clear();
            window.location = "/login";
        }).catch(err => console.log('response catch', err));
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
            <header className="main-header">
                <a href="/" className="logo">
                    <span className="logo-lg"><b>Ventilia</b></span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu" id="headrUserName" onClick={() => { logoutPopup('headrUserName') }}>
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                    <span>{localStorage.getItem("user_name")}</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="user-body">
                                        <div className="row">
                                            <div className="text-center">
                                                <a className="cursor-pointer" onClick={callLogout}>Logout</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <ToastContainer />
                </nav>
            </header>
        </>
    )
}
export default Header;