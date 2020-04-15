window.addEventListener('DOMContentLoaded', () => {
    const master = document.querySelector('.master');
    const detail = document.querySelector('.detail');
    const masterItems = document.querySelectorAll('.master-item');

    master.addEventListener('click', e => {
        if (e.target.classList.contains('master-item')) {
            select(e.target);
        }
    });

    function select(selected) {
        for(var item of masterItems){
            item.classList.remove('active-item');
        }

        const message = window.messages.find(m => m.name === selected.innerHTML);
        const div = document.createElement('DIV');

        selected.classList.add('active-item');
        div.classList.add('active-item');
        div.innerHTML = `<img src=${message.src}>`;
        detail.removeChild(detail.lastChild)
        detail.appendChild(div);
    }

});