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
        // //color de los tags h1 - h6, p, i y a
        // document.querySelectorAll('h2').forEach((h2) => {
        //     h2.classList.toggle('light-mode');
        // });
        // document.querySelectorAll('h1').forEach((h1) => {
        //     h1.classList.toggle('light-mode');
        // });
        // document.querySelectorAll('p').forEach((p) => {
        //     p.classList.toggle('light-mode');
        // });
        // document.querySelectorAll('a').forEach((a) => {
        //     a.classList.toggle('light-mode');
        // });
        // document.querySelectorAll('i').forEach((i) => {
        //     i.classList.toggle('light-mode');
        // });

        // //color de los divs de detalle
        // document.getElementById('buttons').classList.toggle('light-mode')
    });
};


activarNav();
darkMode();