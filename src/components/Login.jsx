import React from "react";
function Login() {
    return (
        <>
            <div >
                <body class="login_page">
                    <div class="login_page_wrapper">
                        <div class="md-card" id="login_card">
                            <div class="md-card-content large-padding" id="login_form">
                                <div class="login_heading">
                                    <div class="user_avatar"></div>
                                </div>
                                <form action="javascript:void(0)" method="POST">
                                    <div class="uk-form-row">
                                        <label for="login_username">Username</label>
                                        <input class="md-input" type="text" id="login_username" name="login_username" tabindex="1"
                                            autocomplete="off" />
                                    </div>
                                    <div class="uk-form-row">
                                        <label for="login_password">Password</label>
                                        <input class="md-input" type="password" id="login_password" name="login_password" tabindex="2"
                                            autocomplete="off" />
                                    </div>
                                    <div class="uk-margin-medium-top">
                                        <input id="loginBtn" class="md-btn md-btn-primary md-btn-block md-btn-large login-form-btn"
                                            type="submit" tabindex="3" name="submit" value="Sign In" onclick="checkLogin()" />
                                    </div>
                                    <a href="javascript:void(0)" class="cursor">
                                        <div class="cursor" style={{"margin-top": "3% !important","text-align": "center"}}>
                                            <label for="Forgot_password" class="cursor" id="Forgot_password">Forgot password?</label>
                                        </div>
                                    </a>
                                </form>
                            </div>
                            <div class="md-card-content large-padding uk-position-relative" id="login_help" style={{"display": "none"}}>
                                <button type="button"
                                    class="uk-position-top-right uk-close uk-margin-right uk-margin-top back_to_login"></button>
                                <h2 class="heading_b uk-text-success">Can't log in?</h2>
                                <p>Here’s the info to get you back in to your account as quickly as possible.</p>
                                <p>First, try the easiest thing: if you remember your password but it isn’t working, make sure that Caps
                                    Lock is turned off, and that your username is spelled correctly, and then try again.</p>
                                <p>If your password still isn’t working, it’s time to <a href="#" id="password_reset_show">reset your
                                    password</a>.</p>
                            </div>
                            <div class="md-card-content large-padding" id="login_password_reset" style={{"display": "none"}}>
                                <button type="button" class="uk-position-top-right uk-close  back_to_login"></button>
                                <h2 class="heading_a uk-margin-large-bottom">Reset Password</h2>
                                <form action="javascript:void(0)" method="POST">
                                    <div class="uk-form-row">
                                        <label for="login_email_reset">Please enter registered email address</label>
                                        <input class="md-input" type="text" id="login_email_reset" name="email" autocomplete="off" />
                                    </div>

                                    <div class="uk-margin-medium-top">
                                        <input class="md-btn md-btn-primary md-btn-block md-btn-large login-form-btn" id="rest_password"
                                            type="submit" name="submit" value="Reset password" onclick="checkEmail()" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </body>
            </div>
        </>
    )
}
export default Login
