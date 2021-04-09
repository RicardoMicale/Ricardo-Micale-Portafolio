const activarNav = () => {
    const menu = document.querySelector('.menu');
    let menuOpen = false;

    const links = document.querySelector('.links');
    const linkAnim = document.querySelectorAll('.links li');
    //Animacion menu
    menu.addEventListener('click', () => {
        if(!menuOpen) {
            menu.classList.add('open');
            menuOpen = true;
            links.style.display ='flex';
        } else {
            menu.classList.remove('open');
            menuOpen = false;
            links.style.display ='none';
        }
        //Entrada del hamburger
        links.classList.toggle('nav-open');

        //animacion links
        linkAnim.forEach((link, index) => {
            if(link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navOpen 0.5s ease forwards ${index / 7 + 0.4}s`;
            }
        });
    });
};

const darkMode = () => {
    //Cambiar de dark a light mode
    const checkbox = document.getElementById('checkbox');

    checkbox.addEventListener('change', () => {
        //color del body y los ul tag
        document.body.classList.toggle('light-mode');
    });
};

const goUp = () => {
    window.scrollTo({top: 0})
}


activarNav();
darkMode();