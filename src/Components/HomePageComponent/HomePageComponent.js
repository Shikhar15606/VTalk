import React,{useEffect, useState} from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

function HomePageComponent({isloggedin,email}) {
    console.log("Whole Component Rerendered");
    const [isloading,setisloading] = useState(true);
    var provider = new firebase.auth.GoogleAuthProvider();
    var db = firebase.firestore();
    const [list,setlist] = useState([]);
    // simple array becomes undefined in return 

    useEffect(()=>{
    {
        console.log(isloading);
        db.collection("users").where("Email", "!=", email)
        .onSnapshot(function(querySnapshot) {
            let data = [];
                querySnapshot.forEach(function(doc) {
                    data.push({name:doc.data().Name,image:doc.data().ProfilePic,isonline:doc.data().isonline,email:doc.data().Email});
                })
                console.log("data",data);
                setlist(data);
                setisloading(false);
        });
    } 
    },[])
    
    if(isloggedin)
    {
    return (
        <React.Fragment>
            {
            !isloading ?
            <div style={{marginTop:"80px"}}>
                {    
                    list.map(item => (
                        (
                            <div className="col-12 col-md-8 offset-md-2 my-1 user-list">
                                <Link to={`/chat/${item.email}`} style={{textDecoration:"none",color:"black"}}>
                                <div className="row">
                                <div style={{width:"55px",height:"55px",marginLeft:"10px"}}>
                                    <img src= {item.image} alt={item.name} style={{width:"55px",height:"55px"}} className="rounded-circle"/>
                                    {
                                        item.isonline ?
                                        <div style={{zIndex:1,borderRadius:"50%",top:"35px",left:"50px",width:"21px",height:"21px",backgroundColor:"white",position:"absolute"}}>
                                            <div style={{zIndex:2,borderRadius:"50%",top:"4px",left:"4px",width:"11px",height:"11px",backgroundColor:"rgb(2 161 253)",position:"absolute"}}>
                                            </div>
                                        </div>
                                        :
                                        <span></span>
                                    }
                                </div>
                                <div className="col-7 col-md-8 offset-1 offset-md-1" >
                                    <div className="row">
                                        <h5 style={{textAlign:"left"}} >{item.name}</h5>
                                    </div>
                                    <div className="row">
                                        <h7>{item.email}</h7>
                                    </div>
                                </div>
                                </div>
                                <hr />
                                </Link>
                            </div>
                        )
                    ))
                }
            </div>
            :
            <div>
               <div className="text-center">
                <div className="spinner-border text-primary" style={{width: "4rem",height: "4rem",marginTop:"20%"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
               </div>
            </div>
            }
        </React.Fragment>
    );
    }
    else{
    return(
        isloading === false ?
        <div style={{marginTop:"20%"}}>
            <h1>Login First</h1>
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

export default HomePageComponent;