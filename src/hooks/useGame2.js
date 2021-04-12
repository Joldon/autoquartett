import { useReducer} from 'react'

function useGame2(characters) {

    // let's try this with useReducer
    const initialState = {
        gameOn: false,
        cards : {
            player : [],
            computer: []
        },
        currentCard : {
            player: '',
            computer: ''
        },
        playerWins: false,
    }


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
                    },
                    score: 
                    {
                        player: characters.length / 2,
                        computer: characters.length / 2
                    },
                    gameOn: true
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

    const [state, dispatch] = useReducer(reducer, initialState)

    

// ********************* NEW GAME ACTION *********************

    const newGame = () => {
        const characterNames = characters.map(character => character.fields.name)
        const shuffledCards = shuffleCards(characterNames);
        const [playerCards, computerCards] = splitCards(shuffledCards)
        const [currentPlayerCard, currentComputerCard] = dealNewCards(playerCards, computerCards)
        dispatch({type: 'new game', payload: {
            cards: [playerCards, computerCards],
            currentCards: [currentPlayerCard, currentComputerCard]
        }})
   
        return true
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
        const currentPlayerCard = characters.filter(character => character.fields.name === state.currentCard.player )
        const currentComputerCard = characters.filter(character => character.fields.name === state.currentCard.computer )
        // now we can check for the win condition. The dispatch payload needs only a boolean if the player wins or loses
        
        if (currentPlayerCard[0].fields[currentValue] > currentComputerCard[0].fields[currentValue]) {
            const newPlayerCards = [...state.cards.player]
            newPlayerCards.push(state.currentCard.computer)
            const newComputerCards = [...state.cards.computer]
            const filteredComputerCards = newComputerCards.filter(card => card !== state.currentCard.computer)
            dispatch({type: 'battle', payload: {
                newCards: [newPlayerCards, filteredComputerCards]
                },
                playerWins: true
            })
            console.log(currentPlayerCard)
            return `${currentPlayerCard[0].fields[currentValue]} : ${currentComputerCard[0].fields[currentValue]}`
        }
        if (currentPlayerCard[0].fields[currentValue] <= currentComputerCard[0].fields[currentValue]) {
            const newPlayerCards = [...state.cards.player]
            const filteredPlayerCards = newPlayerCards.filter(card => card !== state.currentCard.player)
            const newComputerCards = [...state.cards.computer]
            newComputerCards.push(state.currentCard.player)
            dispatch({type: 'battle', payload: {
                newCards: [filteredPlayerCards, newComputerCards]
                },
                playerWins: false
            })
            console.log(currentPlayerCard)
            return `${currentPlayerCard[0].fields[currentValue]} : ${currentComputerCard[0].fields[currentValue]}`
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

export default useGame2
