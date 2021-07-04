import React from "react";
import PokemonType from "../PokemonType";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const PokemonRow = ({ pokemon, onClick }) => (
    <>
        <tr key={pokemon.id}>
            <td>{pokemon.name.english}</td>
            <td>{pokemon.type.join(", ")}</td>
            <td>
            <Button
                variant="contained"
                color="primary"
                onClick={() => onClick(pokemon)}
            >
                More
            </Button>
            </td>
        </tr>
    </>
);
  
PokemonRow.propTypes = {
    pokemon: PropTypes.arrayOf(PokemonType),
};

export default PokemonRow;
  