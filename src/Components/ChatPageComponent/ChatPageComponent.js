import React, { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import firebase from 'firebase';

function ChatPageComponent({isloggedin,email}) {
    const [isloading,setisloading] = useState(true);
    const [name,setname] = useState(null);
    const [image,setimage] = useState(null);
    const [isonline,setisonline] = useState(false);
    const { emailid } = useParams();
    console.log(emailid);
    var provider = new firebase.auth.GoogleAuthProvider();
    var db = firebase.firestore();

    useEffect(()=>{
        db.collection("users").doc(emailid)
        .onSnapshot(function(doc) {
            if(doc.data().Email === emailid)
            {
                setname(doc.data().Name);
                setimage(doc.data().ProfilePic);
                setisonline(doc.data().isonline);
            }
        });
    },[])
    if(email!==emailid)
    return (
        <div>
            {
            isloggedin?
            <div>
            <div className="col-12 col-md-8 offset-md-2" style={{backgroundColor:"#EA80FC"}}>
            <div className="row" style={{paddingTop:"10px",paddingBottom:"10px"}}>
                <div className="col-3 col-md-2 offset-md-2">
                    <img src= {image} alt={image} style={{width:"55px",height:"55px"}} className="rounded-circle"/>
                </div>
                <div className="col-9 col-md-8">
                    <div className="row">
                        <h5>{name}</h5>
                    </div>
                    <div className="row">
                        {
                            isonline ?
                            <li>online</li>
                            :
                            <li>offline</li>
                        }
                    </div>
                </div>
            </div>
            </div>
            <div className="col-12 col-md-8 offset-md-2" style={{position:"fixed",bottom:"10px"}}>
                <div className="row" style={{display:"flex",flexWrap:"nowrap"}}>
                        <input type="email" class="form-control" id="exampleInputEmail1" style={{flex:1}} aria-describedby="emailHelp" placeholder="Type a message"></input>
                        <button className = "btn btn-outline-success" style={{minWidth:"50px"}} type = "submit" >Send</button> 
                </div>
            </div>
            </div>
            :
            <div>
                Login First
            </div>
            }
        </div>
    );
    else{
        return(
            <div>
                404 Page
            </div>
        )
    }
}

export default ChatPageComponent;