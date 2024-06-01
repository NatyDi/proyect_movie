//Peliculas principales

let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
    if (pagina < 1000) {
        pagina += 1
        cargarPeliculas()
    }
})

btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
        pagina -= 1
        cargarPeliculas()
    }
})

const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d324e662c8e5ad1cfafd507afe62a48f&language=es-MX&page=${pagina}`)
        if (respuesta.status === 200) {
            const datos = await respuesta.json()
            let peliculas = ""
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class = "pelicula"> 
                <img class = "poster" src ="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class = "titulo" >${pelicula.title}</h3>
                </div>
                `;
            });
            document.getElementById("peliculas-contenedor").innerHTML = peliculas
        } else if (respuesta.status === 401) {
            console.log("Pusiste la llave mal");
        } else if (respuesta.status === 404) {
            console.log("La pelicula que buscas no existe")
        } else {
            console.log("Hubo un error y no sabemos que paso")
        }
    } catch (error) {
        console.log(error)
    }
}

cargarPeliculas()

//Recomendacion



const descubrir = async () => {
    try {
        const respuesta = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=d324e662c8e5ad1cfafd507afe62a48f')
        if (respuesta.status === 200) {
            const datos = await respuesta.json()
            console.log(datos)
            let desc = ""
            datos.results.forEach(pelicula => {
                desc += `
                <div class = "peli-recom"> 
                <img class = "poster2" src ="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class = "titulo" >${pelicula.title}</h3>
                </div>
                `;
            });
            console.log(desc)
            document.getElementById("recomendaciones-contenedor").innerHTML = desc
        } else if (respuesta.status === 401) {
            console.log("Pusiste la llave mal");
        } else if (respuesta.status === 404) {
            console.log("La pelicula que buscas no existe")
        } else {
            console.log("Hubo un error y no sabemos que paso")
        }
    } catch (error) {
        console.log(error)
    }
}

descubrir()