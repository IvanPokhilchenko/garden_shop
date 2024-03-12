import React from 'react';
import './Footer.css'; 

const Footer = () => {

  return ( 

   <div className="footer-container">
      <h1 className='footer-h1'>Contact</h1>

      <div className="footer-cards">

        <div className="card card-width">
          <h3 className='footer-h3'>Phone</h3>
          <p>+49 999 999 99 99</p>
        </div>

        <div className="card ">
          <h3 className='footer-h3'>Socials</h3>
          <div className='social-image'>
          <div className='social social-instagram'/> 
          <div className='social social-whatsapp'/>  
          </div>
        </div>

        <div className="card ">
          <h3 className='footer-h3'>Address</h3>
          <p>Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland</p>
        </div>

        <div className="card ">
          <h3 className='footer-h3'>Working Hours</h3>
          <p>24 hours a day</p>
        </div>
      </div>

      <div className="maps-container">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d607.1022982333094!2d13.375044273250944!3d52.50793341948302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1suk!2sde!4v1707067828012!5m2!1suk!2sde" width="1300" height="350"  title="Google Map"></iframe> 
      </div>
  
      </div>
  );
};

export default Footer;
