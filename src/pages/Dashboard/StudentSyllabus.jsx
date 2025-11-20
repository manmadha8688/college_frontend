import React, { useState, useEffect } from "react";
import { FiFileText, FiChevronDown } from "react-icons/fi";
import { getDepartmentSubjects } from "../../services/api"; // your API call
import "./syllabus.css";
import { useAuth } from "../../context/AuthContext";

const SEMESTERS = ["1", "2", "3", "4", "5", "6", "7", "8"];

const StudentSyllabus = () => {
    const [subjects, setSubjects] = useState([]);
    const [semesterFilter, setSemesterFilter] = useState("");
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, isAuthenticated } = useAuth();
    // Fetch subjects from backend
    const fetchSubjects = async () => {
    if (!isAuthenticated || !user?.student_profile?.department) {
        setError('User not authenticated or department not found');
        setIsLoading(false);
        return;
    }

    try {
        setIsLoading(true);
        const response = await getDepartmentSubjects(user.student_profile.department);
        const processed = Array.isArray(response)
            ? response
            : response?.results || response?.data || [];

        const transformed = processed.map((s) => ({
            id: s.id,
            subject: s.name || s.subject,
            code: s.subject_code || s.code,
            department: s.department,
            semester: s.semester?.toString() || "",
            pdf_url: s.syllabus?.pdf_url || s.pdf_url || "",
        }));

        setSubjects(transformed);
        setError(null);
    } catch (err) {
        setError('Failed to load department subjects. Please try again later.');
    } finally {
        setIsLoading(false);
    }
};
    useEffect(() => {
        if (isAuthenticated) {
            fetchSubjects();
        }
    }, [isAuthenticated, user?.student_profile]); // Refetch if auth state or department changes

    // Rest of your component remains the same...

    // Filter subjects by semester
    useEffect(() => {
        if (!semesterFilter) {
            setFilteredSubjects(subjects);
        } else {
            setFilteredSubjects(
                subjects.filter((subj) => subj.semester === semesterFilter)
            );
        }
    }, [semesterFilter, subjects]);

    return (
        <div className="student-syllabus">
            <h2>Student Syllabus</h2>

            {/* Semester Filter */}
            <div className="filter-item" style={{ marginBottom: "1rem" }}>
                <label>Semester</label>
                <div className="select-box" style={{ position: "relative" }}>
                    <select
                        value={semesterFilter}
                        onChange={(e) => setSemesterFilter(e.target.value)}
                    >
                        <option value="">All Semesters</option>
                        {SEMESTERS.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <FiChevronDown className="select-icon" />
                </div>
            </div>

            {/* Subjects Table */}
            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>Department</th>
                            <th>Semester</th>
                            <th>PDF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubjects.length > 0 ? (
                            filteredSubjects.map((subj) => (
                                <tr key={subj.id}>
                                    <td>{subj.id}</td>
                                    <td>{subj.subject}</td>
                                    <td>{subj.code}</td>
                                    <td>{subj.department}</td>
                                    <td>{subj.semester}</td>
                                    <td>
                                        {subj.pdf_url ? (
                                            <a
                                                href={subj.pdf_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="pdf-link"
                                            >
                                                <FiFileText /> View
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">
                                    No subjects found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentSyllabus;
