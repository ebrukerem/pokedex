import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import {FaFastForward, FaFastBackward} from 'react-icons/fa'

export default function SinglePokemon() {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [pokemon, setPokemon] = React.useState(null)
  const [imgID, setImageID] = React.useState(6);
  const imageUrls = {
    back_female: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/${id}.png`,
    back_shiny_female:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`,
    back_default:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
    front_female:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/${id}.png`,
    front_shiny_female:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/${id}.png`,
    back_shiny:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`,
    front_default:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    front_shiny:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`};
   let image = imageUrls.front_default;

  React.useEffect(() => {
    setLoading(true)
    async function getPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        )
        const data = await response.json()
        if (data) {
            
        console.log(data);
          const {
            name,
            abilities,
            base_experience,
            height,
            held_items,
            stats,
            weight,
            types
          } = data
          
          const newPokemon = {
            name,
            abilities,
            base_experience,
            height,
            held_items,
            stats,
            weight,
            types
          }
          setPokemon(newPokemon)
        } else {
            setPokemon(null)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getPokemon()
  }, [id])
  if (loading) {
    return <Loading/>
  }
  if (!pokemon) {
    return <h2 className='section-title'>no pokemon to display</h2>
  } else {
    const {
        name,
        abilities,
        base_experience,
        height,
        held_items,
        stats,
        weight,
        types
    } = pokemon;


    const beforeClickHandler = ()=>{
        let newImageID = imgID;
        if(newImageID == 0)
        {
            newImageID = Object.entries(imageUrls).length -1;
        }
        else{
            newImageID = newImageID -1;
        }
        image=  Object.entries(imageUrls)[newImageID][1];
        setImageID(newImageID);
        document.getElementById("imageHolder").src = image;
    }

    const nextClickHandler = ()=>{
        let newImageID = imgID;
        if(newImageID == Object.entries(imageUrls).length -1)
        {
            newImageID = 0;
        }
        else{
            newImageID = newImageID + 1;
        }
        image=  Object.entries(imageUrls)[newImageID][1];
        setImageID(newImageID);
        document.getElementById("imageHolder").src = image;
    }

    return (
      <section className='section pokemon-section'>
      
        <div className='poke'>
          <div>
            <h2 className='section-title'>{name}</h2>
            <img id = "imageHolder" src={image} alt={name}></img>
            <div className = "row">
             <div className = "column">
                <button className = "nextPrevImageBtn" onClick= {beforeClickHandler}><FaFastBackward/></button> 
             </div>
             <div className = "column">
                <button className = "nextPrevImageBtn"  onClick= {nextClickHandler}><FaFastForward/></button>    
             </div>

            </div>
            
          </div>
          
          <div className='poke-info'>
          <p>
              <span className='poke-data'>weight :</span> {weight / 10} kg
            </p>
            <p>
              <span className='poke-data'>height:</span> {height/10} meter 
            </p>
            <p>
              <span className='poke-data'>base_experience :</span> {base_experience}
            </p>
            <p>
              <span className='poke-data'>abilities :</span>
              {abilities.map((item, index) => {
                return item ?<div key = {index} className= 'pokemon-data-features '> 
                    <span> ----------------- </span><br/>
                    <span> Name: {item.ability.name}</span><br/>
                    <span> hidden : {item.is_hidden ? "true": "false"}</span><br/>
                    <span> ----------------- </span><br/>
                </div> : null
              })}
            </p>
            <p>
              <span className='poke-data'>held_items :</span>
              {held_items.map((item, index) => {
                return item ? <span key={index}> {item.item.name}</span> : null
              })}
            </p>
            <p>
              <span className='poke-data'>stats :</span>
              {stats.map((item, index) => {
                if(item){
                    return(
                        <div  key={index} className = "pokemon-data-stats">
                        <span> {item.stat.name}: </span>
                        <div id ="progressbar" >
                           <div style={{width: item.base_stat + '%'}}> {item.base_stat}%</div> 
                        </div>
                        </div>
                    );
                }else{
                    return null;
                }
              })}
            </p>
            <p>
              <span className='poke-data'>types :</span>
              {types.map((item, index) => {
                return item ? <span key={index}> {item.type.name}</span> : null
              })}
            </p>
          </div>
        </div>
      </section>
    )
  }
}