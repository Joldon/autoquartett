import React, { useState } from 'react'
import './Card.css'

function Card({character, flipped, setCurrentValue}) {

const [isActive, setActive] = useState (false);


const toggleClass = (evt) => {
  setActive(!isActive);
  setCurrentValue(evt.target.getAttribute('stat'))
}


//function that compares the selected attributes of the current Cards

// INformation we need from the select: Attribute and Value 'height' => character.fields['height']
// 

    if (!flipped) {
        return <div className="Character bgr--black"></div>
    } else {
        return (
      
  <div className="Character">
    <div className="Character__name">{character.fields.name}</div>
    <img className="Character__picture" src={`https:${character.fields.picture.fields.file.url}`} width='250' height='250' alt='characters'></img>
    <div className={`Character__attr Character__height ${isActive ? 'Character__attr--active': null}`} 
    stat='height'
    onClick={toggleClass}>Height: {character.fields.height}</div>
    <div className={`Character__attr Character__strength`}>Strength: {character.fields.strength}</div>
    <div className="Character__attr Character__age">Age: {character.fields.age}</div>
    <div className="Character__attr Character__iq">IQ: {character.fields.iq}</div>
    <div className="Character__attr Character__funniness">Funniness: {character.fields.funnyness}</div>
  </div>

    )
 }
} 

export default Card