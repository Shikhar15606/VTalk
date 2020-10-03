import React,{useEffect, useState} from 'react';
import firebase from 'firebase';

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
        db.collection("users").onSnapshot(function(querySnapshot) {
            let data = [];
                querySnapshot.forEach(function(doc) {
                    if(doc.data().Email !== email )
                    data.push({name:doc.data().Name,image:doc.data().ProfilePic,isonline:doc.data().isonline});
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
            <div>
                {    
                    list.map(item => (
                        (
                            <div className="col-12 col-md-8 offset-md-2 my-1">
                                <div className="row">
                                <div style={{width:"55px",height:"55px",marginLeft:"10px",marginRight:"10px"}}>
                                    <img src= {item.image} alt={item.name} style={{width:"55px",height:"55px"}} className="rounded-circle"/>
                                    {
                                        item.isonline ?
                                        <div style={{zIndex:1,borderRadius:"50%",top:"45px",left:"58px",width:"11px",height:"11px",backgroundColor:"rgb(2 161 253)",position:"absolute"}}>
                                        </div>
                                        :
                                        <span></span>
                                    }
                                </div>
                                <div className="col-9 col-md-10" >
                                    <h5 style={{textAlign:"left"}} >{item.name}</h5>
                                </div>
                                </div>
                                <hr />
                            </div>
                        )
                    ))
                }
            </div>
            :
            <div>
                <h1>Loading ....</h1>
            </div>
            }
        </React.Fragment>
    );
    }
    else{
    return(
        <React.Fragment>
            <h1>Login First</h1>
        </React.Fragment>
    )
    }
}

export default HomePageComponent;