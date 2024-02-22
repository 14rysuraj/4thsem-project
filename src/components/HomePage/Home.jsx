import React, { useContext, useEffect } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import About from "../About/About";
import Services from "../Services/Services";
import pic1 from "../../assets/aeroplanemeal.jpeg";
import pic2 from "../../assets/seatselection.jpeg";
import pic3 from "../../assets/bestprice.jpeg";
import pic4 from "../../assets/airhostess.jpeg"
import { useCookies } from "react-cookie";
import { context } from "../../main";

function Home() {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [cookies,_] = useCookies("token");

  

  return (
    <>
      <div className="homeBody">
        <main className="homeContainer">
          <img src="../src/assets/aeromain.jpeg" alt="image" />
          <div class="content">
            <h1>Book Your Dream Flight</h1>
            <br />
            <br />
            <p>
              Effortless booking for global destinations from Kathmandu . Secure
              your seat today
            </p>
            <br />
            <button>
              {" "}
              <NavLink to="/book"> Book Now </NavLink>{" "}
            </button>
          </div>
        </main>

        <div className="serviceBox">
          <div className="services">
            <h2>Our Services</h2>
          </div>
          <div className="servicesCards">
            <Services img={pic1} title="Prebook meal" />
            <Services img={pic2} title="Comfortable seat" />
            <Services img={pic3} title="Best Price Guarantee" />
            <Services img={pic4} title="Friendly environment" />
          </div>
        </div>

        <About />

        <div className="contactArea">
          <form action="">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="inputField"
              required
            />
            <br />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />

            <label htmlFor="message">Message:</label>
            <textarea id="message" rows="5" cols="60" name="message"></textarea>
            <br />
            <div className="sendbtn">
              <button>Send</button>
            </div>
          </form>

          <div className="contactPara">
            <h2>Get In Touch</h2>
            <br />
            <br />
            <p>
              Reach out to us using the contact form . We look forward to
              hearing from you and assisting you with your airlines ticked
              booking needs.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
