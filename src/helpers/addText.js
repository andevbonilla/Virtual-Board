import { addTextMenu } from "./addTextMenu";
import { dragElement } from "./dragElement";
import { mobileDragElement } from "./mobileDragElement";

export const addText = ({nativeEvent}, penState, canvasRef, setUserAction, rootContainerRef, setIsDrawing) => {

    if (penState.action !== 'text') {
      return;
    }
    
    const {offsetX, offsetY} = nativeEvent;
    const rootElement = document.getElementById('root-container');
    let rotating = false;
    let clicks = 0;

    // dad
    const containerElement = document.createElement('div');
    // containerElement.draggable = true;
    containerElement.style.top = `${offsetY}px`;
    containerElement.style.left = `${offsetX}px`;
    containerElement.className = 'float-element';
    containerElement.id = 'draggable-element'
    rootElement.appendChild(containerElement);
    
    // options menu
    const menuOptionsElement = document.createElement('div');
    menuOptionsElement.className = 'menu-container';
    menuOptionsElement.style.display = 'none';
    menuOptionsElement.innerHTML = addTextMenu;

    const fonstContainer = menuOptionsElement.childNodes[11];
    let FonstsListisDisplay = false;
    fonstContainer.style.display = 'none';

    // change font
    const changeFontButton = menuOptionsElement.childNodes[1];

    // change size
    const inputFontSize = menuOptionsElement.childNodes[3];

    // change color
    const inputChangeColor = menuOptionsElement.childNodes[5];

    // change to bold
    const changeFontWeight = menuOptionsElement.childNodes[7];

    // delete text
    const deleteAllElement = menuOptionsElement.childNodes[9];

    deleteAllElement.addEventListener('click', (e)=> {containerElement.remove()});

    // toggle of the fonts menu
    const showAndHideFonstContainer = () => {
      fonstContainer.style.display = (FonstsListisDisplay) ? 'none' : 'flex';
      FonstsListisDisplay = !FonstsListisDisplay;
    }

    const changeFont = (textContent, font) => {
      textAreaElement.style.fontFamily = font; 
      changeFontButton.textContent = textContent;
      changeFontButton.style.fontFamily = font;
      showAndHideFonstContainer();
    }

    changeFontButton.addEventListener('click', (e)=> {
      showAndHideFonstContainer();
    })
    
    // editable text
    const editableElement = document.createElement('div');

    const textAreaElement = document.createElement('textarea');
    textAreaElement.placeholder = 'Type something'
    textAreaElement.className = 'text-area';
    textAreaElement.style.fontSize = '14px';
    textAreaElement.autocomplete = false;
    textAreaElement.setAttribute('readonly', 'readonly');

    
          // set the size of the textarea
          let TextAreaColsAndRows = [0];
          let colCharacters = 0;
          let TextCols = 0;
          let TextRows = 2;

          textAreaElement.setAttribute('rows', TextRows);
          textAreaElement.setAttribute('cols', TextCols);

          textAreaElement.addEventListener('keydown', (e)=>{ 

            if (!e.code.includes('Key')) {
              if (!e.code.includes('Digit')) {
                if (!e.code.includes('Enter')) {
                  if (!e.code.includes('Space')) {
                    if (!e.code.includes('Backspace')) {
                      return;
                    }
                  }
                }
              }
            }

            // create the array that represents the textarea
            if (e.code.toString() !== 'Enter') {

              if (e.code.toString() === 'Backspace') {
                return;
              }

              colCharacters += 1;
              TextAreaColsAndRows[TextAreaColsAndRows.length-1] = colCharacters;

            }else{

              TextAreaColsAndRows.push(0);
              colCharacters = 0;

            }

            // obtain the largest column of the textarea
            let biggestNum = 0;
            for (let i = 0; i < TextAreaColsAndRows.length; i++) {
              if (biggestNum < TextAreaColsAndRows[i]) {
                biggestNum = TextAreaColsAndRows[i]
              }
            }

            // set the size of the textarea
            if (biggestNum+2 > 20) {
              textAreaElement.setAttribute('cols', biggestNum+1);
            }            
            textAreaElement.setAttribute('rows', TextAreaColsAndRows.length);

          })
      

    
    editableElement.appendChild(textAreaElement);
    editableElement.className = 'editable-element'
    editableElement.style.cursor = 'default';


    // change color text
    inputChangeColor.addEventListener('change', (e)=>{
      textAreaElement.style.color = e.target.value
    })

    // fonts buttons

    fonstContainer.childNodes[1].addEventListener('click', (e)=> changeFont('Arial', 'arial'))

    fonstContainer.childNodes[3].addEventListener('click', (e)=> changeFont('Lobster', 'lobster'))

    fonstContainer.childNodes[5].addEventListener('click', (e)=> changeFont('Calibri', 'calibri'))

    fonstContainer.childNodes[7].addEventListener('click', (e)=> changeFont('Times New Roman', 'times-new-roman'))

    fonstContainer.childNodes[9].addEventListener('click', (e)=> changeFont('Gothic', 'UnifrakturMaguntia'))

    fonstContainer.childNodes[11].addEventListener('click', (e)=> changeFont('Edu-Vic-Wa', 'Edu VIC WA NT Beginner'))

    fonstContainer.childNodes[13].addEventListener('click', (e)=> changeFont('Cursive', 'cursive'))

    fonstContainer.childNodes[15].addEventListener('click', (e)=> changeFont('Anton', 'anton'))
    
    //==============

    // change font size
    inputFontSize.addEventListener('change', (e)=> {

      if (e.target.value <= 0 || e.target.value > 70) {
        return;
      };

      textAreaElement.style.fontSize = `${e.target.value}px`
      
    })

    // change bold function
    let isBold = false;
    changeFontWeight.addEventListener('click', (e)=> {

      textAreaElement.style.fontWeight = (!isBold) ? 'bold' : '';
      isBold = !isBold 
      
    })

    
    containerElement.appendChild(editableElement);

    // rotate function
    editableElement.style.transform = `rotate(${0}deg)`;

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
    const mouseUpRotateCondition = (clicks, boolean) =>{

      rotating = boolean;
      if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)){
              mobileDragElement(editableElement, menuOptionsElement, clicks, boolean, rotateButton, textAreaElement);

      }else{
              dragElement(editableElement, menuOptionsElement, clicks, boolean, rotateButton, textAreaElement);
      }
    }
    mouseUpRotateCondition(clicks, rotating);


    // activate the text on double click
    let numclicks = 0;
    editableElement.addEventListener('click', function(e) {

      numclicks += 1;

      setTimeout(() => {
        numclicks = 0
        this.removeEventListener('click', this)
      }, 480);

      if (numclicks > 1) {
        mouseUpRotateCondition(1, false);
        textAreaElement.removeAttribute('readonly')
        textAreaElement.style.cursor = 'auto';
        textAreaElement.focus();
      }

    })

    // button to rotate the element ===========================================================================================
    let grades = 0;
    // on click the rotate
    rotateButton.childNodes[1].addEventListener('click', (e)=>{

      grades += 45;
      editableElement.style.transform = `rotate(${grades}deg)`;

      if (grades > 360) {
        grades = 45;
      }

    })

    // on mouse down rotate
    let rotateLayer;
    rotateButton.childNodes[1].addEventListener('mousedown', (e)=>{
      rootContainerRef.current.style.cursor = 'move';

      rotateLayer = document.createElement('div');
      rotateLayer.className = 'rotate-layer'; 
      rootContainerRef.current.appendChild(rotateLayer);

      setIsDrawing(false);
      mouseUpRotateCondition(clicks+1, true);
    })
    rotateButton.childNodes[1].addEventListener('pointerdown', (e)=>{
      setIsDrawing(false);
      mouseUpRotateCondition(clicks+1, true);
    })

    // caculate the arctan and the result of the angle
    const calArcTan = (co, ca) => {
      let result = Math.atan(Math.abs(co) / Math.abs(ca));
      return result * (180 / Math.PI);
    }

    // calulate the angle of the figure
    const calculateTheAngle = (mousex, mousey) => {

      // let center = centerOfeditableElement.getBoundingClientRect();
      let center = editableElement.getBoundingClientRect();
      let co = mousex - center.x;
      let ca = mousey - center.y;

      // co / ca          
      if (Math.sign(co) === -1 && Math.sign(ca) === 1) {

        let co = mousex - center.x;
        let ca = mousey - center.y;

        const grados = calArcTan(co, ca);
        editableElement.style.transform = `rotate(${grados}deg)`;

      }else if(Math.sign(co) === -1 && Math.sign(ca) === -1){

        let ca = mousex - center.x;
        let co = mousey - center.y;

        const grados = calArcTan(co, ca);
        editableElement.style.transform = `rotate(${grados+90}deg)`;
        

      }else if(Math.sign(co) === 1 && Math.sign(ca) === -1){

        let ca = mousex - center.x;
        let co = mousey - center.y;

        const grados = calArcTan(co, ca);
        editableElement.style.transform = `rotate(${-(grados+90)}deg)`;

      }else{

        let co = mousex - center.x;
        let ca = mousey - center.y;

        const grados = calArcTan(co, ca); 
        editableElement.style.transform = `rotate(${-grados}deg)`;


      }

  }

    // when rotaing is active
    rootContainerRef.current.addEventListener('mousemove', (e) => {

      if (rotating) {
        editableElement.contentEditable = false;
        rootContainerRef.current.style.zIndex = 999;
        console.log(e.offsetX, e.offsetY, "roting")
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
      mouseUpRotateCondition(clicks, false);
    })
    rootContainerRef.current.addEventListener('pointerup', (e)=>{
      mouseUpRotateCondition(clicks, false);
    })


    canvasRef.current.addEventListener('click', (e)=> {
      rootElement.childNodes.forEach(e=>{
        if (e.className.toString() === 'float-element') {

          // textarea:
          e.childNodes[0].childNodes[0].setAttribute('readonly', 'readonly')
          e.childNodes[0].childNodes[0].style.cursor = 'default'
          // menu of the float element:
          e.childNodes[1].style.display = 'none';

          clicks = 0;
          mouseUpRotateCondition(clicks, false);
          editableElement.style.cursor = 'default';
          rotateButton.style.display = 'none';
        }
      })
    })

    editableElement.appendChild(rotateButton);
    containerElement.appendChild(menuOptionsElement);

    setUserAction('pen');

  }