import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';  // Contact Icons
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiOutlineLinkedin } from 'react-icons/ai';  // Social Icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 mt-16">
      <div className="container mx-auto px-6 md:px-12">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-gray-100">Result Management</h3>
            <p className="text-gray-400 text-sm">
              Empowering institutions with modern tools to manage and track student results seamlessly.
            </p>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition duration-300">
                <AiFillFacebook size={30} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition duration-300">
                <AiFillInstagram size={30} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <AiFillTwitterCircle size={30} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition duration-300">
                <AiOutlineLinkedin size={30} />
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Services</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Result Tracking</li>
              <li>Student Performance Analytics</li>
              <li>Real-time Updates</li>
              <li>Customizable Dashboards</li>
              <li>Grade Reporting</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="text-gray-400 text-sm space-y-3">
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-yellow-500" size={20} />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-yellow-500" size={20} />
                <span>support@resultmanager.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-yellow-500" size={20} />
                <span>123 Main Street, Cityville</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Subscribe</h3>
            <p className="text-gray-400 text-sm">Get the latest updates on new features and improvements.</p>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-gray-700 border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button type="submit" className="mt-4 py-2 px-6 rounded-md text-white bg-yellow-500 hover:bg-yellow-400 transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; 2024 Result Management. All rights reserved.</p>
          <div className="space-x-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
