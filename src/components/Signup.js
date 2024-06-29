import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({name: '', email: '', password:'', cpassword: ''});
  let navigate = useNavigate();

  const handleChange = (e) => {
      setUser({...user, [e.target.name]: e.target.value});
  }

  const submitForm = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: user.name, email: user.email, password: user.password}), 
        });

        let responseData = await response.json();
        localStorage.setItem("authToken", responseData.authToken);
        navigate("/");

  }
  return (
    <div className='container my-3'>
      <div className='container my-3'>
        <h2 className='my-3'>Sign Up</h2>
        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" id="name" minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" id="email" required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" id="password" minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" name="cpassword" value={user.cpassword} onChange={handleChange} className="form-control" id="cpassword" required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}
