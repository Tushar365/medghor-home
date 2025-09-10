import React from 'react';
import { motion } from 'framer-motion';
import styles from './footer.module.css';

const MedghorFooter = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      href: "https://facebook.com",
      icon: "M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z",
      ariaLabel: "Visit our Facebook page"
    },
    {
      href: "https://x.com",
      icon: "M18.901 1.153h3.68l-8.04 9.557L24 22.846h-7.406l-5.8-7.584-6.638 7.584H1.474l8.6-9.82L0 1.154h7.594l5.243 6.932zM17.337 20.65h2.036L6.789 3.245H4.608z",
      ariaLabel: "Visit our X (formerly Twitter) page"
    },
    {
      href: "https://linkedin.com",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
      ariaLabel: "Visit our LinkedIn page"
    }
  ];

  return (
    <motion.footer 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6,
        ease: "easeOut"
      }}
      className={styles.footer}
    >
      <div className={styles.footerContainer}>
        {/* Company Info Section */}
        <div className={styles.companySection}>
          <motion.div 
            className={styles.brandSection}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={styles.brandName}>MEDGHOR</h2>
            <p className={styles.brandTagline}>Wholesale & Retail Medicine Supplier</p>
          </motion.div>
          <p className={styles.description}>
            Your trusted healthcare partner providing quality medicines at competitive prices. 
            Serving pharmacies, hospitals, and individuals with reliable pharmaceutical solutions.
          </p>
        </div>

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>Get In Touch</h3>
          <div className={styles.contactDetails}>
            <motion.a 
              href="tel:+91 0099887766" 
              className={styles.contactItem}
              whileHover={{ x: 5 }}
            >
              <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              +91 0099887766
            </motion.a>
            <motion.a 
              href="mailto:medghoronline@gmail.com" 
              className={styles.contactItem}
              whileHover={{ x: 5 }}
            >
              <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              medghoronline@gmail.com
            </motion.a>
            <motion.a 
              href="https://www.medghor.com" 
              className={styles.contactItem}
              whileHover={{ x: 5 }}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              www.medghor.com
            </motion.a>
          </div>
        </div>

        {/* Social Links Section */}
        <div className={styles.socialSection}>
          <h3 className={styles.sectionTitle}>Follow Us</h3>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className={styles.socialLink}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d={link.icon}/>
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        className={styles.bottomBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className={styles.copyright}>
          &copy; {currentYear} Medghor. All rights reserved. | Trusted Medicine Supplier
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default MedghorFooter;