import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark py-4">
      <div className="container text-center">



        {/* Copyright */}
        <p
          className="text-white m-0"
          style={{
            fontSize: "14px",
            letterSpacing: "1px",
            opacity: "0.85",
          }}
        >
          © 2024 Anime Street Style — All Rights Reserved
        </p>

        <div className="d-flex justify-content-center gap-4 mb-3 p-2 ">

          <a
            href="#"
            className="text-white icon-hover"
            style={{ fontSize: "20px", opacity: 0.9 }}
          >
            <i className="bi bi-instagram"></i>
          </a>

          <a
            href="#"
            className="text-white icon-hover"
            style={{ fontSize: "20px", opacity: 0.9 }}
          >
            <i className="bi bi-github"></i>
          </a>

          <a
            href="#"
            className="text-white icon-hover"
            style={{ fontSize: "20px", opacity: 0.9 }}
          >
            <i className="bi bi-linkedin"></i>
          </a>

          <a
            href="#"
            className="text-white icon-hover"
            style={{ fontSize: "20px", opacity: 0.9 }}
          >
            <i className="bi bi-facebook"></i>
          </a>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
