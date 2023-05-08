import React from "react";
function Login2() {
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
                                        <input type="text" class="form-control" placeholder="Email" />
                                        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                                    </div>
                                    <div class="form-group has-feedback">
                                        <input type="password" class="form-control" placeholder="Password" />
                                        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
                                        </div>
                                    </div>
                                </form>
                                <a href="javascript:void(0)" class="cursor">
                                    <div class="cursor" style={{ "margin-top": "3% !important", "text-align": "center" }}>
                                        <label for="Forgot_password" class="cursor" id="Forgot_password">Forgot password?</label>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </body>
            </div>
        </>
    )
}
export default Login2
