import React, { useContext, useState } from 'react'
import '../toolBar/ToolBar.css'

import { FaPen, FaEraser } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { BsTriangle, BsFillQuestionCircleFill } from 'react-icons/bs';
import { RiText } from 'react-icons/ri';

import { PenMenu } from '../penMenu/PenMenu';
import { FiguresMenu } from '../figuresMenu/FiguresMenu';
import { penContext } from '../../context/PenContex';


export const ToolBar = ({reset, activateEraser, activatePen, setUserAction}) => {

  const {penState} = useContext(penContext);

  const [penMenuActive, setPenMenuActive] = useState(false);  
  const [figuresMenuActive, setFiguresMenuActive] = useState(false); 

  const createInput = () => {
    setUserAction('text');
  }

  const classCondition = (penAction) => {
    return (penState.action === penAction) ? 'is-active' : '';
  }
  

  return (
    <>
    
          <PenMenu isActive={penMenuActive} setActive={setPenMenuActive} />

          <FiguresMenu isActive={figuresMenuActive} setActive={setFiguresMenuActive} />
          
          <div className='tool-bar button-container' id='button-container'>

              <button className={classCondition('pen')} onClick={()=>{
                setPenMenuActive(true)
                activatePen()
              }}>
                <FaPen />
              </button>

              <button className={classCondition('eraser')} onClick={()=>{
                activateEraser()
              }}>
                <FaEraser />
              </button>

              <button className={classCondition('figures')} onClick={()=>{
                setFiguresMenuActive(true)
              }}>
                <BsTriangle />
              </button>

              <button className={classCondition('text')}
                      onClick={createInput}
              >
                <RiText />
              </button>

              <button onClick={reset}>
                <GrPowerReset />
              </button>

              <a href='https://andevbonilla.com' target="_BLANCK"><BsFillQuestionCircleFill /></a>

          </div>

    </>
  )
}
