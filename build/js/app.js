document.addEventListener ( "DOMContentLoaded", function(){
    iniciarApp()
});


function iniciarApp() {
    barraFija();
    crearGaleria();
    scrollNav();
};
function barraFija() {
    const barra = document.querySelector('.header');
    const inicio = document.querySelector('.header h1');
    const sobreFestival = document.querySelector ('.sobre-festival');   
    const body = document.querySelector('body');
    
    window.addEventListener( 'scroll', function() {
        if  (sobreFestival.getBoundingClientRect().bottom < 0 ){    
            barra.classList.add ('fijar-barra');  
            body.classList.add ('body-scroll',);

        }
        else {
            barra.classList.remove ('fijar-barra');   
            body.classList.remove ('body-scroll');       
        }
    })

} 

function scrollNav() {
    const enlaces = document.querySelectorAll ('.navegacion-principal a');
    
    enlaces.forEach( enlace => {
       enlace.addEventListener('click', function(e) {
        e.preventDefault();

        const seccionScroll = e.target.attributes.href.value;
        const seccion = document.querySelector (seccionScroll);
        seccion.scrollIntoView({ behavior:"smooth"}); 
       });
    }); 
}

function crearGaleria() {
    const galeria = document.querySelector (".galeria-imagenes");
    const CANTIDAD_IMAGENES = 12
    for ( let i = 1; i <= CANTIDAD_IMAGENES ; i++ ){
        const imagen = document.createElement ("IMG");
        imagen.src = `src/img/thumb/${i}.jpg`
        imagen.alt = 'Imagen Galeria'

        galeria.appendChild(imagen);
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="imagen/avif">
            <source srcset="build/img/thumb/${i}.webp" type="imagen/webp">
            <img loading="lazy" width="300" height="200" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;   

        imagen.onclick = function() {
            mostrarImagen(i)
        }
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement ("IMG");
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="imagen/avif">
        <source srcset="build/img/grande/${id}.webp" type="imagen/webp">
        <img loading="lazy" width="300" height="200" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;   

    const overlay = document.createElement ('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add ("overlay");
    overlay.onclick = function() {
        const body = document.querySelector("body");
        body.classList.remove('fijar-body');
        overlay.remove();    }
    
    // Botómn para cerrar el Modal 
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector("body");
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal)


    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add('fijar-body');

} 