import {useState, useEffect } from 'react'

function useGame(characters) {
  
    // ******************* GAME STATES ******************


  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);

  const [currentCards, setCurrentCards] = useState([]);
  const [cardsDealt, setCardsDealt] = useState(false);

  const [currentScore, setCurrentScore] = useState({
    player: 0,
    computer: 0,
  });

  const [isGameOver, toggleGameOver] = useState(false);


  // ******************** START NEW GAME ***********************

  useEffect(() => {
    if (characters.length) {
        const characterNames = characters.map(character => character.fields.name)
        const shuffledCards = shuffleCards(characterNames);
        setCharacterNames(shuffledCards)
        splitCards(characterNames);
        console.log(characters)
    }
  }, [characters, ])


  // useEffect to prevent States from overlapping. checks if there are any playerCards or computerCards 
  // and if the current Cards haven't been dealt yet. Only then we deal new Cards.
    useEffect(() => {
        // if (playerCards.length && computerCards.length && !currentCards.length) {
        //     dealNewCards();
        //     return
        // }
        if ((!playerCards.length || !computerCards.length)) {
            toggleGameOver(true)
        }
    }, [playerCards, computerCards, currentCards]);

  
  // Function that shuffles the cards for us. It uses a shuffle algorithm and returns the shuffled array.
    const shuffleCards = (cards) => {
        for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [
            cards[j],
            cards[i],
        ];
        }
        return cards; //gives us back the shuffled array (which contains only the characters name)
    };

    // Function that splits the card pile into two of equal length using the splice method.
    const splitCards = (shuffledCards) => {
        const half = Math.ceil(shuffledCards.length / 2);
        const firstHalf = shuffledCards.splice(0, half);
        const secondHalf = shuffledCards.splice(-half);
        setPlayerCards([...firstHalf]);
        setComputerCards([...secondHalf]);
    };

    // Function that initializes a new game.
    const startGame = () => {
        const characterNames = characters.map(character => character.fields.name)
        const shuffledCards = shuffleCards(characterNames);
        splitCards(shuffledCards);
        dealNewCards()
        
    };

    // Function that deals the new Cards from the player and the computer pile.
    const dealNewCards = () => {
        const shuffledPlayerCards = shuffleCards(playerCards)
        const shuffledComputerCards = shuffleCards(computerCards)
        setCurrentCards([shuffledPlayerCards[0], shuffledComputerCards[0]]);
        setCardsDealt(true);
        console.log(currentCards)
    };

  // ***************************** GAME ROUND MECHANICS **********************

    // this function gets triggered when the Battle BUtton gets clicked.
    const battle = (attribute) => {
        return compareAttribute(attribute)  
    }
    
    // comparing the selected attribute for the current Cards
    const compareAttribute = (currentValue) => {
        const currentAttributes = characters.filter(character => currentCards.includes(character.fields.name))
        
        let playerWins = true
        if (currentAttributes[0].fields[currentValue] > currentAttributes[1].fields[currentValue]) {
            
            setPlayerCards([...playerCards, ...currentCards]);
        }
        if (currentAttributes[0].fields[currentValue] <= currentAttributes[1].fields[currentValue]) {
            setComputerCards([...computerCards, ...currentCards]);
            playerWins = false
        }
        calculateScore()
        return playerWins
    };
    
    //this function simply sets the state of the score to the new value.
    const calculateScore = () => {
        setCurrentScore({
            player: playerCards.length + 1,
            computer: computerCards.length + 1
        })
    }

    //this function checks if the game is over. If not it deals new Cards.
    const nextCards = () => {
        if (playerCards.length && computerCards.length) {
            dealNewCards();
            return;
        }
        toggleGameOver(true);
        endGame()
    };
    
    // ***************************** END OF GAME MECHANICS **********************
    
    const endGame = () => {
        setPlayerCards([]);
        setComputerCards([]);
        setCurrentCards([]);
    };

  return [startGame, currentCards, cardsDealt, battle, nextCards, currentScore, isGameOver];
}

export default useGame
