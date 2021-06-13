import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import pages
import Home from "./pages/Home";
import MyPokemonList from "./pages/MyPokemonList";
import SinglePokemon from "./pages/SinglePokemon";
import Error from "./pages/Error";
// import components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
    <div>
    <Navbar/>
    <Switch>
        <Route exact path = "/">
          <Home/>
        </Route>
        <Route  path = "/pokemon/:id">
          <SinglePokemon/>
        </Route>
        <Route  path = "/mypokemonlist">
          <MyPokemonList/>
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch> 
    </div>
    </Router>
  );
}

export default App;
