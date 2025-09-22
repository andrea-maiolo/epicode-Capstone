const Footer = () => {
  const footerStyle = {
    backgroundColor: "#060609",
    color: "#f5f5f5",
    padding: "2rem 0",
  };

  const linkStyle = {
    color: "#8fccc1", // Secondary color for links
    textDecoration: "none",
  };

  return (
    <footer className="mt-auto" style={footerStyle}>
      <div className="container-fluid text-center">
        <div className="row justify-content-center">
          <div className="col-12">
            {/* Copyright */}
            <p className="mb-1">&copy; {new Date().getFullYear()} Andrea Maiolo</p>
            {/* Contact Information */}
            <p className="mb-0">
              <a href="mailto:maiolo.m.2@gmail.com" style={linkStyle}>
                maiolo.m.2@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
