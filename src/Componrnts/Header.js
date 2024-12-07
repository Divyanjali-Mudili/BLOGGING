import { Link } from "react-router-dom"

export default function Header(){
    return(
    <header>
      <Link to="/" class="logo">MY BLOG..</Link>
      <nav>
          <Link to="/login">Login</Link>       { /* link ke sath to rhta h .*/ }
        <Link to="/register">Register</Link>
      </nav>
    </header>
    );
}