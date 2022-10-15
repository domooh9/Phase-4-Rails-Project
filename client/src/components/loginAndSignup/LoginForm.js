import React, { useState } from "react";
import './Login_form.css';
import Error from "../Error";

function Login_form({onlogin, setShowLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //update form data
  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  //Handle log in form submit
  function handleSubmit(e) {
    e.preventDefault() 
    setIsLoading(true) 
    fetch('/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(formData),
    }).then((res) => {
      setIsLoading(false)
      if (res.ok) {
        res.json() 
        .then((user) => onlogin(user));
      } 
      else {
        res.json() 
        .then((err) => setErrors(err.errors));
      }
    });
    setFormData({
      username: "",
      password: "" 
    });
  }

  return (
    <>
    <div className="log">
    <div className="fii"><h2>Sign In</h2></div>
      <form onSubmit={handleSubmit} >
        <input className="inpt" placeholder="Username..." type='text' name="username" onChange={handleChange} value={formData.username} /> 
        <input className="inpt" placeholder="Password..." type='password' name="password" onChange={handleChange} value={formData.password} /> 
        <input className="btn" type='submit' value={isLoading ? "Logging in..." : "Login"} />
      </form>
      </div>
      {errors.map((error) => {
        return <Error key={error} error={error} />
      })}
      {/* <hr className="hr-login" />  */}
      <div className="create">
      <p >Don't have an account? <button className="account" onClick={() => setShowLogin(false)} >Create Account</button></p>
      </div>
    </>
  )
}

export default Login_form