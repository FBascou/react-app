import React, { useEffect, useReducer, useContext } from "react";
import './App.css';
import styled from '@emotion/styled';
import { CssBaseline } from "@material-ui/core";
import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from "./PokemonContext";

const pokemonReducer = (state, action) => {
  switch(action.type) {
    case 'SET_FILTER_POKEMON':
      return {
        ...state,
        filterPokemon: action.payload
      };
    case 'SET_POKEMON':
      return {
        ...state,
        pokemon: action.payload
      };
    case 'SET_SELECTED_POKEMON':
      return {
        ...state,
        selectedPokemon: action.payload
      };
    default:
      throw new Error("No action");
  }
}

// this was removed from the PokemonTable.js because of new updates (removing useContext)
const PokemonTable = () => {
  const { state: { pokemon, filterPokemon }, dispatch, } = useContext(PokemonContext);
  return (
      <table width="100%">
          <tbody>
              {pokemon
              .filter(({ name: { english } }) => english.toLocaleLowerCase().includes(filterPokemon.toLocaleLowerCase()))
              .slice(0, 20)
              .map((pokemon) => (<PokemonRow 
                  pokemon={pokemon} 
                  onClick={(pokemon) => dispatch({type: 'SET_SELECTED_POKEMON', paylod: pokemon})} />))
              }
          </tbody>
      </table>
  );
};

const Title = styled.h1`
  text-align: center;
`;

const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;

function AppUseReducer() {
  const [state, dispatch] = useReducer(pokemonReducer, {
    filterPokemon: "",
    pokemon: [],
    selectedPokemon: null,
  });

  useEffect(() => {
    fetch("http://localhost:3000/react-app/pokemon.json")
      .then((res) => res.json())
      .then((data) => dispatch({
        type: 'SET_POKEMON',
        payload: data,
        })
      );
    }, []
  );

  if (!state.pokemon) {
    return <div>Loading data</div>;
  }

  return (
    <PokemonContext.Provider value={{state, dispatch}}>
      <PageContainer>
        <CssBaseline />
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          <PokemonInfo />
        </TwoColumnLayout>
      </PageContainer>
    </PokemonContext.Provider>
  );
}

export default AppUseReducer;