import {Link} from "react-router-dom";
import instagram from "../assets/icons/instagram.svg";
import facebook from "../assets/icons/facebook.svg";
import twitter from "../assets/icons/twitter.svg";
const Footer = () => {  
  return (
    <footer className="text-[#cc2b03] bg-white px-6 py-12 border-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Recharge X</h2>
          <span>
            <h1 className="text-[#cc2b03] text-sm font-semibold">Buy on Whatsapp</h1>
            <p className="text-black text-sm">

              09065788599
            </p>
          </span>
          
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-black underline">
            <li><Link to="#" className="hover:text-[#cc2b03]">Send a gift voucher</Link></li>
            <li><Link to="#" className="hover:text-[#cc2b03]">Blog</Link></li>
            <li><Link to="#" className="hover:text-[#cc2b03]">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-[#cc2b03]">About us</Link></li>
            <li><Link to="#" className="hover:text-[#cc2b03]"> Terms and Conditions</Link></li>
            <li><Link to="#" className="hover:text-[#cc2b03]">FAQs</Link></li>
            <li><Link to="#" className="hover:text-[#cc2b03]">Links </Link></li>

            
            
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="text-sm text-black space-y-2">
            <li>Email: <Link to="mailto:info@progressivehumanitarian.org" className="hover:text-red-700">brightiheagwam1@gmail.com</Link></li>
            <li>Phone: <span className="italic text-black">+234 906 5788 599</span></li>
            <li>Address: <span className="italic text-black"> Block B Room 72 Kuti Hall, University of Ibadan, Oyo, Ibadan</span></li>
          </ul>
        </div>

        {/* Newsletter or Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Did You Know?</h3>
          <ul className="text-sm text-black space-y-2">
            <li>✓ Over 100 people are using Recharge X to pay for their utiliy bills </li>
            <li>✓ Active both National and Internationally</li>
            <li></li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/share/1C4t6scgmn/?mibextid=wwXIfr" target="blank" className="text-gray-300 hover:text-[#cc2b03]"><img src={facebook} alt="facebook logo" /></a>
            <a href="https://x.com/pphf2020?s=11&t=QmqCiexD3Ori2IiyQkKLig" target="_blank" className="text-gray-300 hover:text-[#cc2b03]"><img src={twitter} alt="twitter logo" /></a>
            <a href="https://www.instagram.com/progressivehumanitarian?igsh=aHdvNmcyZzRpdXJz" target="blank" className="text-gray-300 hover:text-[#cc2b03]"><img src={instagram} alt="instagram logo" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-12 border-t border-[#cc2b03] pt-6 text-center text-sm text-black">
        &copy; 2025 Recharge X.
      </div>
    </footer>
  );
};

export default Footer;
