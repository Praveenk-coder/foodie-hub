import './Aboutus.css';

function Aboutus() {
  return (
    <div className="aboutus-container">
      <h1 className="about-title">About Foodie Hub</h1>

      <p className="about-tagline">
        Bringing happiness to your door with every bite 🍽️
      </p>

      <div className="about-content">
        <p>
          Welcome to <strong>Foodie Hub</strong> — your one-stop destination for fresh,
          delicious, and hygienically prepared meals. We partner with top-rated
          restaurants and trusted chefs to deliver food that’s not only tasty but
          also safe and nutritious.
        </p>

        <p>
          Founded in 2024, our goal is to revolutionize the way you order food by
          combining technology and culinary excellence. Whether you're craving
          spicy street food or premium gourmet dishes, we've got it all covered.
        </p>

        <h3 className="about-heading">Our Mission</h3>
        <p>
          To deliver **quality food at lightning-fast speed** while ensuring customer
          satisfaction and maintaining hygiene standards.
        </p>

        <h3 className="about-heading">Our Vision</h3>
        <p>
          To become India's most loved and trusted online food delivery platform by
          expanding to 200+ cities and supporting local restaurants and home chefs.
        </p>

        <h3 className="about-heading">Why Choose Us?</h3>
        <ul className="about-list">
          <li>✔️ Fresh & hygienic ingredients</li>
          <li>✔️ Partnered with top restaurants</li>
          <li>✔️ Express delivery within 30–45' minutes</li>
          <li>✔️ Live order tracking & order customization</li>
          <li>✔️ 24/7 customer support</li>
        </ul>

        <h3 className="about-heading">Contact Us</h3>
        <p>
          📍 Foodie Hub Pvt. Ltd., Hyderabad, India<br />
          📧 Email: <a href="mailto:info@foodiehub.com">info@foodiehub.com</a><br />
          📞 Phone: +91 98765 43210
        </p>
      </div>
    </div>
  );
}

export default Aboutus;
