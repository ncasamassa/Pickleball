import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [ players, setPlayers ] = useState([]);
  const [ name, setName ] = useState("");
  const [ skillLevel, setSkillLevel ] = useState("");
  const [ city, setCity ] = useState("");
  const [ newPlayer, setNewPlayer ] = useState({
    name: "",
    skillLevel: "",
    city: "",
  });

  useEffect(() => {
    fetch("http://localhost:3003/api/get-all-players")
      .then((response) => response.json())
      .then((data) => setPlayers(data));
  }, []);

  const handleSubmit = () => {
    setNewPlayer({ name, skillLevel, city });
    createPlayer()
      .then(() => getAllPlayers())
      .then(() => {
        setName("");
        setSkillLevel("");
        setCity("");
      })
  }

  return (
    <div className="App">
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Skill Level"
        value={skillLevel}
        onChange={(e) => setSkillLevel(e.target.value)}
      />
      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Player</button>

      {players.map((player) => (
        <div key={player._id}>
          <h1>{player.name}</h1>
          <p>Skill Level: {player.skillLevel}</p>
          <p>City: {player.city}</p>
          <button onClick={() => handleDelete(player._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
