import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context'
import Alert from '../components/Alert'
import { FaPlus, FaTrash } from 'react-icons/fa';

const Pokemon = ({name, url,isUserPokemonList})=>{
   
   const { myPokemonList, setMyPokemonList, alert, setAlert, alertPokemonName,setAlertPokemonName} = useGlobalContext()
   const pokemonID = url.split('/')[url.split('/').length -2];
   const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`
   const myListPokemon = {
       pokemonID: pokemonID,
       name: name,
       url:url,
       pokemonImage: pokemonImage
   };

   const showAlert =(show= false, type= '', msg='')=>{
       setAlert({show,type,msg});
   }
   const handleAddMyList = (pokemon)=>{
      setAlertPokemonName(pokemon.name);
      let pokemonIsAvail = null;
      if(myPokemonList.length > 0)
      {
        pokemonIsAvail = myPokemonList.find((item) => 
        {
           return (pokemon.name === item.name) ? pokemon : null;
        });
      }
      console.log(pokemonIsAvail);
      if(pokemonIsAvail === undefined || pokemonIsAvail === null)
      {
          setMyPokemonList([...myPokemonList, pokemon]);
          showAlert(true,'success','Pokemon added to your list');
      }
      else{
        showAlert(true,'success','Pokemon cannot added to your list');
      }
   }

   const handleRemoveMyList = (pokemon)=>{
    setAlertPokemonName(pokemon.name);
    if(myPokemonList.length > 0)
    {
        const newMyPokemonList = myPokemonList.filter((item) => pokemon.name === item.name);
        if(newMyPokemonList.length === 0)
        {
          showAlert(true,'danger','This pokemon is not in your list');
        }
        else{
            setMyPokemonList([...myPokemonList.filter((item) => pokemon.name !== item.name)]);
            showAlert(true,'danger','Pokemon removed from your list');
        }
        
    }

   }
   return(
       <article className = 'pokemon'>
       {alertPokemonName === name && alert.show && <Alert {...alert} removeAlert ={showAlert} list ={myPokemonList}/>}
        <div className='img-container'>
            <img src={pokemonImage} alt={name} />
         </div>
         <div className = 'pokemon-footer'>
              <h3 className= "section-title">{name}</h3>
              <Link to={`/pokemon/${pokemonID}`} className='btn btn-primary btn-details'>
                 details
             </Link>
             <div className = 'btn-container'>
                {isUserPokemonList || <button className = 'addtolist-btn'  onClick = {()=>handleAddMyList(myListPokemon)}><FaPlus/></button>}
                <button className = 'deletefromlist-btn' onClick = {()=>handleRemoveMyList(myListPokemon)}><FaTrash/></button>
             </div>
             
          </div>
       </article>
   );
   
}

export default Pokemon;