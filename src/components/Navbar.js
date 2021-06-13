import React ,{ useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import logo from '../pokeball.svg'
import { FaBars } from 'react-icons/fa';
export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <Link to='/'>
          <img src={logo} alt='pokemon db logo' className='logo' />
        </Link>
        <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
        </button>
        <div className='nav-links-container' ref={linksContainerRef}>
        <ul className='nav-links' ref={linksRef}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/MyPokemonList'>My Pokemon List</Link>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  )
}