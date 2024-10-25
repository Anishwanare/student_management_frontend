import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [parentId, setParentId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URl}/api/v1/student/register`, { name, email, age, parentId }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
            swal({
                title: "Success",
                text: "Student registered successfully",
                icon: "success",
                button: "Close"
            });
            console.log(response);
            navigate("/")
        } catch (error) {
            console.log(error);
            swal({
                title: "Error",
                text: error.message,
                icon: "error",
                button: "Close"
            });
        } finally {
            setName('');
            setEmail('');
            setAge('');
            setParentId('');
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Student Registration</h1>
            <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Age"
                                value={age}
                                required
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Parent ID"
                                value={parentId}
                                required
                                onChange={(e) => setParentId(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentRegister;
