import React from "react"; //{ useContext }
// import PokemonContext from "../PokemonContext";
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';

const Input = styled.input`
  width: 100%;
  padding: 0.2rem;
  font-size: large;
`;

const PokemonFilter = () => {
  const dispatch = useDispatch();
  const filterPokemon = useSelector((state) => state.filterPokemon);
  return (
    <Input
        type="text"
        value={filterPokemon}
        onChange={(e) => dispatch({type: 'SET_FILTER_POKEMON', payload: e.target.value,})}
    />
  );
};

export default PokemonFilter;