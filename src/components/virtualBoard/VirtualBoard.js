import React, { useContext, useEffect, useRef, useState } from 'react'
import { figureContext } from '../../context/FigureContext';
import { penContext } from '../../context/PenContex';
import { addFigure } from '../../helpers/addFigure';
import { addText } from '../../helpers/addText';
import { ToolBar } from '../toolBar/ToolBar';
import '../virtualBoard/VirtualBoard.css'

export const VirtualBoard = () => {

  const {penState, setUserAction} = useContext(penContext);
  const {figureState, changeIsAddingFigure} = useContext(figureContext);

  const rootContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [addFigureActive, setAddFigureActive] = useState(figureState.figureSelected);


  useEffect(() => {

    // create canvas part
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    // context part
    const context = canvas.getContext('2d');
    context.scale(2,2);
    context.lineCap = 'round';
    context.strokeStyle = penState.color;
    context.lineWidth = penState.weight;
    contextRef.current = context;

  }, []);


  useEffect(() => {

    if (penState.action.toString() === 'text') {

      rootContainerRef.current.style.cursor = 'text'

    }else if(penState.action.toString() === 'figures'){

      rootContainerRef.current.style.cursor = 'grabbing'

    }else{
      rootContainerRef.current.style.cursor = 'default'
    }
    
  }, [penState.action])


  useEffect(() => {
    contextRef.current.strokeStyle = penState.color
  }, [penState.color])
  
  useEffect(() => {
    contextRef.current.lineWidth = penState.weight
  }, [penState.weight])

  useEffect(() => {
    contextRef.current.strokeStyle = penState.color
  }, [penState.isHighlighter])
  

  const startDrawing = ({nativeEvent}) => {

    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    
  }

  const stopDrawing = () => {
    setIsDrawing(false);
  }

  const draw = ({nativeEvent}) => {

    if (!isDrawing || penState.addText) {
      return
    }
    const {offsetX, offsetY} = nativeEvent;

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  const mobileDraw = (e) => {
    if (!isDrawing || penState.addText) {
      return;
    }
    if (e.targetTouches.length > 1) {
      return;
    }
    contextRef.current.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    contextRef.current.stroke();
    
  }

  // toolbar functions ================================================================================================================ 
  const resetCanvas = () => {   
    contextRef.current.clearRect(0, 0, canvasRef.current.width,  canvasRef.current.height);
    setUserAction('pen');
  }

  const activateEraser = () => {
    setUserAction('eraser');
    contextRef.current.strokeStyle = 'white'
  }

  const activatePen = () => {
    setUserAction('pen');
    contextRef.current.strokeStyle = penState.color
  }

  
  return (
    <div ref={rootContainerRef} id='root-container' className='container'>

      <canvas id='draw-canvas' 
              ref={canvasRef} 
              onClick={(e)=>{ 
                              addText(e, penState, canvasRef, setUserAction, rootContainerRef, setIsDrawing)
                              addFigure(  e, 
                                          figureState, 
                                          canvasRef, 
                                          changeIsAddingFigure, 
                                          setAddFigureActive, 
                                          addFigureActive, 
                                          figureState.figure, 
                                          setUserAction, 
                                          penState.action,  
                                          rootContainerRef,
                                          setIsDrawing
                                        )
                      }} 
              onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw}
              onPointerDown={startDrawing} onPointerUp={stopDrawing} onTouchMove={mobileDraw}
      />
      

      <ToolBar reset={resetCanvas}
               activateEraser={activateEraser}
               activatePen={activatePen}
               addFigureActive={addFigureActive}
               setAddFigureActive={setAddFigureActive}
               setUserAction={setUserAction}
      />

    </div>
  )
}
