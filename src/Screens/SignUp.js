import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function SignUp() {

    const [Credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`https://backend-gofood.onrender.com/api/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: Credentials.name,
                email: Credentials.email,
                password: Credentials.password,
                location: Credentials.geolocation
            })
        });
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials")
        }
    }

    const onchange = (event) => {
        setCredentials({ ...Credentials, [event.target.name]: event.target.value });
    }


    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name='name'
                            value={Credentials.name}
                            onChange={onchange}
                        />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="exampleInputlocation" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword"
                            name='geolocation'
                            value={Credentials.geolocation}
                            onChange={onchange}
                        />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a User?</Link>
                </form>
            </div>
        </>
    )
}
