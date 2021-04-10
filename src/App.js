import React, { useEffect, useState } from 'react';
import './App.css';
import client from './client'
import Card from './Card'
import background from "./Pictures/4a6b5214f65c4848fd59c57caefc6cc0.gif";

function App() {
  const [characters, setCharacters] = useState([]);
  // const [isLoading, setIsLoading] = useState(true)
  
  const [playerCards, setPlayerCards] = useState([])
  const [computerCards, setComputerCards] = useState([])

  const [currentCards, setCurrentCards] = useState([])
  const [cardsDealt, setCardsDealt] = useState(false)

  const [currentValue, setCurrentValue] = useState()

  const [display, setDisplay] = useState('Select your weapons!')
  const [button, toggleButton] = useState(true)

  useEffect(() => {
    client.getEntries() //works like fetch method
    .then(response => response.items)
    .then((json) => {
      setCharacters(json);
      // setIsLoading(false);
    })
    .catch(console.log('request failed'));
  }, [])


  // this useEffect triggers when the playerCards/computerCards changes. It checks if there are any cards in the 
  // playerCard and the computerCard array. It also checks if the currentCard array is empty. Only if all of these
  // conditions are true, it deals new Cards. This prevents the game from trying to deal new cards if there aren't any to deal
  useEffect(() => {
    if (playerCards.length && computerCards.length && !currentCards.length) {
      dealNewCards()
      console.log(playerCards)
    }
  }, [playerCards, computerCards])


  // Shuffle Function (taken from the Internet), takes characters Array and returns a shuffled Array
  const shuffleCards = () => {
     const shuffledCharacters = [...characters] //define new array that will get shuffled (goes through the list and swaps two items randomly)
      for (let i = shuffledCharacters.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledCharacters[i], shuffledCharacters[j]] = [shuffledCharacters[j], shuffledCharacters[i]];
      }
      return shuffledCharacters //gives us back the shuffled array
  }

  const dealNewCards = () => {
    const oldPlayerCards = [...playerCards]
    const playerCard = oldPlayerCards.shift() //removes the first Card from the playerCards array
    setPlayerCards(oldPlayerCards) //sets the new Player Card State to the array without the dealt Card
    const oldComputerCards = [...computerCards]
    const computerCard = oldComputerCards.shift() //removes the first Card from the ComputerCards array
    setComputerCards(oldComputerCards) //sets the new Computer Card State to the array without the dealt Card
    setCurrentCards([playerCard, computerCard])
    console.log(currentCards)
    setCardsDealt(true)
  }

  const startGame = () => {
    const shuffledCards = shuffleCards()
    // shuffleCards() : this function gets activated immediately
    // shuffleCards: this function is only a variable that stores the information of the function 
    // (use this if you DON'T want to activate the function but still want to share the information)
   
    const half = Math.ceil(shuffledCards.length / 2); 
    const firstHalf = shuffledCards.splice(0, half)
    const secondHalf = shuffledCards.splice(-half)
    setPlayerCards([...firstHalf])
    setComputerCards([...secondHalf])
  }

  const compareAttribute = (evt) => {
    evt.preventDefault();
    if (currentCards[0].fields[currentValue] > currentCards[1].fields[currentValue]) {
      setDisplay('You win!')
      setPlayerCards([...playerCards, ...currentCards])

    } else { 
      setDisplay('You lose!')
      setComputerCards([...computerCards, ...currentCards])
    }
   toggleButton(false)
  };

    const newCards = () => {
      dealNewCards()
      toggleButton(true)
    }

 return (
   <div className='App'>
     <div className='App__wrapper'>

   <h1 className="App__heading"></h1>
   <div className="App__display">{display}</div>
   {/* {characters.map((character, index) =>  <Character character={character} key={index}/>)} */}
   <div className="App__characters">
    <div className="App__counter App__counter--player">{playerCards.length}</div>
    {cardsDealt? <Card playerCard={true} character={currentCards[0]} setCurrentValue={setCurrentValue} flipped={true}/> : <Card character={null} flipped={false}/> }
    <button className="App__button--battle" onClick={button ? compareAttribute : newCards}>{button? 'Battle': 'Next'}</button>
    {cardsDealt? <Card playerCard={false} character={currentCards[1]} flipped={true}/> : <Card character={null} flipped={false}/>}
    <div className="App__counter App__counter--computer">{computerCards.length}</div>
   </div>
   <button className="App__button--new-game" onClick={startGame}>New Game</button>
   </div>
   </div>
 )}

export default App;
