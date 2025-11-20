import React from 'react';

const Eligibility = () => {
  const programs = [
    {
      name: 'B.Tech (Computer Science & Engineering)',
      duration: '4 Years',
      criteria: [
        'Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with one of the Chemistry/Biotechnology/Biology/Technical Vocational subject',
        'Obtained at least 45% marks (40% in case of candidates belonging to reserved category) in the above subjects taken together',
        'Valid score in JEE Main/State Entrance Examination/Institute Test'
      ]
    },
    {
      name: 'B.Tech (Electronics & Communication)',
      duration: '4 Years',
      criteria: [
        'Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with one of the Chemistry/Biotechnology/Biology/Technical Vocational subject',
        'Obtained at least 45% marks (40% in case of candidates belonging to reserved category) in the above subjects taken together',
        'Valid score in JEE Main/State Entrance Examination/Institute Test'
      ]
    },
    {
      name: 'M.Tech (Computer Science & Engineering)',
      duration: '2 Years',
      criteria: [
        'B.E./B.Tech. or equivalent in relevant discipline with minimum 60% marks (55% for SC/ST candidates)',
        'Valid GATE score or performance in the entrance test conducted by the institute',
        'Candidates with relevant industry experience will be given preference'
      ]
    },
    {
      name: 'BBA',
      duration: '3 Years',
      criteria: [
        'Passed 10+2 examination in any stream from a recognized board',
        'Minimum 50% marks in aggregate (45% for SC/ST candidates)',
        'Performance in Personal Interview'
      ]
    },
    {
      name: 'MBA',
      duration: '2 Years',
      criteria: [
        'Bachelor\'s degree in any discipline with minimum 50% marks (45% for SC/ST candidates)',
        'Valid score in CAT/MAT/XAT/CMAT/Institute Test',
        'Group Discussion and Personal Interview performance',
        'Work experience (if any) will be an added advantage'
      ]
    },
    {
      name: 'Diploma Programs',
      duration: '3 Years',
      criteria: [
        'Passed 10th standard or equivalent with minimum 45% marks (40% for SC/ST candidates)',
        'Mathematics and Science as compulsory subjects',
        'Performance in the entrance test conducted by the institute'
      ]
    }
  ];

  const generalRequirements = [
    'Original documents (10th, 12th, and degree mark sheets, transfer certificate, migration certificate, etc.) must be presented at the time of admission',
    'Candidates appearing for the final examination of the qualifying examination may also apply',
    'Reservation policy as per Government of India norms will be followed',
    'Age limit: As per university/institute norms'
  ];

  return (
    <div className="eligibility-page">
      <h2>Eligibility Criteria</h2>
      <p className="eligibility-intro">
        Below are the eligibility criteria for various programs offered at TechNova Institute of Technology. 
        Please ensure you meet the requirements before applying.
      </p>
      
      <div className="programs-grid">
        {programs.map((program, index) => (
          <div key={index} className="program-card">
            <h3>{program.name}</h3>
            <div className="program-duration">Duration: {program.duration}</div>
            <div className="eligibility-criteria">
              <h4>Eligibility:</h4>
              <ul>
                {program.criteria.map((criterion, i) => (
                  <li key={i}>{criterion}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="general-requirements">
        <h3>General Requirements</h3>
        <ul>
          {generalRequirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>
      
      <div className="note">
        <p>
          <strong>Note:</strong> The eligibility criteria are subject to change as per university/institute norms. 
          For any clarification regarding eligibility, please contact the admission office.
        </p>
      </div>
      
      <div className="contact-admission">
        <h3>Need Help?</h3>
        <p>Contact our admission counselors for personalized guidance on eligibility and admission process.</p>
        <div className="contact-info">
          <p>Email: admissions@technova.edu</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
