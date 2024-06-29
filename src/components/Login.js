import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [credentials, setCredentials] = useState({email: '', password:''});
    let navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}), 
          });

          let responseData = await response.json();
          localStorage.setItem("authToken", responseData);
          navigate("/");
    }

    return (
        <div className='container my-3'>
            <h2 className='my-3'>Login</h2>
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" value={credentials.email} onChange={handleChange} className="form-control" id="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password"value={credentials.password} onChange={handleChange} className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
