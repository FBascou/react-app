import React from 'react'; //{ useContext } 
// import PokemonContext from '../PokemonContext';
import PokemonRow from "./PokemonRow";
import { useSelector, useDispatch } from 'react-redux';

const PokemonTable = () => {
    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemon);
    const filterPokemon = useSelector((state) => state.filterPokemon);
    
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

export default PokemonTable;
