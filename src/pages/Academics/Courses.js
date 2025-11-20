import React from 'react';

const courses = {
  undergraduate: [
    {
      id: 1,
      name: 'B.Tech in Computer Science & Engineering',
      duration: '4 Years',
      intake: 120,
      eligibility: '10+2 with Physics, Chemistry, and Mathematics',
      highlights: [
        'Specializations in AI, Data Science, and Cybersecurity',
        'Industry-aligned curriculum',
        'Industry projects and internships',
        'Placement assistance'
      ]
    },
    {
      id: 2,
      name: 'B.Tech in Electronics & Communication Engineering',
      duration: '4 Years',
      intake: 90,
      eligibility: '10+2 with Physics, Chemistry, and Mathematics',
      highlights: [
        'Focus on VLSI and Embedded Systems',
        'Modern labs with latest equipment',
        'Industry collaborations',
        'Research opportunities'
      ]
    },
    {
      id: 3,
      name: 'B.Tech in Mechanical Engineering',
      duration: '4 Years',
      intake: 90,
      eligibility: '10+2 with Physics, Chemistry, and Mathematics',
      highlights: [
        'Specializations in Automotive and Robotics',
        'CAD/CAM facilities',
        'Industry 4.0 technologies',
        'Internship opportunities'
      ]
    }
  ],
  postgraduate: [
    {
      id: 1,
      name: 'M.Tech in Computer Science & Engineering',
      duration: '2 Years',
      intake: 30,
      eligibility: 'B.Tech/B.E. in CSE/IT or equivalent with minimum 60% marks',
      highlights: [
        'Specialization in AI & Machine Learning',
        'Research-focused curriculum',
        'Industry projects',
        'Thesis work with industry mentors'
      ]
    },
    {
      id: 2,
      name: 'M.Tech in VLSI Design',
      duration: '2 Years',
      intake: 24,
      eligibility: 'B.Tech/B.E. in ECE/EEE or equivalent with minimum 60% marks',
      highlights: [
        'Advanced VLSI design techniques',
        'Industry-standard EDA tools',
        'ASIC and FPGA design',
        'Placement support in semiconductor companies'
      ]
    }
  ],
  diploma: [
    {
      id: 1,
      name: 'Diploma in Computer Engineering',
      duration: '3 Years',
      intake: 60,
      eligibility: '10th with Mathematics and Science',
      highlights: [
        'Practical-oriented curriculum',
        'Industry visits and workshops',
        'Project-based learning',
        'Lateral entry to B.Tech program'
      ]
    },
    {
      id: 2,
      name: 'Diploma in Mechanical Engineering',
      duration: '3 Years',
      intake: 60,
      eligibility: '10th with Mathematics and Science',
      highlights: [
        'Hands-on training',
        'CNC and automation training',
        'Industry-relevant skills',
        'Apprenticeship opportunities'
      ]
    }
  ]
};

const Courses = () => {
  return (
    <div className="courses-page">
      <h2>Courses Offered</h2>
      <p className="intro-text">
        We offer a wide range of undergraduate, postgraduate, and diploma programs designed to provide students with the knowledge and skills needed for successful careers in engineering and technology.
      </p>

      <div className="course-category">
        <h3>Undergraduate Programs (B.Tech)</h3>
        <div className="courses-grid">
          {courses.undergraduate.map((course) => (
            <div key={course.id} className="course-card">
              <h4>{course.name}</h4>
              <div className="course-details">
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Intake:</strong> {course.intake} students</p>
                <p><strong>Eligibility:</strong> {course.eligibility}</p>
                <div className="highlights">
                  <strong>Highlights:</strong>
                  <ul>
                    {course.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button className="btn btn-outline">View Details</button>
              <button className="btn btn-primary">Apply Now</button>
            </div>
          ))}
        </div>
      </div>

      <div className="course-category">
        <h3>Postgraduate Programs (M.Tech)</h3>
        <div className="courses-grid">
          {courses.postgraduate.map((course) => (
            <div key={course.id} className="course-card">
              <h4>{course.name}</h4>
              <div className="course-details">
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Intake:</strong> {course.intake} students</p>
                <p><strong>Eligibility:</strong> {course.eligibility}</p>
                <div className="highlights">
                  <strong>Highlights:</strong>
                  <ul>
                    {course.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button className="btn btn-outline">View Details</button>
              <button className="btn btn-primary">Apply Now</button>
            </div>
          ))}
        </div>
      </div>

      <div className="course-category">
        <h3>Diploma Programs</h3>
        <div className="courses-grid">
          {courses.diploma.map((course) => (
            <div key={course.id} className="course-card">
              <h4>{course.name}</h4>
              <div className="course-details">
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Intake:</strong> {course.intake} students</p>
                <p><strong>Eligibility:</strong> {course.eligibility}</p>
                <div className="highlights">
                  <strong>Highlights:</strong>
                  <ul>
                    {course.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button className="btn btn-outline">View Details</button>
              <button className="btn btn-primary">Apply Now</button>
            </div>
          ))}
        </div>
      </div>

      <div className="additional-info">
        <h3>Admission Process</h3>
        <p>
          Admissions are based on merit and entrance examination scores. For detailed information about the admission process, 
          eligibility criteria, and important dates, please visit our <a href="/admissions">Admissions</a> page.
        </p>
        <p>
          For any queries regarding courses or admissions, please contact our admission cell at 
          <a href="mailto:admissions@codepirates.edu">admissions@codepirates.edu</a> or call +91-XXXXXXXXXX.
        </p>
      </div>
    </div>
  );
};

export default Courses;
