import React, { useState } from "react";
import { Link } from "react-router-dom";
import { app } from "./firebase.config";
import { loginusername } from "./otpverify";
import { getDatabase, ref, update} from "firebase/database";
import alert from "./alertbox";

const database = getDatabase(app);

function Reset(){

    const [newpass, setNewpass] = useState("");
    const [newconpass, setNewconpass] = useState("");

    function handlepasschange(event){
        setNewpass(event.target.value);
    }

    function handleconpasschange(event){
        setNewconpass(event.target.value);
    }

    function updateUser(event){

    const updates = {};

    updates["Users/"+loginusername+"/password"] = newpass;
    
    update(ref(database), updates).then( () => {
        alert({title: "Password changed!", text: "Now you can login"});
    }).catch((err) => {
        alert({title: "Error!", text: "Update failed"});
        console.log(err);
    });

    event.preventDefault();
    }

    return (<div className="reset-pass">
        <form class="form" id="myForm">
        <div class="form_front">
            <div class="form_details">Reset Password</div>
            <input placeholder="New Password" onChange={handlepasschange} value={newpass} class="input" id="newpass" type="password"/>
            <input placeholder="Confirm Password" onChange={handleconpasschange} value={newconpass} class="input" id="newconpass" type="password"/>
            <button class="btn" onClick={(e) => {
                if ((newpass === newconpass) && (newpass !== "")){
                    updateUser(e);
                }
                else{
                    alert({title: "Error!", text: "Passwords must be same"});
                }
            }} type="submit">Change Password</button>
            <Link to="/"><p className="goback">Go back to login</p></Link>
        </div>
        </form>
    </div>)
}

export default Reset;