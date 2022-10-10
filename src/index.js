import { renderEmissions, renderMap} from './scripts/visualization';

addEventListener('DOMContentLoaded',  async (event) => {

    renderMap(); // renders the map

    //Instruction modal on launch
    let instructions = document.getElementById('instruction_modal')
    instructions.addEventListener('click', event =>{
        instructions.style.opacity = '0';
        instructions.style.pointerEvents = 'none';
    })
});