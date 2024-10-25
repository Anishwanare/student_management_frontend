import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentProfile = () => {
    const [studentProfile, setStudentProfile] = useState(null);
    const [marks, setMarks] = useState('');
    const [currentMarks, setCurrentMarks] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URl}/api/v1/student/profile/${id}`, { withCredentials: true });
                setStudentProfile(response.data);

                const marksResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URl}/api/v2/marks/marks/student/${id}`);
                const marksData = marksResponse.data[0].marks;
                setCurrentMarks(marksData);
                // console.log(marksData);

                swal({
                    title: "Student details fetched",
                    icon: "info",
                    button: "Close"
                });
            } catch (error) {
                console.error("Error fetching student profile:", error);
            }
        };

        fetchStudentProfile();
    }, [id]);

    // Function to handle marks submission
    const handlePostMarks = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URl}/api/v2/marks/create`, { studentId: id, marks });
            swal("Success", "Marks updated successfully", "success");
            setMarks('');
            setCurrentMarks(marks);
        } catch (error) {
            swal("Error", "Could not update marks", error);
        }
    };


    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Student Profile</h1>
            <Link to={"/"}>Go Back</Link>
            {studentProfile ? (
                <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
                    <div className="card-body">
                        <h2 className="card-title text-primary">{studentProfile.name}</h2>
                        <p className="card-text"><strong>Age:</strong> {studentProfile.age}</p>
                        <p className="card-text"><strong>Email:</strong> {studentProfile.email}</p>
                        <p className="card-text"><strong>Parent Id:</strong> {studentProfile.parentId}</p>
                        <p className="card-text"><strong>Current Marks:</strong> {currentMarks}</p>

                        {currentMarks >= 1 ? (
                            <p>Happy learning</p>
                        ) : (
                            <form onSubmit={handlePostMarks} className="mt-4">
                                <input
                                    type="number"
                                    className="form-control mb-3"
                                    placeholder="Update Marks"
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-success">
                                    Update Marks
                                </button>
                            </form>
                        )}

                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="spinner-border text-primary" role="status"></p>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </div>
    );
};

export default StudentProfile;
