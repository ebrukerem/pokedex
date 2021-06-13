import React from 'react'
import Alert from '../components/Alert'
import UserPokemonList from '../components/UserPokemonList'

const MyPokemonList = ()=>
{
    

    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    return(
        <section className = 'section-center'>
            <form className = 'mypokemonlist-form' onSubmit = {handleSubmit}>
                {alert.show && <Alert/> }
            </form>
            <div>
              <button className = 'clear-btn'>
                Clear pokemons
              </button>
            </div>
            <UserPokemonList/>
        </section>
    )
}

export default MyPokemonList;