let nuevoUsuario = {
  usuario: "UnNuevoUsuario",
  edad: 23,
  direccion: "Calle de mentira",
  fechaDeNacimiento: "14/03/1999",
  contraseña: "unacontraseñamuysegura"
};
console.log(nuevoUsuario);

let miAuto = {};
miAuto.marca = "Fiat";
miAuto.año = 2019;
miAuto.nuevo = false;
let propertyKey = "modelo";
miAuto[propertyKey] = "Cronos";
let anotherPropertyKey = "precio";
miAuto[anotherPropertyKey] = 18500000;
let nextProperty = "color";
miAuto[nextProperty] = "gris plata";
for (let key in miAuto) {
  console.log(key + ": " + miAuto[key]);
}
console.log(miAuto[propertyKey], miAuto["modelo"], miAuto[nextProperty], miAuto["color"]);

let estudiantes = [
  { Estudiante: "Juan", nota: 6 },
  { Estudiante: "Mario", nota: 8 },
  { Estudiante: "Julia", nota: 10 },
  { Estudiante: "Sofia", nota: 2 }
];
for (let i = 0; i < estudiantes.length; i++) {
  if (estudiantes[i].nota > 5) {
    estudiantes[i].nota = estudiantes[i].nota + 2;
    if (estudiantes[i].nota > 10) {
      estudiantes[i].nota = 10;
    }
  }
}
console.log(estudiantes);

let peliculas = [
  { titulo: "Busqueda implacable", rating: 5, loHasVisto: true },
  { titulo: "Norbit", rating: 3, loHasVisto: false },
  { titulo: "Mini espías", rating: 2, loHasVisto: true },
  { titulo: "La vida es bella", rating: 5, loHasVisto: false }
];
let lineasPeliculas = [];
for (let i = 0; i < peliculas.length; i++) {
  let visto = peliculas[i].loHasVisto ? "Viste" : "No viste";
  let linea = visto + ' "' + peliculas[i].titulo + '" - ' + peliculas[i].rating + " estrellas";
  lineasPeliculas.push(linea);
  console.log(linea);
}

let numeros = [2, 4, 5, 37, 0];
let numeros_duplicados = {};
for (let i = 0; i < numeros.length; i++) {
  numeros_duplicados[numeros[i]] = numeros[i] * 2;
}
console.log(numeros_duplicados);

let personas = [
  { nombre: "Ana", edad: "28" },
  { nombre: "María", edad: "24" },
  { nombre: "José", edad: "31" }
];
let personasConMasDe27 = personas.filter((persona) => Number(persona.edad) > 27);
console.log(personasConMasDe27);

let actoresVocales = [];
let actoresPrincipales = ["Tom Hanks", "Johnny Depp", "Elizabeth Taylor", "Morgan Freeman", "Jennifer Aniston", "Meryl Streep", "Natalie Portman", "Ashton Kutcher"];
let peliculasOscar = [];
let actoresPrincipalesPorPelicula = {
  "Titanic": "Leonardo DiCaprio",
  "El Padrino": "Al Pacino",
  "Matrix": "Keanu Reeves",
  "Iron Man": "Robert Downey Jr",
  "Soy leyenda": "Will Smith",
  "Bastardos sin gloria": "Brad Pitt"
};
let vocales = "aeiouáéíóú";
actoresPrincipales.forEach((actor) => {
  let partes = actor.split(" ");
  let empiezaConVocal = partes.some((parte) => vocales.includes(parte[0].toLowerCase()));
  if (empiezaConVocal) {
    actoresVocales.push(actor);
  }
});
for (let pelicula in actoresPrincipalesPorPelicula) {
  actoresPrincipales.push(actoresPrincipalesPorPelicula[pelicula]);
}
for (let pelicula in actoresPrincipalesPorPelicula) {
  peliculasOscar.push(pelicula);
}
let peliculaPorActor = {};
for (let pelicula in actoresPrincipalesPorPelicula) {
  let actor = actoresPrincipalesPorPelicula[pelicula];
  peliculaPorActor[actor] = pelicula;
}
actoresPrincipalesPorPelicula["El Origen"] = "Leonardo DiCaprio";
actoresPrincipalesPorPelicula["Scarface"] = "Al Pacino";
let peliculasPorActor = {};
for (let pelicula in actoresPrincipalesPorPelicula) {
  let actor = actoresPrincipalesPorPelicula[pelicula];
  if (peliculasPorActor[actor] === undefined) {
    peliculasPorActor[actor] = [];
  }
  peliculasPorActor[actor].push(pelicula);
}
console.log(actoresVocales, actoresPrincipales, peliculasOscar, peliculaPorActor, peliculasPorActor);

let gente = [
  { nombre: "Alba", edad: 15 },
  { nombre: "Estrella", edad: 30 },
  { nombre: "Belen", edad: 20 },
  { nombre: "Santiago", edad: 4 },
  { nombre: "Katherine", edad: 55 }
];
let genteOrdenada = gente.slice().sort((a, b) => a.edad - b.edad);
genteOrdenada.forEach((persona, indice) => {
  persona.posicion = indice;
});
console.log(genteOrdenada);

let ecommerce = [
  { nombre: "Samsung TV", precio: 6000, articulos: 10 },
  { nombre: "DELL notebook", precio: 4000, articulos: 30 },
  { nombre: "Auriculares Sony", precio: 1500, articulos: 15 },
  { nombre: "Monitor Philips", precio: 12000, articulos: 20 },
  { nombre: "Teclado logitech", precio: 3000, articulos: 5 }
];
function valorTotalPorProducto(productos) {
  let resultado = [];
  for (let i = 0; i < productos.length; i++) {
    resultado.push({
      nombre: productos[i].nombre,
      total: productos[i].precio * productos[i].articulos
    });
  }
  return resultado;
}
console.log(valorTotalPorProducto(ecommerce));

function contarCaracteres(cadena) {
  let conteo = {};
  for (let i = 0; i < cadena.length; i++) {
    let caracter = cadena[i];
    if (conteo[caracter] === undefined) {
      conteo[caracter] = 1;
    } else {
      conteo[caracter]++;
    }
  }
  return conteo;
}
let result1 = contarCaracteres("banana");
console.log('should log "{b: 1, a: 3, n: 2}":', result1);
let result2 = contarCaracteres("");
console.log('should log "{}":', result2);
