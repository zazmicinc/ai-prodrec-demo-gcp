import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className="content__footer">
    <p className="content__footer-text">
      ©2023 Developed by Zazmic Inc.
    </p>
    <div className="content__footer-block">
      {" "}
      <p className="content__footer-text-rights">
        {" "}
        Powered by Google Vertex AI. 
      </p>{" "}{" "}
      <span className="content__footer-span">&nbsp;All rights reserved</span>
    </div>
  </div>
  )
}

export default Footer