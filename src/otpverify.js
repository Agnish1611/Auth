import React, { useState } from "react";
import { Link } from "react-router-dom";
import {BsFillShieldLockFill} from "react-icons/bs";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { app } from "./firebase.config";
import alert from "./alertbox";

const database = getDatabase(app);
var loginusername;

function Verify(){

    const [emaili,setEmaili] = useState("");
    const [chusern,setchUsern] = useState("");

    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [showOtp, setshowOtp] = useState(false);
    const [verifySuccess, setverifySuccess] = useState(false);

    function handleloginuser(event){
        setchUsern(event.target.value);
    }

    function handleMailChange(event){
        setEmaili(event.target.value);
    }

    function onCaptchVerify(){
        if (!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                  onSignup();
                },
                'expired-callback': () => {}
              });
              
        }
    }

    function checkData(event){
        loginusername = document.getElementById("checkuser1").value;
        var loginmail = document.getElementById("email1").value;

        get(child(ref(database), 'Users/' + loginusername)).then((snapshot) => {
            if (snapshot.exists()) {
              let data = snapshot.val();
              if (data.email === loginmail){
                onSignup();
                //alert({title: "Success!", text: "User verified, sending OTP"});
                document.querySelector(".otp-user-verified").classList.add("show");
              }
              else{
                //alert({title: "Error!", text: "User detals wrong"});
                document.querySelector(".otp-details-invalid").classList.add("show");
                        setTimeout(function() {
                            document.querySelector(".otp-details-invalid").classList.remove("show");
                          }, 2000);
              }
            }
            else{
                document.querySelector(".otp-user-invalid").classList.add("show");
                        setTimeout(function() {
                            document.querySelector(".otp-user-invalid").classList.remove("show");
                          }, 2000);
                //alert({title: "Error!", text: "User doesn't exist"});
            }
          }).catch((error) => {
            console.error(error);
          });

        event.preventDefault();
    }

    function onSignup(){
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+" + ph;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setshowOtp(true);
      alert({title: "Success!", text: "OTP send successfully"});
    }).catch((error) => {
      console.log(error);
    });
    }

    function onOtpVerify(){
        window.confirmationResult.confirm(otp).then((res) => {
            setverifySuccess(true);
            alert({title: "OTP verified!", text: "You can now change your password"});
        })
        .catch((err) => {
            console.log(err);
            alert({title: "Error!", text: "Invalid OTP"});
        })
    }
    return (<section className="verify-section" >
        <div className="container">
          <div id="recaptcha-container"></div>
            {
                showOtp ? <>
                <div className="shield">
                    <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="enter-otp">
                    Enter your OTP
                </label>
                <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType="number" disabled={false} autofocus className="otp"></OtpInput>
                <button onClick={onOtpVerify} className="verify btn otp-btn">
                    <span>Verify OTP</span>
                </button>
                <Link to={verifySuccess && "/resetpass" }><p id="changepass">Change password</p></Link>
            </> :
            <>
                <label htmlFor="ph" className="enter-ph">
                    Forgot Password
                </label>
                <div className="otp-user-verified">User verified, Sending OTP</div>
                <div className="otp-sent">OTP sent successfully</div>
                <div className="otp-details-invalid">User details wrong</div>
                <div className="otp-user-invalid">User doesn't exist</div>
                <input placeholder="Username" value={chusern} onChange={handleloginuser} class="input" id="checkuser1" type="text"/>
                <input placeholder="Email" value={emaili} onChange={handleMailChange} class="input" type="email" id="email1"/>
                <PhoneInput searchClass="phone input-3" className="phone" inputClass="phone input-2" dropdownClass="phone input" country={"in"} value={ph} onChange={setPh}></PhoneInput>
                <button onClick={checkData} className="verify btn">
                    <span>Send OTP via SMS</span>
                </button>
            </>
            }
            
        </div>
    </section>)
}

export default Verify;

export {loginusername};