import React from 'react'
import Pokemon from './Pokemon'
import { useGlobalContext } from '../Context'

const UserPokemonList = () =>{
  const { myPokemonList} = useGlobalContext() 
  return (
    <section className='section'>
    
      <h2 className='section-title'>pokemons</h2>
      <div className='pokemons-center'>
        {myPokemonList.map((item) => {
            item['isUserPokemonList'] = true;
          return <Pokemon key={item.name} {...item} />
        })}
      </div>
    </section>
  )
}

export default UserPokemonList;