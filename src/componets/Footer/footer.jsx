import React from "react";
import './footer.css'


function Footer(props) {
  return (
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <p>Papers Accounting</p>
        </div>
        <div class="social-links">
          <a href="#" class="social-link">
            Facebook
          </a>
          <a href="#" class="social-link">
            Twitter
          </a>
          <a href="#" class="social-link">
            Instagram
          </a>
        </div>
        <div class="footer-contact">
          <a href="#" class="contact-link">
            Contact
          </a>
          <p>
            Email: <a href="mailto:your@email.com">marvelouslouis49@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
