import React, { useContext } from 'react'
import { BsCircle, BsTriangle, BsSquare, BsHeart } from 'react-icons/bs';
import { FaRegTimesCircle } from 'react-icons/fa';
import { figureContext } from '../../context/FigureContext';
import { penContext } from '../../context/PenContex';

export const FiguresMenu = ({ isActive, setActive}) => {

   const {figureState, changeFigure} =  useContext(figureContext)
   const {penState, setUserAction} =  useContext(penContext)

  if (!isActive) {
      return
  }

  const changeFigureState = (figure) => {
    setUserAction('figures');
    changeFigure(figure);
  }

  const classCondition = (figure) => {
    return (figureState.figure === figure && penState.action === 'figures') ? 'is-active' : ''
  }

  return (
    <>

        <div className='sub-menu button-container' id='button-container'>

            <button onClick={()=>{setActive(false)}}>
                <FaRegTimesCircle />
            </button>


            <button className={classCondition('circle')} onClick={()=>changeFigureState('circle')}>
                <BsCircle />
            </button>

            <button className={classCondition('triangle')} onClick={()=>changeFigureState('triangle')}>
                <BsTriangle />
            </button>
            
            <button className={classCondition('square')} onClick={()=>changeFigureState('square')}>
                <BsSquare />
            </button>

            <button className={classCondition('heart')} onClick={()=>changeFigureState('heart')}>
                <BsHeart />
            </button>

        </div>
            
    </>
  )
}
