import React from 'react';

const departments = [
  {
    id: 1,
    name: 'Computer Science & Engineering',
    code: 'CSE',
    description: 'The Department of Computer Science & Engineering offers cutting-edge programs in software development, artificial intelligence, and data science.',
    head: 'Dr. Sarah Johnson',
    programs: ['B.Tech', 'M.Tech', 'Ph.D']
  },
  {
    id: 2,
    name: 'Electronics & Communication Engineering',
    code: 'ECE',
    description: 'The ECE department focuses on electronics, communication systems, and embedded technologies with state-of-the-art laboratories.',
    head: 'Dr. Michael Chen',
    programs: ['B.Tech', 'M.Tech', 'Ph.D']
  },
  {
    id: 3,
    name: 'Mechanical Engineering',
    code: 'ME',
    description: 'Our Mechanical Engineering program emphasizes innovation in design, manufacturing, and thermal sciences.',
    head: 'Dr. Robert Williams',
    programs: ['B.Tech', 'M.Tech']
  },
  {
    id: 4,
    name: 'Civil Engineering',
    code: 'CE',
    description: 'The Civil Engineering department offers comprehensive programs in structural engineering, transportation, and environmental engineering.',
    head: 'Dr. Emily Davis',
    programs: ['B.Tech', 'M.Tech', 'Ph.D']
  },
  {
    id: 5,
    name: 'Electrical Engineering',
    code: 'EE',
    description: 'Focused on power systems, control systems, and renewable energy technologies.',
    head: 'Dr. James Wilson',
    programs: ['B.Tech', 'M.Tech']
  }
];

const Departments = () => {
  return (
    <div className="departments">
      <h2>Our Departments</h2>
      <p className="intro-text">
        Explore our diverse range of engineering departments, each offering specialized programs designed to meet the demands of the modern technological landscape.
      </p>
      
      <div className="departments-grid">
        {departments.map((dept) => (
          <div key={dept.id} className="department-card">
            <div className="department-header">
              <h3>{dept.name} <span className="dept-code">({dept.code})</span></h3>
            </div>
            <div className="department-body">
              <p>{dept.description}</p>
              <div className="department-meta">
                <div className="meta-item">
                  <strong>Head:</strong> {dept.head}
                </div>
                <div className="meta-item">
                  <strong>Programs:</strong> {dept.programs.join(', ')}
                </div>
              </div>
              <button className="btn btn-outline">Learn More</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="additional-info">
        <h3>Research & Innovation</h3>
        <p>
          Our departments are actively involved in cutting-edge research with collaborations from leading industries and research organizations.
          Students have opportunities to participate in research projects and publish their work in reputed journals.
        </p>
      </div>
    </div>
  );
};

export default Departments;
