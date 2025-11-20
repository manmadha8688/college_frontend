import React, { useState } from 'react';

const facilities = [
  {
    id: 1,
    title: 'Computer Labs',
    description: 'State-of-the-art computer labs equipped with high-end systems, high-speed internet, and latest software for practical learning.',
    features: [
      '24/7 access for students',
      'Latest hardware and software',
      'High-speed internet connectivity',
      'Air-conditioned environment',
      'Dedicated servers for projects'
    ],
    image: '/facilities/computer-lab.jpg',
    gallery: [
      '/facilities/computer-lab-1.jpg',
      '/facilities/computer-lab-2.jpg',
      '/facilities/computer-lab-3.jpg'
    ]
  },
  {
    id: 2,
    title: 'Library',
    description: 'A well-stocked library with a vast collection of books, journals, e-resources, and digital library facilities.',
    features: [
      '50,000+ books and references',
      'Digital library with e-books and e-journals',
      'Reading rooms and discussion areas',
      'Online public access catalog (OPAC)',
      'Inter-library loan facility'
    ],
    image: '/facilities/library.jpg',
    gallery: [
      '/facilities/library-1.jpg',
      '/facilities/library-2.jpg',
      '/facilities/library-3.jpg'
    ]
  },
  {
    id: 3,
    title: 'Auditorium',
    description: 'A spacious auditorium with modern audio-visual facilities for seminars, conferences, and cultural events.',
    features: [
      'Seating capacity of 500+',
      'Advanced sound and lighting systems',
      'Projection and video conferencing',
      'Central air conditioning',
      'Green rooms and backstage facilities'
    ],
    image: '/facilities/auditorium.jpg',
    gallery: [
      '/facilities/auditorium-1.jpg',
      '/facilities/auditorium-2.jpg',
      '/facilities/auditorium-3.jpg'
    ]
  },
  {
    id: 4,
    title: 'Sports Complex',
    description: 'Comprehensive sports facilities to promote physical fitness and encourage sportsmanship among students.',
    features: [
      'Indoor and outdoor sports facilities',
      'Basketball, volleyball, and badminton courts',
      'Cricket and football grounds',
      'Table tennis and carrom rooms',
      'Gymnasium with modern equipment'
    ],
    image: '/facilities/sports.jpg',
    gallery: [
      '/facilities/sports-1.jpg',
      '/facilities/sports-2.jpg',
      '/facilities/sports-3.jpg'
    ]
  },
  {
    id: 5,
    title: 'Hostel',
    description: 'Safe and comfortable hostel facilities for both boys and girls with all necessary amenities.',
    features: [
      'Separate hostels for boys and girls',
      'Spacious and well-ventilated rooms',
      '24/7 security and CCTV surveillance',
      'Wi-Fi enabled campus',
      'Dining hall with nutritious food'
    ],
    image: '/facilities/hostel.jpg',
    gallery: [
      '/facilities/hostel-1.jpg',
      '/facilities/hostel-2.jpg',
      '/facilities/hostel-3.jpg'
    ]
  },
  {
    id: 6,
    title: 'Research Labs',
    description: 'Specialized research laboratories equipped with advanced equipment for research and development activities.',
    features: [
      'AI and Machine Learning Lab',
      'IoT and Embedded Systems Lab',
      'Robotics and Automation Lab',
      'Biotechnology Research Center',
      'Renewable Energy Lab'
    ],
    image: '/facilities/research-lab.jpg',
    gallery: [
      '/facilities/research-lab-1.jpg',
      '/facilities/research-lab-2.jpg',
      '/facilities/research-lab-3.jpg'
    ]
  }
];

const Facilities = () => {
  const [activeFacility, setActiveFacility] = useState(facilities[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleFacilityClick = (facility) => {
    setActiveFacility(facility);
    setActiveImage(0);
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === activeFacility.gallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? activeFacility.gallery.length - 1 : prev - 1));
  };

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <div className="facilities-page">
      <div className="facilities-hero">
        <div className="container">
          <h1>Our Facilities</h1>
          <p>World-class infrastructure to support academic excellence and holistic development</p>
        </div>
      </div>

      <div className="facilities-container">
        <div className="facilities-sidebar">
          <h3>Facilities</h3>
          <ul className="facilities-list">
            {facilities.map((facility) => (
              <li 
                key={facility.id}
                className={activeFacility.id === facility.id ? 'active' : ''}
                onClick={() => handleFacilityClick(facility)}
              >
                {facility.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="facility-details">
          <h2>{activeFacility.title}</h2>
          
          <div className="facility-content">
            <div className="facility-image-gallery">
              <div className="main-image" onClick={openGallery}>
                <img 
                  src={activeFacility.gallery[activeImage]} 
                  alt={activeFacility.title} 
                />
                <div className="image-overlay">
                  <i className="fas fa-expand"></i> Click to view gallery
                </div>
              </div>
              
              <div className="thumbnail-container">
                {activeFacility.gallery.map((img, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`${activeFacility.title} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="facility-info">
              <p className="description">{activeFacility.description}</p>
              
              <div className="features">
                <h4>Key Features:</h4>
                <ul>
                  {activeFacility.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="facility-actions">
                <button className="btn btn-primary">
                  <i className="fas fa-calendar-alt"></i> Book Facility
                </button>
                <button className="btn btn-outline">
                  <i className="fas fa-info-circle"></i> More Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isGalleryOpen && (
        <div className="gallery-modal">
          <div className="gallery-header">
            <h3>{activeFacility.title} - Gallery</h3>
            <button className="close-btn" onClick={closeGallery}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="gallery-content">
            <button className="nav-btn prev" onClick={prevImage}>
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="gallery-main-image">
              <img 
                src={activeFacility.gallery[activeImage]} 
                alt={`${activeFacility.title} ${activeImage + 1}`} 
              />
            </div>
            
            <button className="nav-btn next" onClick={nextImage}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="gallery-thumbnails">
            {activeFacility.gallery.map((img, index) => (
              <div 
                key={index}
                className={`gallery-thumbnail ${activeImage === index ? 'active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={img} alt={`${activeFacility.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="virtual-tour">
        <div className="container">
          <h2>Virtual Campus Tour</h2>
          <p>Take a virtual tour of our campus and explore our world-class facilities from the comfort of your home.</p>
          <button className="btn btn-primary">
            <i className="fas fa-vr-cardboard"></i> Start Virtual Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
