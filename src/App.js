import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card'
import useGame2 from './hooks/useGame2'
import client from './client'

function App() {

// Get the API Data from Contentful and put it into our character state

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    client.getEntries() //works like fetch method
    .then(response => response.items)
    .then((json) => {
      setCharacters(json);
      // setIsLoading(false);
    })
    .catch(console.log('request failed'));
  }, [])

// Bring in our Game Logic with the custom useGame Hook, pass in the characters

  const [gameState, startGame, battle, nextCards] = useGame2(characters)

  // Our UI State (dependent on the current Game State)
  
  const [isGameOn, toggleGameOn] = useState(false)
  const [isGameOver, toggleGameOver] = useState(false)
  const [winner, setWinner] = useState('')

  const [currentValue, setCurrentValue] = useState()
  
  const [display, setDisplay] = useState('Select your weapons!')
  const [button, toggleButton] = useState(true)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [computerVisible, setComputerVisible] = useState(false);
  

  // useEffect to only start the game when the cards are dealt.
    useEffect(() => {
      if (gameState.cards.player.length) {
        toggleGameOn(true)
        
      }
    }, [gameState.cards])

  //  useEffect that checks if the game has ended
    useEffect(() => {
      if ((!gameState.cards.player.length || !gameState.cards.computer.length) && isGameOn) {
        endGame()
      }
    }, [gameState])
    
    const endGame = () => {
      toggleGameOver(true)
      setButtonDisabled(true)
      if (!gameState.cards.player.length) {
        setWinner('computer')
        setDisplay('You lost this epic battle! What a bitter defeat. Try again.')
      }
      if (!gameState.cards.computer.length) {
        setWinner('player')
        setDisplay('You won this epic battle! What a glorious triumph!')
      }
    }
    
  const handleNewGame = () => {
    startGame()
    toggleButton(true)
    setButtonDisabled(false)
    setComputerVisible(false)
    toggleGameOver(false)
    setDisplay('Select your weapons')
  }

  const handleBattle = () => {
    if (isGameOn) {
      const display = battle(currentValue)
      setDisplay(display)
      toggleButton(false)
      setComputerVisible(true)
      if (gameState.cards.player.length === 0) {
        alert('You lose!')
      } else if (gameState.cards.computer.length === 0) {
        alert('You win!')
      }
    }
  }

  const handleNextCards = () => {
    if (isGameOn) {
      nextCards()
      toggleButton(true)
      setComputerVisible(false)
      setDisplay('Select your weapons')
      return
    }
  }

// when computerCard visible text is 'Card visible', when not visible, text is : 'card not visible'.

  return (
    <div className="App">
     <div className="App__wrapper">
       <h1 className="App__heading">{}</h1>
       <div className="App__display">{display}</div>
       {isGameOver? 
       <div className="App__gameover">{winner === 'computer'? 'YOU LOST!!!!!!!!' : 'YOU WON!!!!!'}</div> :
       ''
       }
       <div className="App__characters">
         <div className="App__counter App__counter--player">
           {isGameOn? gameState.cards.player.length : '0'}
         </div>
         {isGameOn ? (
           <Card
             playerCard={true}
             character={characters.filter(character => character.fields.name === gameState.currentCard.player)}
             setCurrentValue={setCurrentValue}
             flipped={true}
           />
         ) : (
           <Card character={null} flipped={false} />
         )}
         <button
           className="App__button--battle"
           onClick={button ? handleBattle : handleNextCards}
           disabled={buttonDisabled}
         >
           {button ? "Battle" : "Next"}
         </button>
         {isGameOn ? (
           <Card
             playerCard={false}
             character={characters.filter(character => character.fields.name === gameState.currentCard.computer)}
             flipped={computerVisible? true : false}
        
           />
         ) : (
           <Card character={null} flipped={false} />
         )}
         <div className="App__counter App__counter--computer">
           {isGameOn? gameState.cards.computer.length : '0'}
         </div>
       </div>
       <button className="App__button--new-game" onClick={handleNewGame}>
         New Game
       </button>
     </div>
   </div>
 );}
 
 export default App;
 


