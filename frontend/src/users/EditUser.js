import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    let navigate = useNavigate(); //To jump to another pages

    const { id } = useParams();

    const [user, setUser] = useState({
        fullName: "",
        nickname: "",
        email: "",
        dateOfBirth: "",
        password: ""
    })

    const { fullName, nickname, email, dateOfBirth, password } = user

    const dob = new Date(user.dateOfBirth);
    let formattedDob;

    if (!isNaN(dob.getTime())) {
        formattedDob = dob.toISOString().substring(0, 10);
    } else {
        formattedDob = null;
    }

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value }); //keep on adding the user in state
    };

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/api/users/${id}`)  //find user by id
        setUser(result.data)
    }

    const onSubmit = async (e) => {
        e.preventDefault();  //prevent wierd url
        await axios.put(`http://localhost:8080/api/users/${id}`, user);
        navigate("/");  //Home
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="FullName" className="form-label">
                                Full Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your full name"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Nickname" className="form-label">
                                Nickname
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Create your nickname"
                                name="nickname"
                                value={nickname}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                Email
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your email address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="DateOfBirth" className="form-label">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="You cannot edit date of birth"
                                name="dateOfBirth"
                                value={formattedDob}
                                readOnly = {true}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Create a password"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-primary">
                            Save
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
