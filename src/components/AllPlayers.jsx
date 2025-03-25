import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlayers } from '../API/index';

function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
    async function getPlayers() {
      const allPlayers = await fetchPlayers();
      setPlayers(allPlayers);
    }
    getPlayers();
  }, []);

  useEffect(() => {
    const results = players.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayers(results);
  }, [searchTerm, players]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2>All Players</h2>
      <input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={handleChange}
      />
      {filteredPlayers.map((player) => (
        <div key={player.id}>
          <Link to={`/players/${player.id}`}>
            <h4>{player.name}</h4>
          </Link>
          <p>{player.breed}</p>
        </div>
      ))}
    </div>
  );
}

export default AllPlayers;
