import React, { useState, useEffect } from "react";
import axios from 'axios';
import { IP } from './Constant'
import {
    NavLink
} from "react-router-dom";
function Sidebar() {
    const role = localStorage.getItem("user_role");
    const [sealseman, setSealseman] = useState([]);
    const [followUpCount, setFollowUpCount] = useState("");
    const fetchData = () => {
        axios.get(IP + 'ventilia-api/index.php/api/user/user/technicalsidebar/'+localStorage.getItem("user_id"), {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            setSealseman(response.data.data)
        }).catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        let url = 'ventilia-api/api/leadGeneration/followUp/getTodayFollowups/'+localStorage.getItem('salesmanUserID')
            axios.get(IP + url, {
                headers: {
                    'token_code': localStorage.getItem("token_code"),
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Headers': '*'
                }
            }).then((response) => {
                if(response.data.status){
                    setFollowUpCount(response.data.data.length)
                }
            }).catch(err => {
                console.log(err);
            });
        }, [localStorage.getItem('salesmanUserID')]);
    return (
        <>
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="active treeview menu-open">
                            {role === 'sealseman' &&
                                <>
                                    <ul className="side-bar-menu">
                                        <NavLink to="/MyReport">
                                            <li title="MyReport">
                                            <span className="menu_title"><i class="fa fa-tachometer" aria-hidden="true"></i> MyReport</span>
                                            </li>
                                        </NavLink>
                                    </ul>
                                    <ul className="side-bar-menu">
                                        <NavLink to="/LeadGeneration">
                                            <li title="Dashboard">
                                                <span className="menu_title"><i class="fa fa-tasks" aria-hidden="true"></i> Lead Generation</span>
                                            </li>
                                        </NavLink>
                                    </ul>
                                    <ul className="side-bar-menu">
                                        <NavLink to="/Opportunity">
                                            <li title="Dashboard">
                                                <span className="menu_title"><i class="fa fa-credit-card" aria-hidden="true"></i> Opprtunity Details</span>
                                            </li>
                                        </NavLink>
                                    </ul>
                                    
                                    {/* <ul className="side-bar-menu">
                                 <NavLink to="/ShowLocation">
                                     <li title="Locaion">
                                         <span className="menu_title">ShowLocation</span>
                                     </li>
                                 </NavLink>
                                </ul> */}
                                <ul className="side-bar-menu">
                                 <NavLink to="/AttendenceCalendar">
                                     <li title="AttendenceCalendar">
                                         <span className="menu_title"><i class="fa fa-calendar" aria-hidden="true"></i> AttendenceCalendar</span>
                                     </li>
                                 </NavLink>
                                </ul>
                                 <ul className="side-bar-menu">
                                 <NavLink to='/Attendence'>
                                     <li title="Attendence">
                                         <span className="menu_title"><i class="fa fa-address-book" aria-hidden="true"></i>  Attendence</span>
                                     </li>
                                 </NavLink>
                                </ul>
                                <ul className="side-bar-menu">
                                 <NavLink to="/Leave">
                                     <li title="Leave">
                                         <span className="menu_title"><i class="fa fa-suitcase" aria-hidden="true"></i> Leave</span>
                                     </li>
                                 </NavLink>
                                </ul>
                                <ul className="side-bar-menu">
                                 <NavLink to="/FollowUp">
                                     <li title="Leave">
                                         <span className="menu_title"><i class="fa fa-phone" aria-hidden="true"></i> FollowUp<b>({followUpCount})</b></span>
                                     </li>
                                 </NavLink>
                                </ul>
                                </>
                            }
                            {role === 'sealseman_teamlead' &&
                                <>
                                 <ul className="side-bar-menu">
                                        <NavLink to={`/MyReport/`+localStorage.getItem('user_id')}>
                                            <li title="MyReport">
                                                <span className="menu_title"><i class="fa fa-tachometer" aria-hidden="true"></i> MyReport</span>
                                            </li>
                                        </NavLink>
                                    </ul>
                                    <ul className="side-bar-menu">
                                    <NavLink to="/TeamReports">
                                        <li title="My Team Report">
                                            <span className="menu_title"><i class="fa fa-users" aria-hidden="true"></i> My Team Report</span>
                                        </li>
                                    </NavLink>
                                    </ul>
                                    <ul className="side-bar-menu">
                                        <NavLink to="/LeadGeneration">
                                            <li title="Dashboard">
                                                <span className="menu_title"><i class="fa fa-tasks" aria-hidden="true"></i> Lead Generation</span>
                                            </li>
                                        </NavLink>
                                    </ul>
                                    <ul className="side-bar-menu">
                                        <NavLink to="/Opportunity">
                                            <li title="Dashboard">
                                                <span className="menu_title"><i class="fa fa-credit-card" aria-hidden="true"></i> Opprtunity Details</span>
                                            </li>
                                        </NavLink>
                                    </ul>
                                  
                                <ul className="side-bar-menu">
                                 <NavLink to="/AttendenceCalendar">
                                     <li title="AttendenceCalendar">
                                         <span className="menu_title"><i class="fa fa-calendar" aria-hidden="true"></i> AttendenceCalendar</span>
                                     </li>
                                 </NavLink>
                                </ul>
                                 <ul className="side-bar-menu">
                                 <NavLink to='/Attendence'>
                                     <li title="Attendence">
                                         <span className="menu_title"><i class="fa fa-address-book" aria-hidden="true"></i> Attendence</span>
                                     </li>
                                 </NavLink>
                                </ul>
                                <ul className="side-bar-menu">
                                 <NavLink to="/Leave">
                                     <li title="Leave">
                                         <span className="menu_title"><i class="fa fa-suitcase" aria-hidden="true"></i> Leave</span>
                                     </li>
                                 </NavLink>
                                </ul>
                                <ul className="side-bar-menu">
                                 <NavLink to="/FollowUp">
                                     <li title="Leave">
                                         <span className="menu_title"><i class="fa fa-phone" aria-hidden="true"></i> FollowUp<b>({followUpCount})</b></span>
                                     </li>
                                 </NavLink>
                                </ul>
                                </>
                            }
                            {role === 'technical' &&
                                <>
                                    <ul className="side-bar-menu">
                                        <NavLink to="/QuotationUpload">
                                            <li title="QuotationUpload">
                                                <span className="menu_title">Quotation Upload</span>
                                            </li>
                                        </NavLink>
                                    </ul>
                                    {sealseman.map((data) => (
                                        < ul className="side-bar-menu" >
                                            <NavLink to={`/QuotationUpload/${data.user_id}`}>
                                                <li title="QuotationUpload">
                                                    <span className="menu_title">{data.user_name}({data.no_of_lead})</span>
                                                </li>
                                            </NavLink>
                                        </ul>
                                    ))}
                                </>
                            }
                            {role === 'admin' &&
                            <>
                                <ul className="side-bar-menu">
                                    <NavLink to="/Reports">
                                        <li title="Reports">
                                            <span className="menu_title"><i class="fa fa-tachometer" aria-hidden="true"></i> Reports</span>
                                        </li>
                                    </NavLink>
                                </ul>
                                <ul className="side-bar-menu">
                                    <NavLink to="/UserCrud">
                                        <li title="UserCrud">
                                            <span className="menu_title"><i class="fa fa-male" aria-hidden="true"></i> New User</span>
                                        </li>
                                    </NavLink>
                                </ul>
                                <ul className="side-bar-menu">
                                    <NavLink to="/TeamAssignment">
                                        <li title="TeamAssignment">
                                            <span className="menu_title"><i class="fa fa-users" aria-hidden="true"></i> TeamLead & Techical</span>
                                        </li>
                                    </NavLink>   
                                </ul>
                                <ul className="side-bar-menu">
                                    <NavLink to="/TeamleadSalesman">
                                        <li title="TeamleadSalesman">
                                            <span className="menu_title"><i class="fa fa-address-book" aria-hidden="true"></i> Teamlead & Salesman</span>
                                        </li>
                                    </NavLink>
                                </ul>
                                <ul className="side-bar-menu">
                                    <NavLink to="/TechnicalSalesman">
                                        <li title="TechnicalSalesman">
                                            <span className="menu_title"><i class="fa fa-user" aria-hidden="true"></i> Technical & Salesman</span>
                                        </li>
                                    </NavLink>
                                </ul>
                             </>
                            }
                        </li>
                    </ul>
                </section>
            </aside>
        </>
    )
}
export default Sidebar;