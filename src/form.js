import React from "react";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useState } from "react";
import { Link } from "react-router-dom";
import { app } from "./firebase.config";
import alert from "./alertbox";

const database = getDatabase(app);

function Form(){

    const [nam,setNam] = useState("");
    const [passw,setPassw] = useState("");
    const [usern,setUsern] = useState("");
    const [emaili,setEmaili] = useState("");
    const [conpassw,setConpassw] = useState("");
    const [chpassw,setchPassw] = useState("");
    const [chusern,setchUsern] = useState("");

    function handleNameChange(event) {
        setNam(event.target.value);
    }

    function handlePassChange(event) {
        setPassw(event.target.value);
    }

    function handleUsernChange(event) {
        setUsern(event.target.value);
    }

    function handleConpassChange(event){
        setConpassw(event.target.value);
    }

    function handleMailChange(event) {
        setEmaili(event.target.value);
    }

    function handleloginuser(event){
        setchUsern(event.target.value);
    }

    function handleloginpass(event){
        setchPassw(event.target.value);
    }

    function setData(event){
        var signUpname = document.getElementById("name").value;
        var signUpusername = document.getElementById("username").value;
        var signUpPass = document.getElementById("password").value;
        var signUpConPass = document.getElementById("conpass").value;
        var signupMail = document.getElementById("email").value;

        var data = {
            name: signUpname,
            email: signupMail,
            password: signUpPass
        }

        
        

        get(child(ref(database), 'Users/' + signUpusername)).then((snapshot) => {
            if (snapshot.exists()) {
                document.querySelector(".username-failure").classList.add("show");
                setTimeout(function() {
                    document.querySelector(".username-failure").classList.remove("show");
                  }, 5000);
            }
            else{
                if (signUpConPass === signUpPass){

                    set(ref(database, "Users/" + signUpusername), data).then(() => {
                        document.querySelector(".signup-confirmation").classList.add("show");
                        setTimeout(function() {
                            document.querySelector(".signup-confirmation").classList.remove("show");
                          }, 5000);
                    }).catch((e) => {
                        document.querySelector(".signup-failure").classList.add("show");
                        setTimeout(function() {
                            document.querySelector(".signup-failure").classList.remove("show");
                          }, 5000);
                        console.log(e);
                    });
            
                    event.preventDefault();
                    }
                    else{
                        document.querySelector(".pass-failure").classList.add("show");
                        setTimeout(function() {
                            document.querySelector(".pass-failure").classList.remove("show");
                          }, 5000);
                    }
            }
          }).catch((error) => {
            console.error(error);
          });
        event.preventDefault();
        
    }

    function checkData(event){
        var loginusername = document.getElementById("checkuser").value;
        var loginPass = document.getElementById("checkpass").value;

        get(child(ref(database), 'Users/' + loginusername)).then((snapshot) => {
            if (snapshot.exists()) {
              let data = snapshot.val();
              if (data.password === loginPass){
                document.querySelector(".login-con").classList.add("show");
                        setTimeout(function() {
                            document.querySelector(".login-con").classList.remove("show");
                          }, 5000);
              }
              else{
                document.querySelector(".details-invalid").classList.add("show");
                        setTimeout(function() {
                            document.querySelector(".details-invalid").classList.remove("show");
                          }, 5000);
              }
            }
            else{
                document.querySelector(".user-invalid").classList.add("show");
                        setTimeout(function() {
                            document.querySelector(".user-invalid").classList.remove("show");
                          }, 5000);
            }
          }).catch((error) => {
            console.error(error);
          });

        event.preventDefault();
    }

    return (<div class="container">
    <input type="checkbox" id="signup_toggle"/>
    <form class="form" id="myForm">
        <div class="form_front">
            <div class="form_details">Login</div>
            <div className="login-con">Login Successful</div>
            <div className="details-invalid">User details wrong</div>
            <div className="user-invalid">User doesn't exist</div>
            <input placeholder="Username" value={chusern} onChange={handleloginuser} class="input" id="checkuser" type="text"/>
            <input placeholder="Password" value={chpassw} onChange={handleloginpass} class="input" id="checkpass" type="password"/> 
            <button class="btn" type="submit" onClick={checkData}>Login</button>
            <span class="switch">Don't have an account? 
                <label class="signup_tog" for="signup_toggle">
                    Sign Up
                </label>
            </span>
            <Link to="/verify"><p>Forgot Password ?</p></Link>
            <p className="sendmail">Didn't receive mail? <span>Send Again</span></p>
        </div>
        <div class="form_back">
            <div class="form_details">SignUp</div>
            <div className="signup-confirmation">Signed Up successfully, now you can Login</div>
            <div className="signup-failure">Sign Up Failed</div>
            <div className="username-failure">Username already exists</div>
            <div className="pass-failure">Passwords must be same</div>
            <input placeholder="Firstname" value={nam} onChange={handleNameChange} class="input" type="text" id="name"/>
            <input placeholder="Username" value={usern} onChange={handleUsernChange}  class="input" type="text" id="username"/>
            <input placeholder="Email" value={emaili} onChange={handleMailChange} class="input" type="email" id="email"/>
            <input placeholder="Password" value={passw} onChange={handlePassChange} class="input" id="password" type="password"/>
            <input placeholder="Confirm Password" value={conpassw} onChange={handleConpassChange} id="conpass" class="input" type="password"/>
            <button class="btn" type="submit" onClick={setData}>Signup</button>
            <span class="switch">Already have an account? 
                <label class="signup_tog" for="signup_toggle">
                    Login
                </label>
            </span>
        </div>
    </form>
</div>);
}

export default Form;