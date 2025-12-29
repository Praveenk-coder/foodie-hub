import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const Navigate=useNavigate();
  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">
            Hello..! <span>Welcome To</span> <span className="brand">Foodie Hub</span>
          </h1>
          <p className="home-tagline">
            Discover delicious meals, fresh ingredients, and fast delivery.
          </p>
          <button className="home-btn" onClick={()=>Navigate("/Veg")}>Explore Menu</button>
        </div>

        <div className="home-image">
          <img src={"homeimg1.png"} alt="food" />
        </div>
      </div>
    </>
  );
}

export default Home;
