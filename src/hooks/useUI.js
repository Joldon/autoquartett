import { useReducer } from 'react'

function useUI() {
    
    // the initial UI State at the start of the game.

    const initialState = {
        display: 'Start your epic battle',
        showBattleButton: true,
        disableButton: true,
        showComputerCard: false,
    }
  
    // this function takes a user action and updates the UI state accordingly
    function reducer(state, action) {
        switch(action.type) {
            case 'new game':
                return {
                    ...state,
                    showBattleButton: true,
                    disableButton: false,
                    showComputerCard: false,
                    display: 'Select your weapons'
                }
            case 'battle':
                return {
                    ...state,
                    showBattleButton: false,
                    showComputerCard: true,
                    display: action.payload //this means that we can pass a value into the state.
                }
            case 'next cards':
                return {
                    ...state,
                    showBattleButton: true,
                    showComputerCard: false,
                    display: 'Select your weapons'
                }
            case 'game over':
                return {
                    ...state,
                    disableButton: true,
                    display: action.payload
                }
            default:
                return state
        }
    }

    // this ties our intial State and our reducer function together and gives us the current state and a dispatch function
    const [state, dispatch] = useReducer(reducer, initialState)
    
    return [state, dispatch]
}

export default useUI