export default function Login(){
 return(
    <>
      <form className="Login">
        <h2>Let's connect..Login</h2>
        <input type="text" placeholder="Your Fullname." required></input>
        <input type="email" placeholder="Enter Your Email" required></input>
        <button class="btn">Login</button>
      </form>
    </>
 )
}