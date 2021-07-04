import { React, useState, useEffect } from "react";
import './App.css';
import styled from '@emotion/styled';
import PropTypes from "prop-types";
import { Button } from '@material-ui/core';

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <Button variant="contained" color="primary" onClick={() => onSelect(pokemon)}>Select</Button>
    </td>
  </tr>
)

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
}

const PokemonInfo = ({ name, base }) => (
  <div>
    <h2>{name.english}</h2>
    <table>
      <tbody>
        {
          Object.keys(base).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>{base[key]}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
}

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 1rem;
`;

const Container = styled.div`
      margin: auto;
      width: 800px;
      paddingTop: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

function AppFunctional() {
  const [filter, setFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/react-app/pokemon.json")
    .then(res => res.json())
    .then(data => setPokemon(data));
  }, [])

  return (
    <Container>
      <Title>Pokemon Search</Title>
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <TwoColumnLayout>
        <div>
          <table width="100%">
            <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
            </thead>
            <tbody>
              {pokemon
              .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
              .slice(0, 20)
              .map(pokemon => (
                <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => setSelectedItem(pokemon)}/>
              ))}  
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo { ...selectedItem } />}
      </TwoColumnLayout>
    </Container>
  );
}

export default AppFunctional;