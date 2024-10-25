import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { FaRegUserCircle } from "react-icons/fa";

const StudentData = () => {
    const [studentData, setStudentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deleting, setDeleting] = useState(false)
    const limit = 2;


    const fetchStudents = async (page) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URl}/api/v1/student/getAll?page=${page}&limit=${limit}`, { withCredentials: true });
            setStudentData(response.data?.students);
            setTotalPages(response.data?.totalPages);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        swal({
            title: "Are you sure?",
            text: "If you delete this member, this action cannot be undone.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    setDeleting(true)
                    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URl}/api/v1/student/delete/${id}`, { withCredentials: true });
                    setStudentData((prevData) => prevData.filter(student => student.id !== id));
                    swal("Student deleted :)", { icon: "success" });
                    console.log("deleted successfully :)", studentData);
                } catch (error) {
                    console.error(error.response.data.message);
                    swal("Error!", error.response.data.message, "error");
                }
            } else {
                swal("You are safe :) .");
            }
        });
    };

    useEffect(() => {
        fetchStudents(currentPage);
    }, [currentPage]);

    return (
        <div className="container my-5">
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h1 className="text-center">Student Data</h1>
                <p className='absolute'>{deleting ? "Deleting" : null}</p>
                <Link to="/register">
                    <button type="button" className="btn btn-primary">Add New Member</button>
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Age</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-danger">No Student Data Found</td>
                            </tr>
                        ) : (
                            studentData.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <button className="btn btn-danger me-2" onClick={() => handleDelete(student.id)}>
                                                <FaTrash /> Delete
                                            </button>
                                            <Link to={`/update/student/${student.id}`}>
                                                <button className="btn btn-warning me-2">
                                                    <FaEdit /> Update
                                                </button>
                                            </Link>
                                            <Link to={`/student/profile/${student.id}`}>
                                                <button className="btn btn-info">
                                                    <FaRegUserCircle /> Explore
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between align-items-center my-3">
                <div>
                    <span>Page {currentPage} of {totalPages} | Showing {studentData.length} entities</span>
                </div>
                <div>
                    <button
                        className="btn btn-secondary me-2"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                    >
                        First
                    </button>
                    <button
                        className="btn btn-secondary me-2"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-secondary me-2"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                    <button
                        className="btn btn-secondary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentData;
