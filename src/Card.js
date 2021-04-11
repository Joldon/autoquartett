import React, { useState } from 'react'
import './Card.css'

function Card({character, flipped, setCurrentValue, playerCard}) {

  const attributes = ['Height', 'Strength', 'Age', 'IQ', 'Funnyness']
  const [selectedAttribute, setSelectedAttribute] = useState('')

  const [isActive, setActive] = useState (false);

const toggleClass = (evt) => {
  if (playerCard) {
    setActive(!isActive);
    setSelectedAttribute(evt.target.getAttribute('stat'))
    setCurrentValue(evt.target.getAttribute('stat'))
  }
}


    if (!flipped) {
        return <div className="Character bgr--black"></div>
    } else {
        return (
      
  <div className="Character">
    <div className="Character__name">
      {character[0].fields.name}
    </div>
    <img className="Character__picture" src={`https:${character[0].fields.picture.fields.file.url}`} width='250' height='250' alt='characters'></img>
    
    
    {attributes.map((attribute) => <div 
      onClick={toggleClass} 
      stat={attribute.toLowerCase()}// e.g. 'height'
      className={`Character__attr ${selectedAttribute === attribute.toLowerCase() ? 'Character__attr--active': null}`}
      >{attribute}: {character[0].fields[attribute.toLowerCase()]}
      </div> )}

  </div>

    )
 }
} 

export default Card