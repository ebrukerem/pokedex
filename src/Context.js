import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const getLocalStorage = ()=>{
  let list = localStorage.getItem('list');
  if(list)
  {
    return (list = JSON.parse(localStorage.getItem('list')));
  }
  else{
    return [];
  }
    
}

let url = ' https://pokeapi.co/api/v2/pokemon/'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [pokemons, setPokemons] = useState([])
  const [myPokemonList, setMyPokemonList] = useState(getLocalStorage());
  const[alert, setAlert] = useState({show: false, msg: '', type:''});
  const[alertPokemonName, setAlertPokemonName] = useState("");
  const fetchPokemons = useCallback( async () => {
    setLoading(true)
    try {
      if(searchTerm === "")
      {
        url = 'https://pokeapi.co/api/v2/pokemon?limit=1118';
      }
      else{
        url = 'https://pokeapi.co/api/v2/pokemon/'
      }
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json();
      const {results} = data;
      if (results) {
        const newPokemons = results.map((value) => {
          const {
            name,
            url
          } = value

          return {
            name,
            url
          }
        });

        setPokemons(newPokemons);       
        
      } else {
        setPokemons([])
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  },[searchTerm])

  

  

  useEffect(() => {
    fetchPokemons()
  }, [searchTerm,fetchPokemons])

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(myPokemonList));
  },[myPokemonList]);

  return (
    <AppContext.Provider
      value={{ loading, pokemons, searchTerm, setSearchTerm, myPokemonList,setMyPokemonList, alert,setAlert,alertPokemonName,setAlertPokemonName}}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
