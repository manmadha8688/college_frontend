import React from 'react';

const PrincipalsMessage = () => {
  return (
    <div className="principals-message">
      <div className="message-header">
        <div className="principal-image">
          <img src="/images/principal.jpg" alt="Principal" />
        </div>
        <div className="principal-info">
          <h2>Principal's Message</h2>
          <h3>Dr. Rajesh Kumar</h3>
          <p className="designation">Principal, TechNova Institute of Technology</p>
          <p className="qualification">Ph.D. (IIT Delhi), M.Tech (IIT Bombay), B.E. (Hons)</p>
          <p className="experience">25+ Years of Academic Excellence</p>
        </div>
      </div>
      
      <div className="message-content">
        <p className="greeting">Dear Students, Parents, and Well-wishers,</p>
        
        <p>
          It gives me immense pleasure to welcome you to TechNova Institute of Technology, where we are committed 
          to nurturing the next generation of engineers, innovators, and leaders. As we navigate through the 
          rapidly evolving technological landscape, our mission remains steadfast: to provide a transformative 
          educational experience that combines academic rigor with practical exposure.
        </p>
        
        <p>
          At TechNova, we believe that education is not just about acquiring knowledge but about developing 
          the ability to think critically, solve complex problems, and innovate. Our curriculum is designed 
          to provide a strong foundation in engineering principles while encouraging interdisciplinary learning 
          and research. We take pride in our faculty members who are not only accomplished academicians but 
          also industry practitioners, bringing real-world insights into the classroom.
        </p>
        
        <h4>Academic Excellence</h4>
        <p>
          Our academic programs are regularly updated to keep pace with industry trends and technological 
          advancements. We emphasize hands-on learning through well-equipped laboratories, industry projects, 
          and internships. Our students have consistently excelled in national and international competitions, 
          a testament to the quality of education we provide.
        </p>
        
        <h4>Research and Innovation</h4>
        <p>
          We encourage a culture of research and innovation among both faculty and students. Our research 
          centers focus on cutting-edge technologies such as Artificial Intelligence, Internet of Things, 
          Renewable Energy, and more. Students are actively involved in research projects, often leading to 
          publications in reputed journals and conferences.
        </p>
        
        <h4>Industry Connect</h4>
        <p>
          Our strong industry partnerships ensure that our students gain practical exposure through internships, 
          live projects, and expert lectures. We regularly organize industry visits, technical symposiums, and 
          workshops to bridge the gap between academia and industry.
        </p>
        
        <h4>Holistic Development</h4>
        <p>
          Beyond academics, we focus on the overall development of our students. Our campus life is vibrant 
          with various clubs, cultural events, sports activities, and social initiatives. We believe in 
          nurturing not just skilled professionals but also responsible citizens who can contribute 
          positively to society.
        </p>
        
        <p>
          As you explore our website, I invite you to discover the numerous opportunities that await you 
          at TechNova. Whether you are a prospective student, parent, industry partner, or well-wisher, 
          we welcome you to be a part of our journey towards excellence in technical education.
        </p>
        
        <p className="closing">
          Warm regards,<br />
          <strong>Dr. Rajesh Kumar</strong><br />
          Principal
        </p>
      </div>
      
      <div className="quick-links">
        <h3>Quick Links</h3>
        <div className="links-grid">
          <a href="/academics" className="link-card">
            <span>📚</span>
            <span>Academic Programs</span>
          </a>
          <a href="/admissions" className="link-card">
            <span>🎓</span>
            <span>Admission Process</span>
          </a>
          <a href="/research" className="link-card">
            <span>🔬</span>
            <span>Research Centers</span>
          </a>
          <a href="/campus-life" className="link-card">
            <span>🏛️</span>
            <span>Campus Life</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrincipalsMessage;
