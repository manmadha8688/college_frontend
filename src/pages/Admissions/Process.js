import React from 'react';
import { Link } from 'react-router-dom';

const Process = () => {
  const steps = [
    {
      title: '1. Check Eligibility',
      description: 'Review the eligibility criteria for your desired program to ensure you meet all requirements.',
      link: '/admissions/eligibility'
    },
    {
      title: '2. Fill Application',
      description: 'Complete the online application form with accurate personal and academic details.',
      link: '/admissions/apply'
    },
    {
      title: '3. Submit Documents',
      description: 'Upload all required documents including transcripts, certificates, and identification proof.',
      documents: [
        '10th & 12th Mark Sheets',
        'Transfer Certificate',
        'Migration Certificate',
        'Character Certificate',
        'Passport-sized Photographs',
        'Category Certificate (if applicable)'
      ]
    },
    {
      title: '4. Application Review',
      description: 'Our admission committee will review your application and documents.'
    },
    {
      title: '5. Entrance Exam/Interview',
      description: 'Appear for the entrance examination or interview as per the schedule.'
    },
    {
      title: '6. Admission Offer',
      description: 'Selected candidates will receive an admission offer letter via email.'
    },
    {
      title: '7. Fee Payment',
      description: 'Pay the admission fee to confirm your seat.',
      link: '/admissions/fees'
    }
  ];

  return (
    <div className="admission-process">
      <h2>Admission Process</h2>
      <p className="process-intro">
        Our streamlined admission process is designed to be simple and transparent. Follow these steps to join TechNova Institute of Technology.
      </p>
      
      <div className="process-steps">
        {steps.map((step, index) => (
          <div key={index} className="process-step">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            
            {step.documents && (
              <div className="documents-list">
                <h4>Required Documents:</h4>
                <ul>
                  {step.documents.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {step.link && (
              <Link to={step.link} className="btn btn-outline">
                {step.link.includes('eligibility') ? 'View Eligibility' : 
                 step.link.includes('fees') ? 'View Fee Structure' : 
                 'Start Application'}
              </Link>
            )}
          </div>
        ))}
      </div>
      
      <div className="important-dates">
        <h3>Important Dates</h3>
        <div className="dates-grid">
          <div className="date-item">
            <div className="date">Mar 15, 2024</div>
            <div className="event">Application Window Opens</div>
          </div>
          <div className="date-item">
            <div className="date">May 30, 2024</div>
            <div className="event">Last Date for Applications</div>
          </div>
          <div className="date-item">
            <div className="date">Jun 15, 2024</div>
            <div className="event">Entrance Examination</div>
          </div>
          <div className="date-item">
            <div className="date">Jul 1, 2024</div>
            <div className="event">Commencement of Academic Session</div>
          </div>
        </div>
      </div>
      
      <div className="process-note">
        <p>
          <strong>Note:</strong> The admission process is subject to change. Please check our website regularly for updates or contact the admission office for any queries.
        </p>
      </div>
    </div>
  );
};

export default Process;
