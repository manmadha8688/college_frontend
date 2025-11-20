import React, { useState } from 'react';

const Fees = () => {
  const [activeTab, setActiveTab] = useState('btech');

  const feeStructure = {
    btech: [
      {
        year: '1st Year',
        tuitionFee: '1,25,000',
        developmentFee: '25,000',
        examFee: '5,000',
        otherCharges: '10,000',
        total: '1,65,000'
      },
      {
        year: '2nd Year',
        tuitionFee: '1,25,000',
        developmentFee: '20,000',
        examFee: '5,000',
        otherCharges: '8,000',
        total: '1,58,000'
      },
      {
        year: '3rd Year',
        tuitionFee: '1,25,000',
        developmentFee: '20,000',
        examFee: '5,000',
        otherCharges: '8,000',
        total: '1,58,000'
      },
      {
        year: '4th Year',
        tuitionFee: '1,25,000',
        developmentFee: '20,000',
        examFee: '5,000',
        otherCharges: '8,000',
        total: '1,58,000'
      }
    ],
    mtech: [
      {
        year: '1st Year',
        tuitionFee: '1,00,000',
        developmentFee: '20,000',
        examFee: '5,000',
        otherCharges: '10,000',
        total: '1,35,000'
      },
      {
        year: '2nd Year',
        tuitionFee: '1,00,000',
        developmentFee: '15,000',
        examFee: '5,000',
        otherCharges: '8,000',
        total: '1,28,000'
      }
    ],
    mba: [
      {
        year: '1st Year',
        tuitionFee: '1,50,000',
        developmentFee: '30,000',
        examFee: '5,000',
        otherCharges: '15,000',
        total: '2,00,000'
      },
      {
        year: '2nd Year',
        tuitionFee: '1,50,000',
        developmentFee: '25,000',
        examFee: '5,000',
        otherCharges: '10,000',
        total: '1,90,000'
      }
    ],
    bba: [
      {
        year: '1st Year',
        tuitionFee: '75,000',
        developmentFee: '15,000',
        examFee: '3,000',
        otherCharges: '7,000',
        total: '1,00,000'
      },
      {
        year: '2nd Year',
        tuitionFee: '75,000',
        developmentFee: '12,000',
        examFee: '3,000',
        otherCharges: '5,000',
        total: '95,000'
      },
      {
        year: '3rd Year',
        tuitionFee: '75,000',
        developmentFee: '12,000',
        examFee: '3,000',
        otherCharges: '5,000',
        total: '95,000'
      }
    ]
  };

  const programs = [
    { id: 'btech', name: 'B.Tech Programs' },
    { id: 'mtech', name: 'M.Tech Programs' },
    { id: 'mba', name: 'MBA' },
    { id: 'bba', name: 'BBA' }
  ];

  const paymentOptions = [
    'Demand Draft in favor of "TechNova Institute of Technology" payable at [City]',
    'Online Payment through Net Banking/Credit Card/Debit Card',
    'UPI Payment (Google Pay, PhonePe, etc.)',
    'EMI Options available through selected banks'
  ];

  const scholarships = [
    {
      name: 'Merit Scholarship',
      criteria: 'Based on 12th/UG percentage',
      amount: 'Up to 50% tuition fee waiver'
    },
    {
      name: 'Sports Scholarship',
      criteria: 'State/National level sports achievements',
      amount: 'Up to 25% tuition fee waiver'
    },
    {
      name: 'Defense Quota',
      criteria: 'Children of defense personnel',
      amount: '15% tuition fee waiver'
    },
    {
      name: 'Sibling Scholarship',
      criteria: 'Siblings studying in the institute',
      amount: '10% tuition fee waiver'
    }
  ];

  return (
    <div className="fees-page">
      <h2>Fee Structure</h2>
      <p className="fees-intro">
        TechNova offers quality education at an affordable cost. Below is the detailed fee structure for various programs.
      </p>

      <div className="program-tabs">
        {programs.map(program => (
          <button
            key={program.id}
            className={`tab-btn ${activeTab === program.id ? 'active' : ''}`}
            onClick={() => setActiveTab(program.id)}
          >
            {program.name}
          </button>
        ))}
      </div>

      <div className="fee-table-container">
        <table className="fee-table">
          <thead>
            <tr>
              <th>Year/Semester</th>
              <th>Tuition Fee (₹)</th>
              <th>Development Fee (₹)</th>
              <th>Exam Fee (₹)</th>
              <th>Other Charges* (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {feeStructure[activeTab].map((year, index) => (
              <tr key={index}>
                <td>{year.year}</td>
                <td>{year.tuitionFee}</td>
                <td>{year.developmentFee}</td>
                <td>{year.examFee}</td>
                <td>{year.otherCharges}</td>
                <td className="total-fee">{year.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <p className="fee-note">
          *Other charges include library fee, laboratory fee, student activity fee, and insurance.
          **Hostel and mess charges are additional and vary based on accommodation type.
        </p>
      </div>

      <div className="additional-info">
        <div className="payment-options">
          <h3>Payment Options</h3>
          <ul>
            {paymentOptions.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>

        <div className="scholarships">
          <h3>Scholarships & Financial Aid</h3>
          <div className="scholarship-grid">
            {scholarships.map((scholarship, index) => (
              <div key={index} className="scholarship-card">
                <h4>{scholarship.name}</h4>
                <p><strong>Criteria:</strong> {scholarship.criteria}</p>
                <p><strong>Benefit:</strong> {scholarship.amount}</p>
              </div>
            ))}
          </div>
          <p className="scholarship-note">
            *Scholarships are subject to terms and conditions. Multiple scholarships cannot be clubbed.
            Contact the admission office for detailed information.
          </p>
        </div>
      </div>

      <div className="important-notes">
        <h3>Important Notes:</h3>
        <ul>
          <li>Fees are subject to revision as per university/institute norms.</li>
          <li>One-time admission fee of ₹10,000 is applicable at the time of admission.</li>
          <li>Caution money of ₹5,000 (refundable) to be paid along with first semester fee.</li>
          <li>Fees can be paid semester-wise or annually.</li>
          <li>Late fee of ₹500 per week will be charged after the due date.</li>
        </ul>
      </div>

      <div className="contact-finance">
        <h3>Finance Office Contact</h3>
        <p>For any fee-related queries, please contact:</p>
        <p>Email: finance@technova.edu | Phone: +91 98765 43211</p>
        <p>Working Hours: Monday to Friday, 10:00 AM to 4:00 PM</p>
      </div>
    </div>
  );
};

export default Fees;
