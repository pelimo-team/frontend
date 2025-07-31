
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send
} from 'lucide-react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#8B4513',
    color: '#F5F5DC',
    padding: '60px 0 20px 0',
    fontFamily: 'Arial, sans-serif'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const footerContentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px'
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column' as const
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#FAEBD7',
    borderBottom: '2px solid #D2B48C',
    paddingBottom: '8px'
  };



  const socialIconsStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '15px'
  };

  const socialIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#D2B48C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8B4513',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    gap: '10px'
  };

  const bottomBarStyle = {
    borderTop: '1px solid #D2B48C',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '20px'
  };

  const brandStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#FAEBD7',
    marginBottom: '15px'
  };

  const descriptionStyle = {
    lineHeight: '1.6',
    marginBottom: '20px',
    color: '#F5F5DC'
  };



  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={footerContentStyle}>
          {/* Brand & Newsletter */}
          <div style={sectionStyle}>
            <h3 style={brandStyle}>🍕 Pelimo Foods</h3>
            <p style={descriptionStyle}>
              Delicious meals delivered fresh to your doorstep. We pride ourselves on quality ingredients,
              fast delivery, and exceptional customer service. Taste the difference!
            </p>

          </div>



   

          {/* Contact & Social */}
          <div style={sectionStyle}>
            <h4 style={titleStyle}>Contact Us</h4>
            <div style={contactItemStyle}><MapPin size={16} /><span style={{ fontSize: '14px' }}>123 Food Street, Gourmet City, FC 12345</span></div>
            <div style={contactItemStyle}><Phone size={16} /><span style={{ fontSize: '14px' }}>+1 (555) 123-FOOD</span></div>
            <div style={contactItemStyle}><Mail size={16} /><span style={{ fontSize: '14px' }}>hello@pelimofoods.com</span></div>
            <div style={contactItemStyle}><Clock size={16} /><span style={{ fontSize: '14px' }}>Daily: 9:00 AM - 11:00 PM</span></div>

            <h5 style={{ ...titleStyle, fontSize: '16px', marginTop: '25px', marginBottom: '15px' }}>Follow Us</h5>
            <div style={socialIconsStyle}>
              {[Facebook, Twitter, Instagram, Linkedin, Send].map((Icon, i) => (
                <div
                  key={i}
                  style={socialIconStyle}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#FAEBD7';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#D2B48C';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={bottomBarStyle}>
          <div style={{ fontSize: '14px' }}>© 2025 Pelimo Foods. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
            <span>🍕 Fresh Ingredients</span>
            <span>🚚 Fast Delivery</span>
            <span>💳 Secure Payment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
