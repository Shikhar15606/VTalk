import React,{useEffect, useState} from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

function HomePageComponent({isloggedin,email}) {
    console.log("Whole Component Rerendered");
    let unsubscribe = ()=>{
        console.log("No need For cleanup now");
    };
    let unsubscribe2 = ()=>{
        console.log("No need For cleanup now");
    };
    const [isloading,setisloading] = useState(true);
    var db = firebase.firestore();
    const [list,setlist] = useState([]);
    const [arr,setarr] = useState([]);
    // simple array becomes undefined in return 

    useEffect(()=>{
    {
        console.log(isloading);
        unsubscribe = db.collection("users").where("Email", "!=", email)
        .onSnapshot(function(querySnapshot) {
            let data = [];
                querySnapshot.forEach(function(doc) {
                    data.push({name:doc.data().Name,image:doc.data().ProfilePic,isonline:doc.data().isonline,email:doc.data().Email});
                })
                console.log("data",data);
                setlist(data);
                // setisloading(false);
        });
    } 
    },[])

    useEffect(() =>{
        console.log(isloading);
        unsubscribe2 = db.collection("messages").where("receiver", "==", email).where("isview","==",false)
        .onSnapshot(function(querySnapshot) {
            let data2 = [];
                querySnapshot.forEach(function(doc) {
                    data2.push(doc.data().sender);
                })
                console.log("data2",data2);
                setarr(data2);
                setisloading(false);
        });
    },[])

    useEffect(() => { 
        return function cleanup () {
          unsubscribe();
          unsubscribe2();
          // if you return a function from useeffect then it will be executed after component unmounts
        }
     }, [])
    
    if(isloggedin)
    {
    return (
        <React.Fragment>
            {
            !isloading ?
            <div className="top-margin">
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
                                            <div style={{zIndex:2,borderRadius:"50%",top:"4px",left:"4px",width:"11px",height:"11px",backgroundColor:"#5BC236",position:"absolute"}}>
                                            </div>
                                        </div>
                                        :
                                        <span></span>
                                    }
                                </div>
                                <div className="col-6 col-md-6 offset-1 offset-md-1" >
                                    <div className="row">
                                        <h6 style={{textAlign:"left"}} >{item.name}</h6>
                                    </div>
                                    <div className="row">
                                        <h7>{item.email}</h7>
                                    </div>
                                </div>
                                {
                                        arr.includes(item.email) ?
                                            <div className="newmsgdot">
                                            </div>
                                        :
                                        <span></span>
                                }
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