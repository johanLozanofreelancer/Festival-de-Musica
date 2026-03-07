document.addEventListener ( "DOMContentLoaded", function(){
    iniciarApp()
});


function iniciarApp() {
    barraFija();
    enlaceResaltado();
    scrollNav();
    crearGaleria();
};

// Funcion para mantener la barra de navegacion visible mientras hacemos scroll
function barraFija() {
    const barra = document.querySelector('.header');
    const contenidoHeader = document.querySelector ('.video');   
    const body = document.querySelector('body');
    
    window.addEventListener( 'scroll', function() {
        if  (contenidoHeader.getBoundingClientRect().bottom < 100 ){    
            barra.classList.add ('fijar-barra');  
            body.classList.add ('body-scroll',);

        }
        else {
            barra.classList.remove ('fijar-barra');   
            body.classList.remove ('body-scroll');       
        }
    })

} 
//Funcion para mantener el enlace resaltado mientras estamos en la seccion
function enlaceResaltado() {
    
}
// Funcion para que los enlaces de la barra de navegacion te dirijan a la seccion de la pagina seleccionada
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
// Funcion para crear la galeria, iterando las imagenes con JS
function crearGaleria() {
    const galeria = document.querySelector (".galeria-imagenes");
    const CANTIDAD_IMAGENES = 16
    for ( let i = 1; i <= CANTIDAD_IMAGENES ; i++ ){
        const imagen = document.createElement ("IMG");
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt = 'Imagen Galeria'

        galeria.appendChild(imagen);
        // imagen.innerHTML = `
        //     <source srcset="src/img/gallery/full/${i}.avif" type="imagen/avif">
        //     <source srcset="src/img/gallery/full/${i}.webp" type="imagen/webp">
        //     <img loading="lazy" width="300" height="200" src="src/img/gallery/full/${i}.jpg" alt="imagen galeria">
        // `;   

        imagen.onclick = function() {
            mostrarImagen(i)
        }
    }
}
//Funcion para visualizar la imagen ampliada en un modal 
function mostrarImagen(i) {
    // Creamos un picture para soportar formatos modernos
    
    const picture = document.createElement('IMG');
    picture.src = `src/img/gallery/full/${i}.jpg`
    picture.alt = 'Imagen Galeria'

//    picture.innerHTML = `
//         <source srcset="src/img/gallery/full/${i}.avif" type="image/avif">
//         <source srcset="src/img/gallery/full/${i}.webp" type="image/webp">
//         <img loading="lazy" width="300" height="200" src="src/img/gallery/full/${i}.jpg" alt="imagen galeria">
//     `;

    const overlay = document.createElement('DIV');
    overlay.appendChild(picture); 
    overlay.classList.add("overlay");

    // Función para cerrar con animación
    const cerrarOverlay = () => {
        overlay.classList.add('fade-out'); // 1. Agregamos la clase de CSS

        setTimeout(() => {
            const body = document.querySelector("body");
            body.classList.remove('fijar-body');
            overlay?.remove(); // 2. Eliminamos un poco antes de que termine la animación (500ms)
        }, 450); 
    };

    // Cerrar al hacer click en el overlay
    overlay.onclick = cerrarOverlay;

    // Botón para cerrar el Modal 
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = cerrarOverlay; // Usamos la misma función

    overlay.appendChild(cerrarModal);

    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}