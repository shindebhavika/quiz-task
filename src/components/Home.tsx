import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [activeLink, setActiveLink] = useState('Home');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className=" mx-auto p-4 min-h-screen container ">
      <header className="p-3 container ">
        <div className=" flex justify-between items-center  ">
          <img
            src="https://t4.ftcdn.net/jpg/03/32/68/71/360_F_332687153_gmsohq86koOEWFYlYSI3N6xzb1zIcG88.jpg"
            alt="Logo"
            className="w-16 h-18 rounded-full"
          />
          <ul className="flex space-x-4 text-lg font-bold flex-wrap">
            {['Home', 'Features', 'Pricing', 'FAQs', 'About'].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className={`px-2 ${
                    activeLink === link ? 'text-blue-600' : 'text-black'
                  } transition duration-300 ease-in-out`}
                  onClick={() => handleLinkClick(link)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          
          <img
            src="https://t4.ftcdn.net/jpg/03/32/68/71/360_F_332687153_gmsohq86koOEWFYlYSI3N6xzb1zIcG88.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-full"
          />
       
        </div>
      </header>
      <main className="text-center mt-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz Platform</h1>
          <p className="text-lg mb-4">
            Your journey to knowledge starts here. Register or login to explore our quizzes.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="p-2 bg-blue-500 text-white rounded transition duration-300 ease-in-out hover:bg-blue-700 transform hover:scale-105"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="p-2 bg-green-500 text-white rounded transition duration-300 ease-in-out hover:bg-green-700 transform hover:scale-105"
            >
              Login
            </Link>
          </div>
        </div>
        <section className="text-left p-4 bg-gray-100 rounded shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Quiz Platform?</h2>
          <p className="mb-2">
            Our platform offers a variety of quizzes across different subjects to help you learn and
            test your knowledge.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li className="mb-2">Wide range of topics</li>
            <li className="mb-2">Instant feedback on your answers</li>
            <li className="mb-2">Detailed explanations for each question</li>
            <li className="mb-2">Track your progress and improve</li>
          </ul>
          <p>Join thousands of learners and start your quiz journey today!</p>
        </section>
      </main>
      <footer className="text-center mt-10">
        <p>&copy; 2024 Quiz Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
