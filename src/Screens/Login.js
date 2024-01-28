import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import dotenv from 'dotenv';

// dotenv.config();

export default function Login() {

    const navigate = useNavigate();

    const [Credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(JSON.stringify({ email: Credentials.email, password: Credentials.password }))
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: Credentials.email,
                password: Credentials.password,
            })
        });
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials")
        }

        if (json.success) {
            localStorage.setItem("userEmail", Credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"))
            navigate("/");
        }
    }

    const onchange = (event) => {
        setCredentials({ ...Credentials, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name='email'
                            value={Credentials.email}
                            onChange={onchange}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name='password'
                            value={Credentials.password}
                            onChange={onchange}
                        />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/createUser" className='m-3 btn btn-danger'>I am new User</Link>
                </form>
            </div>
        </div>
    )
}
