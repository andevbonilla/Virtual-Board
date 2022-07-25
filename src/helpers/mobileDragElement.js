export function mobileDragElement(elmnt, menuElement, clicks, isRotating, rotateButton, textAreaElement) {

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onpointerdown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onpointerdown = dragMouseDown;
    }

    function dragMouseDown(e) {

      if (isRotating) return;

      if(textAreaElement !== undefined){
        if(textAreaElement.getAttribute('readonly') === null){
          return;
        }
      }

      menuElement.style.display = 'flex'
      rotateButton.style.display = 'flex'

      const dragLogic = (e) => {

        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
  
        document.onpointerup = closeDragElement;
        document.ontouchmove = elementDrag;

      }

      if (clicks === 'no-clicks') {

        dragLogic(e);
        
      }else{

        if (clicks === 1) {
          elmnt.style.cursor = 'auto'
          return;
        }
        clicks = 1;

        dragLogic(e);  

      }

    }

    function elementDrag(e) {

      if (clicks !== 'no-clicks') {
        clicks = 0;
      }

      menuElement.style.display = 'none'
      rotateButton.style.display = 'none'

      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.changedTouches[0].clientX;
      pos2 = pos4 - e.changedTouches[0].clientY;
      pos3 = e.changedTouches[0].clientX;
      pos4 = e.changedTouches[0].clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      menuElement.style.top = ((elmnt.offsetTop - pos2)-100) + "px";
      menuElement.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement(e) {
      menuElement.style.display = 'flex'
      rotateButton.style.display = 'flex'
      /* stop moving when mouse button is released:*/
      document.onpointerup = null;
      document.ontouchmove = null;
    }

  }