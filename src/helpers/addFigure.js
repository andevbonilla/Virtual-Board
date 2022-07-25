import { addFigureMenu } from "./addFigureMenu";
import { dragElement } from "./dragElement";
import { mobileDragElement } from "./mobileDragElement";

export const addFigure = ({nativeEvent}, 
                          figureState, 
                          canvasRef, 
                          changeIsAddingFigure, 
                          setAddFigureActive, 
                          addFigureActive, 
                          figureType, 
                          setUserAction, 
                          penAction, 
                          rootContainerRef,
                          setIsDrawing
                          ) => {

    if (!figureState.figureSelected || penAction !== 'figures') {
        return;
    }

    const {offsetX, offsetY} = nativeEvent;
    const rootElement = document.getElementById('root-container');  
    let rotating = false;  

    // dad
    const containerElement = document.createElement('div');
    // containerElement.draggable = true;
    containerElement.style.top = `${offsetY}px`;
    containerElement.style.left = `${offsetX}px`;
    containerElement.className = 'float-figure';
    containerElement.id = 'draggable-element'
    rootElement.appendChild(containerElement);

    // options menu
    const menuOptionsElement = document.createElement('div');
    menuOptionsElement.className = 'menu-container';
    menuOptionsElement.style.display = 'none';
    menuOptionsElement.innerHTML = addFigureMenu;


    // delete text
    const deleteAllElement = menuOptionsElement.childNodes[5];
    deleteAllElement.addEventListener('click', (e)=> {containerElement.remove()});

    // editable text

    const svgCode = (code, size) => {
      return (
                                   `<svg stroke="#FF8300" 
                                        fill="#FF8300" 
                                        stroke-width="0" 
                                        viewBox="0 0 16 16" 
                                        height="${size}rem" 
                                        width="${size}rem" 
                                        xmlns="http://www.w3.org/2000/svg">
                                              <path fill-rule="evenodd" 
                                                    d="${code}">
                                              </path>
                                    </svg>`
      )
    }

    const editableElement = document.createElement('div');
    editableElement.className = 'float'
    if (figureType === 'heart') {

      editableElement.innerHTML = svgCode('M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z', 10)

    }else if(figureType === 'triangle'){


      editableElement.innerHTML = svgCode('M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z', 10)

    }else{

      editableElement.className = `f${figureType} float`;

    }

    
    // change figure color
    const changeFigureColor = menuOptionsElement.childNodes[1];
    changeFigureColor.addEventListener('change', (e)=>{

      if(figureType === 'heart' || figureType === 'triangle'){

        editableElement.childNodes[0].setAttribute("fill", `${e.target.value}`)
        editableElement.childNodes[0].setAttribute("stroke", `${e.target.value}`)

      }else{
        editableElement.style.backgroundColor = e.target.value
      }
      
    })
    
    // change figure size
    const changeFigureSize = menuOptionsElement.childNodes[3];
    changeFigureSize.addEventListener('change', (e)=>{

      if(figureType === 'heart' || figureType === 'triangle'){

        editableElement.childNodes[0].setAttribute("width", `${e.target.value}`)
        editableElement.childNodes[0].setAttribute("height", `${e.target.value}`)

      }else{
        editableElement.style.width = `${e.target.value}px`
        editableElement.style.height = `${e.target.value}px`
      }

    })


    // add the editable element to the container
    containerElement.appendChild(editableElement);
    
    // rotate function
    editableElement.style.transform = `rotate(${0}deg)`;

    // this create the dot in the center
    const centerOfeditableElement = document.createElement('div');
    centerOfeditableElement.className = 'center-dot';
    editableElement.appendChild(centerOfeditableElement);

    // create the rotate button
    const rotateButton = document.createElement('div');
    rotateButton.innerHTML = `
                              <button>
                                    <svg stroke="currentColor" 
                                         fill="none" 
                                         stroke-width="3" 
                                         viewBox="0 0 24 24" 
                                         stroke-linecap="round" 
                                         stroke-linejoin="round" 
                                         height="1.5rem" 
                                         width="1.5rem" 
                                         xmlns="http://www.w3.org/2000/svg">
                                         
                                            <polyline points="1 4 1 10 7 10">
                                            </polyline>
                                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10">
                                            </path>
                                            
                                      </svg>
                              </button>
                               
                             `
    rotateButton.className = 'rotate-div';
    rotateButton.style.display = 'none';

    // drag and drop functionality  
    const mouseUpRotateCondition = (boolean) =>{
      rotating = boolean;
      if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)){
              mobileDragElement(editableElement, menuOptionsElement, 'no-clicks', boolean, rotateButton, undefined);

      }else{
              dragElement(editableElement, menuOptionsElement, 'no-clicks', boolean, rotateButton, undefined);
      }
    }
    mouseUpRotateCondition(rotating);

    // display the menu and rotate button
    editableElement.onclick = (e) => {
      menuOptionsElement.style.display = 'flex';
      rotateButton.style.display = 'flex';
    }


    // button to rotate the element ===========================================================================================
    let grades = 0;
    // on click the rotate
    rotateButton.childNodes[1].addEventListener('click', (e)=>{

      grades += 45;
      editableElement.style.transform = `rotate(${grades}deg)`;

      if (grades > 360) {
        grades = 45;
      }
      console.log(grades)

    })

    // on mouse down
    let rotateLayer;
    rotateButton.childNodes[1].addEventListener('mousedown', (e)=>{
      rootContainerRef.current.style.cursor = 'move';

      rotateLayer = document.createElement('div');
      rotateLayer.className = 'rotate-layer'; 
      rootContainerRef.current.appendChild(rotateLayer);

      setIsDrawing(false);
      mouseUpRotateCondition(true);
    })
    rotateButton.childNodes[1].addEventListener('pointerdown', (e)=>{
      setIsDrawing(false);
      mouseUpRotateCondition(true);
    })

    // calulate the angle of the figure
    const calculateTheAngle = (mousex, mousey) => {


        let center = centerOfeditableElement.getBoundingClientRect();
        let co = mousex - center.x;
        let ca = mousey - center.y;
  
        // co / ca          

        if (Math.sign(co) === -1 && Math.sign(ca) === 1) {

          let co = mousex - center.x;
          let ca = mousey - center.y;

          let result = Math.atan(Math.abs(co) / Math.abs(ca));
          let grados = result * (180 / Math.PI)
  
          editableElement.style.transform = `rotate(${grados}deg)`;

        }else if(Math.sign(co) === -1 && Math.sign(ca) === -1){

          let ca = mousex - center.x;
          let co = mousey - center.y;

          let result = Math.atan(Math.abs(co) / Math.abs(ca));
          let grados = result * (180 / Math.PI)
  
          editableElement.style.transform = `rotate(${grados+90}deg)`;

        }else if(Math.sign(co) === 1 && Math.sign(ca) === -1){

          let ca = mousex - center.x;
          let co = mousey - center.y;

          let result = Math.atan(Math.abs(co) / Math.abs(ca));
          let grados = result * (180 / Math.PI)
  
          editableElement.style.transform = `rotate(${-(grados+90)}deg)`;

        }else{

          let co = mousex - center.x;
          let ca = mousey - center.y;

          let result = Math.atan(Math.abs(co) / Math.abs(ca));
          let grados = result * (180 / Math.PI)
  
          editableElement.style.transform = `rotate(${-grados}deg)`;


        }
  
    }

    // when rotaing is active
    rootContainerRef.current.addEventListener('mousemove', (e) => {

      if (rotating) {
        calculateTheAngle(e.offsetX, e.offsetY)
      }  
      
    })
    rootContainerRef.current.addEventListener('touchmove', (e) => {

      if (rotating) {
        calculateTheAngle(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
      }  
      
    })

    // on mouse up
    rootContainerRef.current.addEventListener('mouseup', (e)=>{
      rootContainerRef.current.style.cursor = 'default';

      rotateLayer.remove();

      mouseUpRotateCondition(false);
    })
    rootContainerRef.current.addEventListener('pointerup', (e)=>{
      mouseUpRotateCondition(false);
    })


    // hide the config menus
    canvasRef.current.addEventListener('click', (e)=> {

      rootElement.childNodes.forEach(e=>{

          if (e.className.toString() === 'float-figure') {
            
             e.childNodes[1].style.display = 'none'
             rotateButton.style.display = 'none';

          }

         
       })

     });


    editableElement.appendChild(rotateButton);
    containerElement.appendChild(menuOptionsElement);

    setUserAction('pen');
    changeIsAddingFigure();
    setAddFigureActive(!addFigureActive);

}