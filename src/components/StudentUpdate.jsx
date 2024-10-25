import React, { useState } from 'react';
import axios from 'axios';
import swal from "sweetalert";
import { Link, useNavigate, useParams } from 'react-router-dom';

const StudentUpdate = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [parentId, setParentId] = useState('');
    const navigate = useNavigate()

    const handleUpdate = async (e) => {
        const updatedStudent = {};

        if (name) updatedStudent.name = name
        if (email) updatedStudent.email = email
        if (age) updatedStudent.age = parseInt(age)
        if (parentId) updatedStudent.parentId = parentId

        if (Object.keys(updatedStudent).length === 0) {
            swal("Error!", "At least one feild is required to update", "error")
            return

        }

        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URl}/api/v1/student/update/${id}`, { name, email, age, parentId }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
            swal("Student Updated successfully", {
                icon: "success",
            });
        } catch (error) {
            console.error(error.message);
            swal("Error!", "Failed to update student.", "error");
        } finally {
            // Optionally, redirect back to student list or reset the form
            setName("");
            setEmail("");
            setAge("");
            setParentId("");
            navigate("/")
        }
    };

    return (
        <>
            <Link to={"/"} className='mx-15'> go back</Link>
            <div className="container my-5 box-shadow p-5 shadow-sm rounded" style={{ maxWidth: "50rem", }}>
                <h2>Update Student</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Parent ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Update Student</button>
                </form>
            </div>
        </>
    );
};

export default StudentUpdate;
