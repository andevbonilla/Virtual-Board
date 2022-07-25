import React, { useContext, useState } from 'react'
import '../penMenu/PenMenu.css'
import { FaHighlighter, FaRegTimesCircle } from 'react-icons/fa';
import { MdLineWeight } from 'react-icons/md';
import { penContext } from '../../context/PenContex';


export const PenMenu = ({ isActive, setActive}) => {

  const {penState, changePenColor, changePenWeight, setIsHighlighter } = useContext(penContext);

  // pen values
  const [pencolor, setPencolor] = useState(penState.color);
  const [penThickness, setPenThickness] = useState(penState.weight);
  const [isActiveHighlighter, setIsActiveHighlighter] = useState(penState.isHighlighter);


  const [isWeightMenuActive, setIsWeightMenuActive] = useState(false);


  const changeColor = (e) => {
    setPencolor(e.target.value);
    changePenColor(e.target.value);
    setIsActiveHighlighter(false);
      setIsHighlighter(false);
  }

  const changeThickness = (e) => {
    if (parseInt(e.target.value) > 220 || parseInt(e.target.value) < 1) {
      return;
    }
    setPenThickness(e.target.value);
    changePenWeight(parseInt(e.target.value));
  }

  const changeHighlighterMode = () => {

      setIsActiveHighlighter(!isActiveHighlighter);
      setIsHighlighter(!isActiveHighlighter);

      let r = parseInt(penState.color.slice(1, 3), 16),
      g = parseInt(penState.color.slice(3, 5), 16),
      b = parseInt(penState.color.slice(5, 7), 16);

      if (!isActiveHighlighter === true) {
          
        changePenColor("rgba(" + r + ", " + g + ", " + b + ", " + 0.1 + ")");

      }else{

        changePenColor(pencolor);

      }
        
  }



  if (!isActive) {
    return
  }

  return (
    <>
        {
          isWeightMenuActive && <div className='weight-menu'>

                                    <button onClick={()=>{setIsWeightMenuActive(false)}}>
                                        <FaRegTimesCircle />
                                    </button>

                                    <>

                                        <input value={penThickness} 
                                               onChange={(e)=>{ changeThickness(e) }} 
                                               type='number' 
                                               placeholder='Thickness' 
                                               min={1} 
                                               max={220} />                                        

                                    </>


                                </div>
        }
        
        <div className='sub-menu button-container' id='button-container'>

            <button onClick={()=>{setActive(false)}}>
                <FaRegTimesCircle />
            </button>

            <>
                
                <input className='color-input' type='color' value={pencolor} onChange={(e)=>changeColor(e)} />

                <button onClick={()=>{setIsWeightMenuActive(true)}}>
                  <MdLineWeight />
                </button>

                <button onClick={changeHighlighterMode} className={(isActiveHighlighter) ? 'is-active' : ''}>
                    <FaHighlighter />
                </button>


            </>


        </div>

    </>

  )
}
