import React from 'react'
import Pokemon from './Pokemon'
import Loading from './Loading'
import { useGlobalContext } from '../Context'

const PokemonList = () =>{
  const { pokemons, loading } = useGlobalContext()
  if (loading) {
    return <Loading/>
  }
  if (pokemons.length < 1) {
    return (
      <h2 className='section-title'>
        no pokemon matched your search criteria
      </h2>
    )
  }
  return (
    <section className='pokemon-section'>
      <h2 className='section-title'>pokemons</h2>
      <div className='pokemons-center'>
        {pokemons.map((item) => {
          item['isUserPokemonList'] = false;
          return <Pokemon key={item.name} {...item}/>
        })}
      </div>
    </section>
  )
}

export default PokemonList;