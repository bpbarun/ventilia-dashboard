import React, { useState,useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP } from './Constant';
import { NavLink } from "react-router-dom";
import Select from 'react-select';

function Header() {
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [noOfRequestData,setNoOfRequestData] = useState(0)
    const [frenchaisesOptions,setFrenchaisesOptions] = useState([])
    const [frenchaisesOption,setFrenchaisesOption] = useState("")

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
            window.location = "/";
        }).catch(err => console.log('response catch', err));
    }

    const changePassword = () => {
        if (oldPassword === '') {
            notify('Old password can not be null', 'error');
            return;
        }
        if (password === '') {
            notify('Password can not be null', 'error')
            return;
        }
        if (password.length < 4) {
            notify('Password must be minimum 4 charecter', 'error');
            return;
        }
        if (confPassword === '') {
            notify('Confirm password can not be null', 'error')
            return;
        }
        if (confPassword !== password) {
            notify('password did not match with confirm password', 'error')
            return;
        }
        let postData = {}
        postData = {
            oldPassword: oldPassword,
            password: password
        }
        axios.put(IP + 'ventilia-api/index.php/api/auth/auth/' + localStorage.getItem("user_id"), postData, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            console.log(response.data)
            if (response.data.status) {
                notify(response.data.data, 'success')
                setTimeout(function () {
                    localStorage.clear();
                    window.location = "/";
                }, 2000)

            } else {
                notify(response.data.error, 'error')
                return;
            }
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
    useEffect(()=>{
        axios.get(IP + 'ventilia-api/index.php/api/user/leave/requestForApproval', {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            if(response.data.data !== undefined){
                setNoOfRequestData(response.data.data.length)
            }else{
               setNoOfRequestData(0)
            }
           
        }).catch(err => {
            console.log('Something got wrong please try again later.', 'error')
            console.log(err);
        });
    },[])

    useEffect(()=>{
        axios.get(IP + 'ventilia-api/index.php/api/user/user/franchises/'+localStorage.getItem("user_id"), {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            if(response.data.data !== undefined){
                setFrenchaisesOptions(response.data.data)
                setFrenchaisesOption(response.data.data[0].is_active)
            }else{
              setFrenchaisesOptions([])
            }
           
        }).catch(err => {
            console.log('Something got wrong please try again later.', 'error')
            console.log(err);
        });
    },[])
    const handleFrenchaises  = (e)=>{
        setFrenchaisesOption(e.value);
        saveFranchaises(e.value)
    }
    const saveFranchaises = (id)=>{
        let data={};
        data={
            is_active:id
        }
         axios.post(IP + 'ventilia-api/index.php/api/user/user/franchises/'+ localStorage.getItem("user_id"),data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            console.log('succecss',response);
            notify('Franchises added sucessfully.', 'success')
        }).catch(err => {
            console.log('Something got wrong please try again later.', 'error')
            console.log(err);
        });
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
                    {localStorage.getItem("user_role") === 'admin' &&<button className="btn request-for-approval-btn"><NavLink to="RequestForApproval">Leave Approval ({noOfRequestData})</NavLink></button> }
                    {localStorage.getItem("user_role") === 'sealseman_teamlead' &&
                    <div className="navbar-custom-menu franchisesDropdown">
                    {/* <ul className="nav navbar-nav">
                        <li className="dropdown user user-menu" id="chooseFrenchies" onClick={() => { logoutPopup('chooseFrenchies') }}>
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <span>Chose Frenchaises</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="user-body">
                                    <div className="row">
                                        <div className="text-center">
                                            <a className="cursor-pointer" onClick={callLogout}>Logout</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="cursor-pointer" data-toggle="modal" aria-hidden="true" data-target="#changePassword">Change Password</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul> */}
                     <Select
                        value={frenchaisesOptions.filter(function (option) {
                            return option.value === frenchaisesOption;
                        })}
                        onChange={handleFrenchaises}
                        options={frenchaisesOptions}
                        placeholder="Select Franchises"
                    />
                </div> }

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
                                            <div className="text-center">
                                                <a className="cursor-pointer" data-toggle="modal" aria-hidden="true" data-target="#changePassword">Change Password</a>
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
            <div className="modal fade" id="changePassword">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"></span></button>
                            <h4 className="modal-title">Change Password</h4>
                        </div>
                        <div className="modal-body">
                            <div className="box-body">
                                <form role="form">
                                    <div className="form-group">
                                        <label>Old Password</label>
                                        <input type="password" onChange={(e) => { setOldPassword(e.target.value) }} maxLength='10' className="form-control" placeholder="Old Password" />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} maxLength='10' className="form-control" placeholder="New Password" />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password" onChange={(e) => { setConfPassword(e.target.value) }} maxLength='10' className="form-control" placeholder="Confirm Password" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                            <button type="button" onClick={changePassword} className="btn btn-primary" data-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="modal fade" id="requestForApproval">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i  className="fa fa-times" aria-hidden="true"></i></span></button>
                            <h4 className="modal-title">Request For Approval</h4>
                        </div>
                        <div className="modal-body">
                            <RequestForApproval  noOfRequestData={setNoOfRequest}/>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}
export default Header;