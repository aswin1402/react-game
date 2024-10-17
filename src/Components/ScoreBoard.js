import React from 'react'
import "./ScoreBoard.css"

export const ScoreBoard =({scores,xplaying})  => {
    const {xScore,oScore} =scores;
  return (
    <div className='scoreboard'>
        <span className={`score x-score ${!xplaying && "inactive"}`}>RED-{xScore}</span>
        <span  className={`score o-score ${xplaying && "inactive"}`}>GREEN-{oScore}</span>
     
    </div>
  )
}
