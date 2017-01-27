define(["focusManager","css!./style.css","paper-icon-button-light","material-icons"],function(focusManager){"use strict";function focus(){var scope=this,selected=scope.querySelector("."+selectedButtonClass);selected?focusManager.focus(selected):focusManager.autoFocus(scope,!0)}function getLetterButton(l){return'<button data-value="'+l+'" class="alphaPickerButton">'+l+"</button>"}function render(element,options){element.classList.add("alphaPicker"),element.classList.add("focuscontainer-x");var letters,html="";html+='<div class="alphaPickerRow">',"keyboard"===options.mode?html+='<button data-value=" " is="paper-icon-button-light" class="alphaPickerButton autoSize"><i class="md-icon alphaPickerButtonIcon">&#xE256;</i></button>':(letters=["#"],html+=letters.map(getLetterButton).join("")),letters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],html+=letters.map(getLetterButton).join(""),"keyboard"===options.mode?(html+='<button data-value="backspace" is="paper-icon-button-light" class="alphaPickerButton autoSize"><i class="md-icon alphaPickerButtonIcon">&#xE14A;</i></button>',html+="</div>",letters=["0","1","2","3","4","5","6","7","8","9"],html+='<div class="alphaPickerRow">',html+="<br/>",html+=letters.map(getLetterButton).join(""),html+="</div>"):html+="</div>",element.innerHTML=html,element.classList.add("focusable"),element.focus=focus}function AlphaPicker(options){function onItemFocusTimeout(){itemFocusTimeout=null,self.value(itemFocusValue)}function onAlphaFocusTimeout(){if(alphaFocusTimeout=null,document.activeElement===alphaFocusedElement){var value=alphaFocusedElement.getAttribute("data-value");self.value(value,!0)}}function parentWithClass(elem,className){for(;!elem.classList||!elem.classList.contains(className);)if(elem=elem.parentNode,!elem)return null;return elem}function onAlphaPickerInKeyboardModeClick(e){var alphaPickerButton=parentWithClass(e.target,"alphaPickerButton");if(alphaPickerButton){var value=alphaPickerButton.getAttribute("data-value");element.dispatchEvent(new CustomEvent("alphavalueclicked",{cancelable:!1,detail:{value:value}}))}}function onAlphaPickerClick(e){var alphaPickerButton=parentWithClass(e.target,"alphaPickerButton");if(alphaPickerButton){var value=alphaPickerButton.getAttribute("data-value");currentValue===value.toUpperCase()?self.value(null,!0):self.value(value,!0)}}function onAlphaPickerFocusIn(e){alphaFocusTimeout&&(clearTimeout(alphaFocusTimeout),alphaFocusTimeout=null);var alphaPickerButton=parentWithClass(e.target,"alphaPickerButton");alphaPickerButton&&(alphaFocusedElement=alphaPickerButton,alphaFocusTimeout=setTimeout(onAlphaFocusTimeout,100))}function onItemsFocusIn(e){var item=parentWithClass(e.target,itemClass);if(item){var prefix=item.getAttribute("data-prefix");prefix&&prefix.length&&(itemFocusValue=prefix[0],itemFocusTimeout&&clearTimeout(itemFocusTimeout),itemFocusTimeout=setTimeout(onItemFocusTimeout,100))}}var itemFocusValue,itemFocusTimeout,alphaFocusedElement,alphaFocusTimeout,self=this,element=options.element,itemsContainer=options.itemsContainer,itemClass=options.itemClass;self.enabled=function(enabled){enabled?(itemsContainer&&itemsContainer.addEventListener("focus",onItemsFocusIn,!0),"keyboard"===options.mode&&element.addEventListener("click",onAlphaPickerInKeyboardModeClick),"click"!==options.valueChangeEvent?element.addEventListener("focus",onAlphaPickerFocusIn,!0):element.addEventListener("click",onAlphaPickerClick)):(itemsContainer&&itemsContainer.removeEventListener("focus",onItemsFocusIn,!0),element.removeEventListener("click",onAlphaPickerInKeyboardModeClick),element.removeEventListener("focus",onAlphaPickerFocusIn,!0),element.removeEventListener("click",onAlphaPickerClick))},self.on=function(name,fn){element.addEventListener(name,fn)},self.off=function(name,fn){element.removeEventListener(name,fn)},self.destroy=function(){self.enabled(!1),element.classList.remove("focuscontainer-x")},self.visible=function(visible){element.style.visibility=visible?"visible":"hidden"};var currentValue;self.value=function(value,applyValue){var btn,selected;return void 0!==value&&(null!=value?(value=value.toUpperCase(),currentValue=value,"keyboard"!==options.mode&&(selected=element.querySelector("."+selectedButtonClass),btn=element.querySelector(".alphaPickerButton[data-value='"+value+"']"),btn&&btn!==selected&&btn.classList.add(selectedButtonClass),selected&&selected!==btn&&selected.classList.remove(selectedButtonClass))):(currentValue=value,selected=element.querySelector("."+selectedButtonClass),selected&&selected.classList.remove(selectedButtonClass))),applyValue&&element.dispatchEvent(new CustomEvent("alphavaluechanged",{cancelable:!1,detail:{value:value}})),currentValue},self.values=function(){for(var elems=element.querySelectorAll(".alphaPickerButton"),values=[],i=0,length=elems.length;i<length;i++)values.push(elems[i].getAttribute("data-value"));return values},self.focus=function(){focusManager.autoFocus(element,!0)},render(element,options),self.enabled(!0),self.visible(!0)}var selectedButtonClass="alphaPickerButton-selected";return AlphaPicker});