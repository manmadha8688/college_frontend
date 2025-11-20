import React from 'react';

const ManagementCommittee = () => {
  const committeeMembers = [
    {
      id: 1,
      name: 'Dr. Arun Mehta',
      designation: 'Chairman',
      qualification: 'Ph.D. (IIT Bombay), M.Tech (IIT Delhi)',
      image: '/images/committee/chairman.jpg',
      about: 'Visionary leader with over 30 years of experience in technical education and administration.',
    },
    {
      id: 2,
      name: 'Prof. Meena Sharma',
      designation: 'Vice-Chairperson',
      qualification: 'Ph.D. (IISc Bangalore), M.Tech (IIT Kanpur)',
      image: '/images/committee/vice-chairperson.jpg',
      about: 'Renowned academician with expertise in curriculum development and quality assurance.',
    },
    {
      id: 3,
      name: 'Mr. Rajiv Khanna',
      designation: 'Secretary',
      qualification: 'MBA (IIM Ahmedabad), B.Tech (IIT Kharagpur)',
      image: '/images/committee/secretary.jpg',
      about: 'Industry expert with extensive experience in corporate governance and strategic planning.',
    },
    {
      id: 4,
      name: 'Dr. Sunita Reddy',
      designation: 'Treasurer',
      qualification: 'Ph.D. (Finance), M.Com, CA',
      image: '/images/committee/treasurer.jpg',
      about: 'Financial expert with specialization in educational institution management.',
    },
    {
      id: 5,
      name: 'Dr. Amit Patel',
      designation: 'Academic Advisor',
      qualification: 'Ph.D. (MIT, USA), M.S. (Stanford)',
      image: '/images/committee/academic-advisor.jpg',
      about: 'International academician with expertise in curriculum development and research.',
    },
    {
      id: 6,
      name: 'Ms. Priya Singh',
      designation: 'Member',
      qualification: 'M.Tech (IIT Bombay), B.E. (Hons)',
      image: '/images/committee/member1.jpg',
      about: 'Alumnus and industry professional with strong ties to the corporate sector.',
    },
    {
      id: 7,
      name: 'Mr. Vikram Joshi',
      designation: 'Member',
      qualification: 'B.Tech, LLB, MBA',
      image: '/images/committee/member2.jpg',
      about: 'Legal expert specializing in educational policies and regulations.',
    },
    {
      id: 8,
      name: 'Dr. Anjali Deshpande',
      designation: 'Member',
      qualification: 'Ph.D. (Education), M.Ed, M.Phil',
      image: '/images/committee/member3.jpg',
      about: 'Educationist with expertise in pedagogical innovations and student development.',
    },
  ];

  return (
    <div className="management-committee">
      <h2>Management Committee</h2>
      
      <div className="committee-intro">
        <p>
          The Management Committee of TechNova Institute of Technology comprises distinguished individuals 
          from academia, industry, and administration who guide the institution towards excellence in 
          technical education and research. The committee meets regularly to review the institute's 
          progress and provide strategic direction.
        </p>
      </div>
      
      <div className="committee-grid">
        {committeeMembers.map((member) => (
          <div key={member.id} className="member-card">
            <div className="member-image">
              <img 
                src={member.image} 
                alt={member.name} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/images/committee/default-avatar.png';
                }} 
              />
            </div>
            <div className="member-details">
              <h3>{member.name}</h3>
              <div className="designation">{member.designation}</div>
              <div className="qualification">{member.qualification}</div>
              <p className="about">{member.about}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="committee-functions">
        <h3>Functions of the Management Committee</h3>
        <div className="functions-grid">
          <div className="function-card">
            <div className="function-icon">🎯</div>
            <h4>Strategic Planning</h4>
            <p>Formulating long-term goals and strategic plans for institutional development.</p>
          </div>
          
          <div className="function-card">
            <div className="function-icon">📊</div>
            <h4>Policy Making</h4>
            <p>Developing and approving academic and administrative policies.</p>
          </div>
          
          <div className="function-card">
            <div className="function-icon">💼</div>
            <h4>Resource Management</h4>
            <p>Overseeing financial and physical resource allocation and utilization.</p>
          </div>
          
          <div className="function-card">
            <div className="function-icon">🔍</div>
            <h4>Quality Assurance</h4>
            <p>Monitoring and ensuring quality in all academic and administrative activities.</p>
          </div>
        </div>
      </div>
      
      <div className="meeting-schedule">
        <h3>Committee Meetings</h3>
        <div className="schedule-details">
          <p>
            The Management Committee meets quarterly to review the institute's progress and make 
            important decisions. Emergency meetings may be convened as and when required.
          </p>
          <div className="next-meeting">
            <h4>Next Scheduled Meeting:</h4>
            <p><strong>Date:</strong> December 15, 2023</p>
            <p><strong>Time:</strong> 11:00 AM</p>
            <p><strong>Venue:</strong> Board Room, Administrative Block</p>
          </div>
        </div>
      </div>
      
      <div className="contact-committee">
        <h3>Contact the Committee</h3>
        <p>
          For any matters you wish to bring to the attention of the Management Committee, 
          please contact the Secretary at:
        </p>
        <div className="contact-details">
          <p>
            <strong>Email:</strong> <a href="mailto:committee@technova.edu.in">committee@technova.edu.in</a><br />
            <strong>Phone:</strong> +91-XXXXXXXXXX<br />
            <strong>Address:</strong> Administrative Block, TechNova Institute of Technology, 
            [College Address], [City] - [Pincode], [State], India
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManagementCommittee;
