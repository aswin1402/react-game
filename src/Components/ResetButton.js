import React from 'react'
import "./RestButton.css"
export const ResetButton =({resetBoard})=> {
  return (
    <div>
    <button className='reset-btn ' onClick={resetBoard}> Reset</button>
    </div>
  )
}
