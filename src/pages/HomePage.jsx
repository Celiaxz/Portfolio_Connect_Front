import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import ShareIcon from "/share_icon.svg"
import ConnectIcon from "/connect_icon.svg"
import GithubIcon from "/github.svg"
import FeedbackIcon from "/feedbacks_icon.svg"
import "./HomePage.css"
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user, isLoading, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSignUp=()=>{
navigate('signup')
  }
  const handleLogin=()=>{
    navigate('/login')
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
        <div className="homePage_container">
          <header className="header">
            <h1>Welcome to Portfolio Connect {user && user.username}!</h1>
            <p className="intro">
              Unleash coding creativity and collaboration with Portfolio Connect. Your space to shine, connect, and showcase projects.          </p>
          </header>
          <main className="main_container">

          <div className="first_box">
            <div className="category">
              <h4>Share Your Genius:</h4>
              <div className="icon_container">
                <img src={ShareIcon} alt="share icon" className="icons" />
              </div>
              <p>
              Showcase your coding brilliance with a captivating portfolio. From web apps to mobile innovations, reveal your coding mastery and ingenious solutions.              </p>
            </div>
            <div className="category">
              <h4>Connect and Collaborate:</h4>
              <div className="icon_container">
                <img src={ConnectIcon} alt="connect icon" className="icons" />
              </div>
              <p>
              Connect with developers, explore projects, learn techniques. Join a vibrant community for collaboration, learning, and inspiration.              </p>
            </div>
            <div className="category">
              <h4>GitHub Integration:</h4>
              <div className="icon_container">
                <img src={GithubIcon} alt="github icon" className="icons" />
              </div>
              <p>
              Link your GitHub to your Portfolio Connect profile. Showcase projects, skills, and your coding journey with ease. Share repositories and skills confidently.              </p>
            </div>
            <div className="category">
              <h4>Meaningful Feedback:</h4>
              <div className="icon_container">
                <img src={FeedbackIcon} alt="feedback icon" className="icons" />
              </div>
              <p>
              Receive valuable feedback from developers. Constructive critiques and tips will help you grow and refine your skills.              </p>
            </div>
          </div>
          {!isLoggedIn && 
          <div className="second_box">
            <p>
              Dive into a world of coding innovation and join us on the journey of coding exploration, collaboration, and mutual growth. Let's build, learn, and connect together on Portfolio Connect.
            </p>
            <button type="button" className="homepage_button" onClick={handleSignUp}>Sign Up</button>
            <button type="button" className="homepage_button" onClick={handleLogin}>Login</button>
          </div>}
          </main>
        </div>
    </>
  );
}

export default HomePage;