//  ****************** Game Logic that comes from the useGame Hook****************
 
 // const [playerCards, setPlayerCards] = useState([])
 // const [computerCards, setComputerCards] = useState([])

 // const [currentCards, setCurrentCards] = useState([])
 // const [cardsDealt, setCardsDealt] = useState(false)
 
 // this useEffect triggers when the playerCards/computerCards changes. It checks if there are any cards in the 
   // playerCard and the computerCard array. It also checks if the currentCard array is empty. Only if all of these
   // conditions are true, it deals new Cards. This prevents the game from trying to deal new cards if there aren't any to deal
   // useEffect(() => {
   //   if (playerCards.length && computerCards.length && !currentCards.length) {
   //     dealNewCards()
   //     console.log(playerCards)
   //   }
   // }, [playerCards, computerCards])
 
 
   // // Shuffle Function (taken from the Internet), takes characters Array and returns a shuffled Array
   // const shuffleCards = () => {
   //    const shuffledCharacters = [...characters] //define new array that will get shuffled (goes through the list and swaps two items randomly)
   //     for (let i = shuffledCharacters.length - 1; i > 0; i--) {
   //         const j = Math.floor(Math.random() * (i + 1));
   //         [shuffledCharacters[i], shuffledCharacters[j]] = [shuffledCharacters[j], shuffledCharacters[i]];
   //     }
   //     return shuffledCharacters //gives us back the shuffled array
   // }
 
   // const dealNewCards = () => {
   //   const oldPlayerCards = [...playerCards]
   //   const playerCard = oldPlayerCards.shift() //removes the first Card from the playerCards array
   //   setPlayerCards(oldPlayerCards) //sets the new Player Card State to the array without the dealt Card
   //   const oldComputerCards = [...computerCards]
   //   const computerCard = oldComputerCards.shift() //removes the first Card from the ComputerCards array
   //   setComputerCards(oldComputerCards) //sets the new Computer Card State to the array without the dealt Card
   //   setCurrentCards([playerCard, computerCard])
   //   console.log(currentCards)
   //   setCardsDealt(true)
   // }
 
   // const startGame = () => {
   //   const shuffledCards = shuffleCards()
   //   // shuffleCards() : this function gets activated immediately
   //   // shuffleCards: this function is only a variable that stores the information of the function 
   //   // (use this if you DON'T want to activate the function but still want to share the information)
    
   //   const half = Math.ceil(shuffledCards.length / 2); 
   //   const firstHalf = shuffledCards.splice(0, half)
   //   const secondHalf = shuffledCards.splice(-half)
   //   setPlayerCards([...firstHalf])
   //   setComputerCards([...secondHalf])
   // }
 
   // const compareAttribute = () => {
   //   if (currentCards[0].fields[currentValue] > currentCards[1].fields[currentValue]) {
   //     setDisplay('You win!')
   //     setPlayerCards([...playerCards, ...currentCards])
 
   //   } else { 
   //     setDisplay('You lose!')
   //     setComputerCards([...computerCards, ...currentCards])
   //   }
    
   //   toggleButton(false)
   // };
 
   //   const nextCards = () => {
   //     if (playerCards.length && computerCards.length) {
   //       compareAttribute()
   //       return
   //     }
   //     checkWinCondition()
   //   }
 
   //   const checkWinCondition = () => {
   //     if (playerCards.length === 0) {
   //       endGame('Computer')
   //       return
   //     }
   //     if (computerCards.length === 0) {
   //       endGame('Player')
   //       return
   //     }
   //   }
 
   //   const endGame = (winner) => {
   //     if (winner === 'Player') {
   //       setDisplay('Congratulations. What a glorious win!')
   //     }
   //     if (winner === 'Computer') {
   //       setDisplay('A bitter defeat. Try again.')
   //     }
   //     setPlayerCards([])
   //     setComputerCards([])
   //     setCurrentCards([])
   //   }
 
   //   const newCards = () => {
   //     dealNewCards()
   //     toggleButton(true)
   //   }
