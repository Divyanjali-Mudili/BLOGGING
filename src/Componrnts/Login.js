export default function Login() {
  return (
    <div className='flex justify-center my-28 container'>
      <form className='Login md:w-[60%] my-20'>
        <h3>Welcome Back</h3>
        <p>Enter your details below</p>
        <input type='text' placeholder='Your Fullname' required></input>
        <input type='email' placeholder='Enter Your Email' required></input>
        <input
          type='password'
          placeholder='Enter Your Password'
          required
        ></input>
        <button className='btn'>Login</button>
        <p className='redirect-text'>
          Don't have an account? <a href='/register'>Sign Up</a>
        </p>
      </form>
    </div>
  );
}
