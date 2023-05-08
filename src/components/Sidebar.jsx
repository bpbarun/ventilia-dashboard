import React from "react";

import {
    BrowserRouter as 
    NavLink
} from "react-router-dom";
function Sidebar() {
    return (
        <>
            <aside class="main-sidebar">
                <section class="sidebar">


                    <ul class="sidebar-menu" data-widget="tree">
                        <li class="active treeview menu-open">
                            {/* <a href="#">
                                <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a> */}
                            <ul class="treeview-menu">
                                <li><a href="index.html"><i class="fa fa-circle-o"></i> Dashboard v1</a></li>
                                <li class="active"><a href="index2.html"><i class="fa fa-circle-o"></i> Dashboard v2</a></li>
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