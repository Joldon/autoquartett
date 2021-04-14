import { useReducer} from 'react'

function useGame(characters) {

    // This is our initial game state. We only need the cards for player and computer and the currently dealt card.
    // Everything else can be derived from this game state (game end, score, winner of the round)
    const initialState = {
        cards : {
            player : [],
            computer: []
        },
        currentCard : {
            player: '',
            computer: ''
        }
    }

    // This is our reducer function, the only place where we actually change our state. It takes a user action and turns it
    // into a change of the state.
    function reducer(state, action) {
        switch(action.type) {
            case 'new game':
                return {...state, 
                    cards: 
                    {
                    player: [...action.payload.cards[0]], 
                    computer:[...action.payload.cards[1]]
                    }, 
                    currentCard: 
                    {
                    player: action.payload.currentCards[0], 
                    computer:action.payload.currentCards[1]
                    }
                }
            case 'battle':
                return {...state, 
                    cards: 
                    {
                    player: [...action.payload.newCards[0]], 
                    computer:[...action.payload.newCards[1]]
                    },
                    playerWins: action.payload.playerWins
                };
            case 'next card':
                return {...state,
                    currentCard: 
                        {
                        player: action.payload.newPlayerCard, 
                        computer: action.payload.newComputerCard
                        },
                    }
            default:
                return state
        }
    }

    // Here we are simply putting intial State and reducer function together in React's useReducer Hook.
    // We get the current state as a variable and the dispatch function that we use to send the user action to the reducer function
    const [state, dispatch] = useReducer(reducer, initialState)

    

// ********************* NEW GAME ACTION *********************

    // This function initiates the new game. It shuffles the cards from COntenful and splits them into two piles
    // Then it deals the two currentCards. The dispatch function takes the action type 'new game'
    // and it changes the initial State to the state with the new cards.
    const newGame = () => {
        const characterNames = characters.map(character => character.fields.name)
        const shuffledCards = shuffleCards(characterNames);
        const [playerCards, computerCards] = splitCards(shuffledCards)
        const [currentPlayerCard, currentComputerCard] = dealNewCards(playerCards, computerCards)
        dispatch({type: 'new game', payload: {
            cards: [playerCards, computerCards],
            currentCards: [currentPlayerCard, currentComputerCard]
        }})
   
        return true // we return true here because on the App.js level this will tell us that the game has started.
    }

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
        return [firstHalf, secondHalf]
    };

    const dealNewCards = (playerCards, computerCards) => {
        const shuffledPlayerCards = shuffleCards(playerCards)
        const shuffledComputerCards = shuffleCards(computerCards)
        return [shuffledPlayerCards[0], shuffledComputerCards[0]];
    };
    

    // *********************BATTLE FUNCTION**************************
    
    // this function takes the selected Attribute and updates the score in the state according to the result.
    const battle = (currentValue) => {
        const currentPlayerCard = characters.find(character => character.fields.name === state.currentCard.player )
        const currentComputerCard = characters.find(character => character.fields.name === state.currentCard.computer )
        // now we can check for the win condition. The dispatch payload needs only a boolean if the player wins or loses
        
        if (currentPlayerCard.fields[currentValue] > currentComputerCard.fields[currentValue]) {
            const newPlayerCards = [...state.cards.player]
            newPlayerCards.push(state.currentCard.computer)
            const newComputerCards = [...state.cards.computer]
            const filteredComputerCards = newComputerCards.filter(card => card !== state.currentCard.computer)
            dispatch({type: 'battle', payload: {
                newCards: [newPlayerCards, filteredComputerCards]
                }
            })
            console.log(currentPlayerCard)
            return `${currentPlayerCard.fields[currentValue]} : ${currentComputerCard.fields[currentValue]}`
        }
        if (currentPlayerCard.fields[currentValue] <= currentComputerCard.fields[currentValue]) {
            const newPlayerCards = [...state.cards.player]
            const filteredPlayerCards = newPlayerCards.filter(card => card !== state.currentCard.player)
            const newComputerCards = [...state.cards.computer]
            newComputerCards.push(state.currentCard.player)
            dispatch({type: 'battle', payload: {
                newCards: [filteredPlayerCards, newComputerCards]
                }
            })
            console.log(currentPlayerCard)
            return `${currentPlayerCard.fields[currentValue]} : ${currentComputerCard.fields[currentValue]}`
        }
    };
      
    // ****************************NEXT CARD ACTION***********************

    const nextCards = () => {
        const [newPlayerCard, newComputerCard] = dealNewCards(state.cards.player, state.cards.computer)
        dispatch({type: 'next card', payload: {
            newPlayerCard: newPlayerCard, 
            newComputerCard: newComputerCard,
            }
        })
        }



    return [state, newGame, battle, nextCards]
}

export default useGame
