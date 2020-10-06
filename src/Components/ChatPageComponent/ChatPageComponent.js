import React, { useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import firebase from 'firebase';
import {animateScroll as scroll } from "react-scroll";

function ChatPageComponent({isloggedin,email}) {
    let unsubscribe;
    console.log(isloggedin,email)
    const [isloading,setisloading] = useState(true);
    const [name,setname] = useState(null);
    const [image,setimage] = useState(null);
    const [isonline,setisonline] = useState(false);
    const [inputmsg,setinputmsg] = useState("");
    const [msg,setmsg] = useState([]);
    const { emailid } = useParams();
    console.log(emailid);
    var db = firebase.firestore();

    let sendmsg = (e) =>{
        // Add a new document with a generated id.
        if(inputmsg.length !== 0)
        {
            setinputmsg("");
            db.collection("messages").add({
                createdAt:new Date(),
                isview:false,
                message:inputmsg,
                receiver:emailid,
                sender:email
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
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
        console.log("Loggedin user",email)
        console.log("Other user",emailid)
        if(email && emailid && isloggedin)
        {
        unsubscribe = db.collection("messages")
        .where("sender", "in", [email, emailid])
        .orderBy("createdAt")
        .onSnapshot(function(querySnapshot) {
                let data = [];
                console.log(querySnapshot.length)
                querySnapshot.forEach(function(doc) {
                    if(doc.data().sender === email && doc.data().receiver === emailid)
                    {
                        // I am sender right side
                        let date = new Date(doc.data().createdAt.toMillis())
                        let time = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })},${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
                        data.push({right:true, message:doc.data().message,time:time, isseen:doc.data().isview})
                    }
                    else if(doc.data().sender === emailid && doc.data().receiver === email)
                    {
                        // I am receiver left side
                        const date = new Date((doc.data().createdAt.toMillis()));
                        let time = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
                        {db.collection("messages").doc(doc.id)
                        .update({isview:true})
                        .then(()=>{
                            console.log("Success");
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                        data.push({right:false,message:doc.data().message,time:time, isseen:doc.data().isview})
                        }
                    }
                })
                console.log("data",data);
                setmsg(data);
                setisloading(false);
                scroll.scrollToBottom();
            });
        }
    },[email])

    useEffect(() => { 
        return function cleanup () {
          unsubscribe();
          // if you return a function from useeffect then it will be executed after component unmounts
        }
     }, [])

    if(isloggedin)
    return (
        <div className="scroll" style={{height:"80%",marginBottom:"80px",overflowY:"auto"}}>
            {
            isloading ?
            <div>
                <div className="text-center">
                <div className="spinner-border text-primary" style={{width: "4rem",height: "4rem",marginTop:"20%"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            </div>
            :
            <div>
                <div className="col-12 col-md-8 offset-md-2 space-giver" style={{backgroundColor:"#EA80FC",position:"fixed",zIndex:5}}>
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
            <div className="col-12 col-md-8 offset-md-2" style={{marginTop:"110px"}}>
            <div class="speech-wrapper">
            {    
                    msg.length != 0 ?
                    msg.map(item => (
                        (
                            <div>
                            {
                                item.right ?
                                <div class="bubble alt" style={{float:"right",clear:"both"}}>
                                    <div class="txt">
                                        <p class="message">{item.message}</p>
                                        <span class="timestamp">
                                             {item.time}
                                             {
                                                item.isseen ?
                                                <i className="fa fa-check" aria-hidden="true" style={{color:"#34B7F1",paddingLeft:"5px"}} ></i>                 
                                                :
                                                <i className="fa fa-check" aria-hidden="true" style={{color:"white",paddingLeft:"5px"}} ></i>
                                                }
                                        </span>
                                    </div>
                                    <div class="bubble-arrow alt">
                                    </div>
                                </div>
                                :
                                <div class="bubble" style={{float:"left",clear:"both"}}>
                                    <div class="txt">
                                        <p class="message">{item.message}</p>
                                        <span class="timestamp">{item.time}</span>
                                    </div>
                                    <div class="bubble-arrow">
                                    </div>
                                </div>
                            }
                            </div>
                        )
                    ))
                    :
                    <div>
                    </div>
            }
            </div>
            </div>
            <br/>
            <br/>
            <div className="col-12 col-md-8 offset-md-2" style={{position:"fixed",bottom:"0px"}}>
                <div className="row" style={{display:"flex",flexWrap:"nowrap"}}>
                        <textarea value={inputmsg} onChange={inputmsgchange} type="email" class="form-control" id="exampleInputEmail1" style={{flex:1}} aria-describedby="emailHelp" placeholder="Type a message"></textarea>
                        <button className = "btn btn-success" style={{minWidth:"50px"}} type = "submit" onClick = {sendmsg} ><i class="fa fa-paper-plane fa-2x" aria-hidden="true"></i></button> 
                </div>
            </div>
            </div>
            }
        </div>
    );
    else{
        return(
            !isloading ?
            <div>
                <h1>Page Not Found</h1>
            </div>
            :
            <React.Fragment>
                <div className="text-center">
                <div className="spinner-border text-primary" style={{width: "4rem",height: "4rem",marginTop:"20%"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            </React.Fragment>

        )
    }
}

export default ChatPageComponent;