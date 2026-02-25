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
    const CANTIDAD_IMAGENES = 16
    for ( let i = 1; i <= CANTIDAD_IMAGENES ; i++ ){
        const imagen = document.createElement ("PICTURE");
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt = 'Imagen Galeria'

        galeria.appendChild(imagen);
        imagen.innerHTML = `
            <source srcset="src/img/gallery/full/${i}.avif" type="imagen/avif">
            <source srcset="src/img/gallery/full/${i}.webp" type="imagen/webp">
            <img loading="lazy" width="300" height="200" src="src/img/gallery/full/${i}.jpg" alt="imagen galeria">
        `;   

        imagen.onclick = function() {
            mostrarImagen(i)
        }
    }
}

function mostrarImagen(i) {
    // Creamos un picture para soportar formatos modernos
    console.log('desde mostrarimagen')
    const picture = document.createElement('PICTURE');
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
    const cerrarConAnimacion = () => {
        overlay.classList.add('fade-out'); // 1. Agregamos la clase de CSS

        setTimeout(() => {
            const body = document.querySelector("body");
            body.classList.remove('fijar-body');
            overlay.remove(); // 2. Eliminamos después de que termine la animación (500ms)
        }, 500); 
    };

    // Cerrar al hacer click en el overlay
    overlay.onclick = cerrarConAnimacion;

    // Botón para cerrar el Modal 
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = cerrarConAnimacion; // Usamos la misma función

    overlay.appendChild(cerrarModal);

    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}