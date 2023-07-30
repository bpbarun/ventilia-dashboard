import React, { useState } from "react";

import {
    NavLink
} from "react-router-dom";
function Sidebar() {
    const role = localStorage.getItem("user_role");
    return (
        <>
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="active treeview menu-open">
                            {role === 'sealseman' &&
                                <ul className="side-bar-menu">
                                    <NavLink to="/LeadGeneration">
                                        <li title="Dashboard">
                                            <span className="menu_title">Lead Generation</span>
                                        </li>
                                    </NavLink>

                                </ul>
                            }
                            {role === 'technical' &&
                                <ul className="side-bar-menu">
                                    <NavLink to="/QuotationUpload">
                                        <li title="QuotationUpload">
                                            <span className="menu_title">Quotation Upload</span>
                                        </li>
                                    </NavLink>
                                </ul>
                            }
                            {role === 'admin' &&
                                <ul className="side-bar-menu">
                                    <NavLink to="/Reports">
                                        <li title="Reports">
                                            <span className="menu_title">Reports</span>
                                        </li>
                                    </NavLink>
                                </ul>

                            }
                        </li>
                    </ul>
                </section>
            </aside>
        </>
    )
}
export default Sidebar;