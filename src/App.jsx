import React, { useEffect, useState } from 'react';
import './App.css';
import rockPlayer from './assets/img/stonePlayer.png';
import rockComputer from './assets/img/stoneComputer.png';
import paperPlayer from './assets/img/paperPlayer.png';
import paperComputer from './assets/img/paperComputer.png';
import scissorsPlayer from './assets/img/scissorsPlayer.png';
import scissorsComputer from './assets/img/scissorsComputer.png';

function App() {

  const [playerSelectedWeapon, setPlayerSelectedWeapon] = useState('');
  const [playerImageCorrespondinValue, setPlayerImageCorrespondinValue] = useState(rockPlayer);
  const [shakeClassName, setShakeClassName] = useState('');

  const [generatedImage, setGeneratedImage] = useState(rockComputer);
  const [computerCorrespondingValue, setComputerCorrespondingValue] = useState('');
  
  const [displayWinLoseTie, setDisplayWinLoseTie] = useState('');
  const [compterScore, setComputerScore] = useState(0)
  const [playerScore, setPlayerScore] = useState(0)

  const weapons = [
    { name: 'Rock', playerImg: rockPlayer },
    { name: 'Paper', playerImg: paperPlayer },
    { name: 'Scissors', playerImg: scissorsPlayer }
  ];

  const computerWeapons = [rockComputer, paperComputer, scissorsComputer];

  const randomNumberGenerator = () => {
    const randomIndex = Math.floor(Math.random() * (computerWeapons.length));
    return computerWeapons[randomIndex];

  }

  const player = (weapon) => {

    setShakeClassName('shaker')
    setTimeout(() => {
    setPlayerSelectedWeapon(weapon.name);
    setPlayerImageCorrespondinValue(weapon.playerImg);

    const randomImage = randomNumberGenerator();
    setGeneratedImage(randomImage);

    if (randomImage === rockComputer) {
      setComputerCorrespondingValue('Rock');
    } else if (randomImage === paperComputer) {
      setComputerCorrespondingValue('Paper');
    } else if (randomImage === scissorsComputer) {
      setComputerCorrespondingValue('Scissors');
    }
    
    setShakeClassName('')
  }, 1000);
  }

  useEffect(() => {
    const determineWinner = () => {
      if (
        (playerSelectedWeapon === 'Rock' && computerCorrespondingValue === 'Scissors') ||
        (playerSelectedWeapon === 'Paper' && computerCorrespondingValue === 'Rock') ||
        (playerSelectedWeapon === 'Scissors' && computerCorrespondingValue === 'Paper')
      ) {
        setDisplayWinLoseTie('You Win');
        setPlayerScore(prev => prev + 1)
      } else if (
        (computerCorrespondingValue === 'Rock' && playerSelectedWeapon === 'Scissors') ||
        (computerCorrespondingValue === 'Paper' && playerSelectedWeapon === 'Rock') ||
        (computerCorrespondingValue === 'Scissors' && playerSelectedWeapon === 'Paper')
      ) {
        setDisplayWinLoseTie('You Lose');
        setComputerScore(prev => prev + 1)
      } else {
        setDisplayWinLoseTie('Tie');
      }
    };
    determineWinner();
  }, [playerSelectedWeapon, computerCorrespondingValue]);
  
  return (
    <div>

    <div className='game-container'>
      <div className="game-wrapper">

      <img className='rps-logo' src="https://images.squarespace-cdn.com/content/v1/618037d25050485b61e7f62d/271f0feb-c872-4eb6-b918-3e9c8e38443c/Rock+Paper+Scissors+Logo.png" alt="" />

      <div className="weapons-container">
        <div className="player-weapon-container">
        <h5>Player 1</h5>
        <img className={shakeClassName} src={playerImageCorrespondinValue} alt="Computer's choice" />
        </div>      
        <h3>vs</h3>
        <div className="computer-weapon-container">
        <h5>Computer</h5>
        <img className={shakeClassName}  src={generatedImage} alt="Player's choice" />
        </div>
      </div>

      <div className="display-win-lose-tie-container">
        <h1>{displayWinLoseTie}</h1>
      </div>

      <div className="score-board-container">
        <div className="each-score">
          <h1 className='score-header'>Your Score</h1>
          <h1 className='score-number'>{playerScore}</h1>
        </div>
        <div className="each-score">
          <h1 className='score-header'>Computer Score</h1>
          <h1 className='score-number'>{compterScore}</h1>
        </div>
      </div>

      <div className="player-weapon-btns">
      {weapons.map((weapon, i) => (
        <div key={i}>
        <div className="btns-container">
          <button onClick={() => player(weapon)}>{weapon.name}</button>
        </div>
        </div>
      ))}
      </div>

      </div>
    </div>
      
    </div>
  )
}

export default App