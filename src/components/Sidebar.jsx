import React from "react";

import {
        NavLink
} from "react-router-dom";
function Sidebar() {
    return (
        <>
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="active treeview menu-open">
                            <ul className="side-bar-menu">
                                <NavLink to="/LeadGeneratioln">
                                    <li title="Dashboard">
                                        <span className="menu_title">Lead Generation</span>
                                    </li>
                                </NavLink>
                                </ul>
                                <ul className="side-bar-menu">
                                <NavLink to="/QuotationUpload">
                                    <li title="QuotationUpload">
                                        <span className="menu_title">Quotation Upload</span>
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