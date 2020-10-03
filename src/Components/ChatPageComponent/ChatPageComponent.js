import React, { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import firebase from 'firebase';

function ChatPageComponent({isloggedin,email}) {
    console.log(isloggedin,email)
    const [isloading,setisloading] = useState(true);
    const [name,setname] = useState(null);
    const [image,setimage] = useState(null);
    const [isonline,setisonline] = useState(false);
    const [inputmsg,setinputmsg] = useState("");
    const [msg,setmsg] = useState([]);
    const { emailid } = useParams();
    console.log(emailid);
    var provider = new firebase.auth.GoogleAuthProvider();
    var db = firebase.firestore();

    let sendmsg = (e) =>{
        e.preventDefault();
        // Add a new document with a generated id.
        db.collection("messages").add({
            createdAt:new Date(),
            isview:true,
            message:inputmsg,
            receiver:emailid,
            sender:email
        })
        .then(function(docRef) {
            setinputmsg("");
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    
    let inputmsgchange = (e)=>{
        setinputmsg(e.target.value);
    }

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

    useEffect(()=>{
        setisloading(true);
        console.log("Loggedin user",email)
        console.log("Other user",email)
        if(email && emailid && isloggedin)
        db.collection("messages")
        .where("sender", "in", [email, emailid])
        .orderBy("createdAt")
        .onSnapshot(function(querySnapshot) {
                let data = [];
                console.log(querySnapshot.length)
                querySnapshot.forEach(function(doc) {
                    if(doc.data().sender === email && doc.data().receiver === emailid)
                    {
                        // I am sender right side
                        data.push({right:true,message:doc.data().message})
                    }
                    else if(doc.data().sender === emailid && doc.data().receiver === email)
                    {
                        // i am receiver left side
                        data.push({right:false,message:doc.data().message})
                    }
                })
                console.log("data",data);
                setmsg(data);
                setisloading(false);
        });
    },[])


    if(isloggedin)
    return (
        <div>
            {
            isloading ?
            <div>
                <h1>Loading ...</h1>
            </div>
            :
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
            <br/>
            <br/>
            <div className="col-12 col-md-8 offset-md-2">
            {    
                    msg.length != 0 ?
                    msg.map(item => (
                        (
                            <React.Fragment>
                            {
                                item.right ?
                                <div>
                                <div class="alert alert-primary" role="alert" style={{float:"right",clear:"both"}}>
                                    {item.message}
                                </div> 
                                <br/>
                                </div> 
                                :
                                <div>
                                <div class="alert alert-primary" role="alert" style={{float:"left",clear:"both"}}>
                                    {item.message}
                                </div> 
                                <br/>
                                </div> 
                            }
                            </React.Fragment>
                        )
                    ))
                    :
                    <div>
                    </div>
            }
            </div>
            <br/>
            <br/>
            <div className="col-12 col-md-8 offset-md-2" style={{position:"fixed",bottom:"10px"}}>
                <div className="row" style={{display:"flex",flexWrap:"nowrap"}}>
                        <input value={inputmsg} onChange={inputmsgchange} type="email" class="form-control" id="exampleInputEmail1" style={{flex:1}} aria-describedby="emailHelp" placeholder="Type a message"></input>
                        <button className = "btn btn-outline-success" style={{minWidth:"50px"}} type = "submit" onClick = {sendmsg} >Send</button> 
                </div>
            </div>
            </div>
            }
        </div>
    );
    else{
        return(
            <div>
                404
            </div>
        )
    }
}

export default ChatPageComponent;