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
            <h3><span>Sign Up</span> For Free</h3>
            <p>Let's sign up quickly to get started</p>
            <input type="text" placeholder="Enter Your Name" value={userName}
            onChange={ev => setuserName(ev.target.value)}required></input>
            <input type="email" placeholder="Enter Your Email" value={userEmail} onChange={ev => setuserEmail(ev.target.value)}required></input>
            <input type="password" placeholder="Enter Your Password" required></input>
            <input type="password" placeholder="Confirm Your Password" required></input>
            <button className="btn">Sign Up</button>
            <p className="redirect-text">Already have an account? <a href="/login">Login</a></p>
        </form>
        </>
    )
}