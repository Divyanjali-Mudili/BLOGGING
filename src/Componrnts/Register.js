import {useState} from 'react';


export default function Register(){
    const [userName , setuserName ]=useState('');
    const [userEmail, setuserEmail]=useState('');
    async function Register(ev){
        ev.preventDefault();
      await fetch('http://localhost:4000',{
            method:'POST',
            body:JSON.stringify({userName,userEmail}),
            headers:{'Content-Type':'application/json'}
        })
    }
    return(
        <>
        <form className="register" onSubmit={Register}>
            <h1>Register</h1>
            <input type="text" placeholder="userName" value={userName}
            onchange={ev => setuserName(ev.target.value)}required></input>
            <input type="email" placeholder="userEmail" value={userEmail}required></input>
            <button class="btn">Register</button>
        </form>
        </>
    )
}