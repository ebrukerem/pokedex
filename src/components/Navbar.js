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
    <nav>
      <div className='nav-center'>
      <div className='nav-header'>
        <Link to='/'>
          <img src={logo} alt='pokemon db logo' className='logo' />
        </Link>
        <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
        </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
        <ul className='links' ref={linksRef}>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/MyPokemonList'>My Pokemon List</a>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  )
}