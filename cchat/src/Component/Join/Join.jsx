import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

let user;
const Join= ()=>{
  const [name,setName] = useState(""); 
  const sendUser = ()=>{
     user = document.getElementById('user').value;
  }
    return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
             <img className="img1" src="https://juststickers.in/wp-content/uploads/2017/10/f-society-original-badge.png" alt="icon" />
             <h1>fSociety</h1>
             <input name="name" value={name} onChange={(e)=>{setName(e.target.value)}}
              placeholder="Enter the name" 
               className='input' />
            <Link onClick={(event)=> !name ? event.preventDefault():null} to="/Chat"> <button value={name} id="user" className="btn" onClick ={sendUser} >Submit </button></Link>
        </div>
    </div>

  )
}
export {user,Join};