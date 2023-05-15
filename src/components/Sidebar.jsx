import React from "react";

import {
    BrowserRouter as 
    NavLink
} from "react-router-dom";
function Sidebar() {
    return (
        <>
            <aside className="main-sidebar">
                <section className="sidebar">


                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="active treeview menu-open">
                            {/* <a href="#">
                                <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                                <span className="pull-right-container">
                                    <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a> */}
                            <ul className="treeview-menu">
                                <li><a href="index.html"><i className="fa fa-circle-o"></i> Dashboard v1</a></li>
                                <li className="active"><a href="index2.html"><i className="fa fa-circle-o"></i> Dashboard v2</a></li>
                                <NavLink to="/Dashboard">
                                    <li title="Dashboard">
                                        <span className="menu_title">Dashboard</span>
                                    </li>
                                </NavLink>
                            </ul>
                        </li>
                    </ul>
                </section>
            </aside>
        </>
    )
}
export default Sidebar;