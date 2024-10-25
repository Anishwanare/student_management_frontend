import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';

const MarksForm = () => {
    const { studentId } = useParams()
    const [subject, setSubject] = useState('');
    const [marks, setMarks] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URl}/api/v1/marks/marks/${studentId}`, { studentId, subject, marks }, { headers: { "Content-Type": "application/json" } });
            swal("Success", "Marks added :)", "success");
            // Reset form fields
            setSubject('');
            setMarks('');
        } catch (error) {
            swal("Error", "Could not add marks", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
            />
            <button type="submit">Add Marks</button>
        </form>
    );
};

export default MarksForm;
