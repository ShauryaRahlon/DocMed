import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <>
      <footer class="footer">
        <p>Copyright © DocMed - All Rights Reserved | <Link to='/privacy'>Privacy Policy</Link></p>
      </footer>
    </>
  )
}

export default Footer