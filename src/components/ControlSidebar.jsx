import React from "react";
function ControlSidebar() {
    return (
        <>
            <aside calssName="control-sidebar control-sidebar-dark">
                <ul calssName="nav nav-tabs nav-justified control-sidebar-tabs">
                    <li><a href="#control-sidebar-home-tab" data-toggle="tab"><i calssName="fa fa-home"></i></a></li>
                    <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i calssName="fa fa-gears"></i></a></li>
                </ul>
                <div calssName="tab-content">
                    <div calssName="tab-pane" id="control-sidebar-home-tab">
                        <h3 calssName="control-sidebar-heading">Recent Activity</h3>
                        <ul calssName="control-sidebar-menu">
                            <li>
                                <a href="javascript:void(0)">
                                    <i calssName="menu-icon fa fa-birthday-cake bg-red"></i>

                                    <div calssName="menu-info">
                                        <h4 calssName="control-sidebar-subheading">Langdon's Birthday</h4>

                                        <p>Will be 23 on April 24th</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i calssName="menu-icon fa fa-user bg-yellow"></i>

                                    <div calssName="menu-info">
                                        <h4 calssName="control-sidebar-subheading">Frodo Updated His Profile</h4>

                                        <p>New phone +1(800)555-1234</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i calssName="menu-icon fa fa-envelope-o bg-light-blue"></i>

                                    <div calssName="menu-info">
                                        <h4 calssName="control-sidebar-subheading">Nora Joined Mailing List</h4>

                                        <p>nora@example.com</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i calssName="menu-icon fa fa-file-code-o bg-green"></i>

                                    <div calssName="menu-info">
                                        <h4 calssName="control-sidebar-subheading">Cron Job 254 Executed</h4>

                                        <p>Execution time 5 seconds</p>
                                    </div>
                                </a>
                            </li>
                        </ul>

                        <h3 calssName="control-sidebar-heading">Tasks Progress</h3>
                        <ul calssName="control-sidebar-menu">
                            <li>
                                <a href="javascript:void(0)">
                                    <h4 calssName="control-sidebar-subheading">
                                        Custom Template Design
                                        <span calssName="label label-danger pull-right">70%</span>
                                    </h4>

                                    <div calssName="progress progress-xxs">
                                        <div calssName="progress-bar progress-bar-danger" style={{ 'width': '70%' }}></div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <h4 calssName="control-sidebar-subheading">
                                        Update Resume
                                        <span calssName="label label-success pull-right">95%</span>
                                    </h4>

                                    <div calssName="progress progress-xxs">
                                        <div calssName="progress-bar progress-bar-success" style={{ 'width': '95%' }}></div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <h4 calssName="control-sidebar-subheading">
                                        Laravel Integration
                                        <span calssName="label label-warning pull-right">50%</span>
                                    </h4>

                                    <div calssName="progress progress-xxs">
                                        <div calssName="progress-bar progress-bar-warning" style={{ 'width': '50%' }}></div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <h4 calssName="control-sidebar-subheading">
                                        Back End Framework
                                        <span calssName="label label-primary pull-right">68%</span>
                                    </h4>

                                    <div calssName="progress progress-xxs">
                                        <div calssName="progress-bar progress-bar-primary" style={{ 'width': '68%' }}></div>
                                    </div>
                                </a>
                            </li>
                        </ul>

                    </div>
                    <div calssName="tab-pane" id="control-sidebar-settings-tab">
                        <form method="post">
                            <h3 calssName="control-sidebar-heading">General Settings</h3>

                            <div calssName="form-group">
                                <label calssName="control-sidebar-subheading">
                                    Report panel usage
                                    <input type="checkbox" calssName="pull-right" checked />
                                </label>

                                <p>
                                    Some information about this general settings option
                                </p>
                            </div>

                            <div calssName="form-group">
                                <label calssName="control-sidebar-subheading">
                                    Allow mail redirect
                                    <input type="checkbox" calssName="pull-right" checked />
                                </label>

                                <p>
                                    Other sets of options are available
                                </p>
                            </div>

                            <div calssName="form-group">
                                <label calssName="control-sidebar-subheading">
                                    Expose author name in posts
                                    <input type="checkbox" calssName="pull-right" checked />
                                </label>

                                <p>
                                    Allow the user to show his name in blog posts
                                </p>
                            </div>

                            <h3 calssName="control-sidebar-heading">Chat Settings</h3>

                            <div calssName="form-group">
                                <label calssName="control-sidebar-subheading">
                                    Show me as online
                                    <input type="checkbox" calssName="pull-right" checked />
                                </label>
                            </div>

                            <div calssName="form-group">
                                <label calssName="control-sidebar-subheading">
                                    Turn off notifications
                                    <input type="checkbox" calssName="pull-right" />
                                </label>
                            </div>

                            <div calssName="form-group">
                                <label calssName="control-sidebar-subheading">
                                    Delete chat history
                                    <a href="javascript:void(0)" calssName="text-red pull-right"><i calssName="fa fa-trash-o"></i></a>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </aside>
            <div calssName="control-sidebar-bg"></div>

        </>
    )
}
export default ControlSidebar