import React from 'react';

const departments = [
  {
    id: 1,
    name: 'Computer Science & Engineering',
    faculty: [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        designation: 'Professor & HOD',
        qualification: 'Ph.D in Computer Science, Stanford University',
        experience: '18 years',
        specialization: 'Artificial Intelligence, Machine Learning',
        email: 'sarah.johnson@codepirates.edu',
        image: '/faculty/sarah-johnson.jpg'
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        designation: 'Associate Professor',
        qualification: 'Ph.D in Computer Engineering, MIT',
        experience: '12 years',
        specialization: 'Data Science, Big Data Analytics',
        email: 'michael.chen@codepirates.edu',
        image: '/faculty/michael-chen.jpg'
      },
      {
        id: 3,
        name: 'Dr. Priya Sharma',
        designation: 'Assistant Professor',
        qualification: 'Ph.D in Information Technology, IIT Delhi',
        experience: '8 years',
        specialization: 'Cybersecurity, Network Security',
        email: 'priya.sharma@codepirates.edu',
        image: '/faculty/priya-sharma.jpg'
      }
    ]
  },
  {
    id: 2,
    name: 'Electronics & Communication Engineering',
    faculty: [
      {
        id: 1,
        name: 'Dr. Robert Wilson',
        designation: 'Professor & HOD',
        qualification: 'Ph.D in Electronics Engineering, University of Cambridge',
        experience: '20 years',
        specialization: 'VLSI Design, Embedded Systems',
        email: 'robert.wilson@codepirates.edu',
        image: '/faculty/robert-wilson.jpg'
      },
      {
        id: 2,
        name: 'Dr. Ananya Patel',
        designation: 'Associate Professor',
        qualification: 'Ph.D in Communication Systems, IIT Bombay',
        experience: '10 years',
        specialization: 'Wireless Communication, 5G Networks',
        email: 'ananya.patel@codepirates.edu',
        image: '/faculty/ananya-patel.jpg'
      }
    ]
  },
  {
    id: 3,
    name: 'Mechanical Engineering',
    faculty: [
      {
        id: 1,
        name: 'Dr. James Anderson',
        designation: 'Professor & HOD',
        qualification: 'Ph.D in Mechanical Engineering, NIT Surat',
        experience: '22 years',
        specialization: 'Thermal Engineering, Renewable Energy',
        email: 'james.anderson@codepirates.edu',
        image: '/faculty/james-anderson.jpg'
      },
      {
        id: 2,
        name: 'Dr. Sneha Reddy',
        designation: 'Assistant Professor',
        qualification: 'Ph.D in Robotics, IIT Madras',
        experience: '6 years',
        specialization: 'Robotics, Automation',
        email: 'sneha.reddy@codepirates.edu',
        image: '/faculty/sneha-reddy.jpg'
      }
    ]
  }
];

const Faculty = () => {
  const [activeDept, setActiveDept] = React.useState(1);
  
  const currentDepartment = departments.find(dept => dept.id === activeDept) || departments[0];

  return (
    <div className="faculty-page">
      <h2>Our Faculty</h2>
      <p className="intro-text">
        Our distinguished faculty members are experts in their respective fields, bringing a wealth of knowledge and industry experience to the classroom.
      </p>

      <div className="department-tabs">
        {departments.map((dept) => (
          <button
            key={dept.id}
            className={`tab-button ${activeDept === dept.id ? 'active' : ''}`}
            onClick={() => setActiveDept(dept.id)}
          >
            {dept.name}
          </button>
        ))}
      </div>

      <div className="faculty-grid">
        {currentDepartment.faculty.map((member) => (
          <div key={member.id} className="faculty-card">
            <div className="faculty-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="faculty-details">
              <h3>{member.name}</h3>
              <p className="designation">{member.designation}</p>
              <div className="qualification">
                <strong>Qualification:</strong> {member.qualification}
              </div>
              <div className="experience">
                <strong>Experience:</strong> {member.experience} of teaching experience
              </div>
              <div className="specialization">
                <strong>Specialization:</strong> {member.specialization}
              </div>
              <div className="contact">
                <strong>Email:</strong>{' '}
                <a href={`mailto:${member.email}`}>{member.email}</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="visiting-faculty">
        <h3>Visiting Faculty & Industry Experts</h3>
        <p>
          We regularly invite industry experts and visiting faculty from premier institutions to conduct guest lectures, 
          workshops, and provide guidance on industry trends and practices.
        </p>
      </div>

      <div className="research-scholars">
        <h3>Research Scholars</h3>
        <p>
          Our research scholars are actively involved in cutting-edge research projects in collaboration with industry 
          and government organizations. They contribute significantly to the academic and research ecosystem of the institution.
        </p>
      </div>
    </div>
  );
};

export default Faculty;
