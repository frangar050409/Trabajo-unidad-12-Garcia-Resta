const pintar = (valor, sangria = 0) => {
  const espacio = "  ".repeat(sangria);
  if (Array.isArray(valor)) {
    if (valor.length === 0) return '<span class="p">[]</span>';
    return `<span class="p">[</span>\n${valor.map((v) => `${espacio}  ${pintar(v, sangria + 1)}`).join(",\n")}\n${espacio}<span class="p">]</span>`;
  }
  if (valor && typeof valor === "object") {
    const claves = Object.keys(valor);
    if (claves.length === 0) return '<span class="p">{}</span>';
    return `<span class="p">{</span>\n${claves
      .map((clave) => `${espacio}  <span class="k">${clave}</span>: ${pintar(valor[clave], sangria + 1)}`)
      .join(",\n")}\n${espacio}<span class="p">}</span>`;
  }
  if (typeof valor === "string") return `<span class="s">"${valor}"</span>`;
  if (typeof valor === "number") return `<span class="n">${valor}</span>`;
  return `<span class="b">${valor}</span>`;
};

const archivos = [
  { icono: "👤", nombre: "Registro.p5", titulo: "Registro En P5", contenido: () => pintar(nuevoUsuario) },
  {
    icono: "🚗",
    nombre: "miAuto.obj",
    titulo: "Variable miAuto",
    contenido: () =>
      `${pintar(miAuto)}\n\n<span class="c">for...in:</span>\n${Object.keys(miAuto)
        .map((k) => `${k}: ${miAuto[k]}`)
        .join("\n")}\n\n<span class="c">Para pensar:</span>\nmiAuto[propertyKey]  → ${pintar(miAuto[propertyKey])}\nmiAuto["modelo"]     → ${pintar(miAuto["modelo"])}\nmiAuto[nextProperty] → ${pintar(miAuto[nextProperty])}\nmiAuto["color"]      → ${pintar(miAuto["color"])}\n<span class="c">Con corchetes podés usar una variable que guarda el nombre de la propiedad.</span>`
  },
  {
    icono: "📈",
    nombre: "Notas.xls",
    titulo: "Aumentar La Nota",
    contenido: () =>
      `${estudiantes
        .map((e) => `<span class="fila"><span>${e.Estudiante}</span><span class="nota" style="--nota:${e.nota * 10}%">${e.nota}</span></span>`)
        .join("")}\n${pintar(estudiantes)}`
  },
  {
    icono: "🎬",
    nombre: "Peliculas.db",
    titulo: "Base De Datos De Películas",
    contenido: () =>
      lineasPeliculas
        .map((linea, i) => `<span class="${peliculas[i].loHasVisto ? "visto" : "pendiente"}">${linea} ${"★".repeat(peliculas[i].rating)}</span>`)
        .join("\n")
  },
  { icono: "✖️", nombre: "Duplicados.js", titulo: "Números Duplicados", contenido: () => `numeros = ${pintar(numeros)}\n\nnumeros_duplicados = ${pintar(numeros_duplicados)}` },
  { icono: "🎂", nombre: "Mas27.txt", titulo: "Desafío + 27", contenido: () => pintar(personasConMasDe27) },
  {
    icono: "🏆",
    nombre: "Oscar.mov",
    titulo: "Camino Al Oscar",
    contenido: () =>
      `<span class="c">actoresVocales</span> = ${pintar(actoresVocales)}\n\n<span class="c">actoresPrincipales</span> = ${pintar(actoresPrincipales)}\n\n<span class="c">peliculas</span> = ${pintar(peliculasOscar)}\n\n<span class="c">peliculaPorActor</span> = ${pintar(peliculaPorActor)}\n\n<span class="c">Adaptado a varias películas por actor:</span>\n${pintar(peliculasPorActor)}`
  },
  { icono: "📏", nombre: "Posicion.csv", titulo: "Posición Adecuada", contenido: () => pintar(genteOrdenada) },
  {
    icono: "🏭",
    nombre: "Factory.app",
    titulo: "Software Factory",
    contenido: () => {
      const totales = valorTotalPorProducto(ecommerce);
      const maximo = Math.max(...totales.map((t) => t.total));
      return `${totales
        .map((t) => `<span class="fila"><span>${t.nombre}</span><span class="barrita" style="--ancho:${(t.total / maximo) * 100}%">$${t.total.toLocaleString("es-AR")}</span></span>`)
        .join("")}\n${pintar(totales)}`;
    }
  },
  {
    icono: "🔤",
    nombre: "Contador.exe",
    titulo: "Contar caracteres",
    entrada: true,
    contenido: (texto = "banana") => `contarCaracteres(${pintar(texto)})\n→ ${pintar(contarCaracteres(texto))}`
  }
];

let capa = 10;
const ventanas = document.getElementById("ventanas");

function abrir(archivo, indice) {
  const existente = document.querySelector(`[data-ventana="${indice}"]`);
  if (existente) {
    existente.style.zIndex = ++capa;
    existente.classList.remove("sacudir");
    void existente.offsetWidth;
    existente.classList.add("sacudir");
    return;
  }
  const ventana = document.createElement("section");
  ventana.className = "ventana";
  ventana.dataset.ventana = indice;
  ventana.style.zIndex = ++capa;
  const ancho = Math.min(480, window.innerWidth - 32);
  const angosto = window.innerWidth < 700;
  ventana.style.left = `${angosto ? 16 : Math.min(window.innerWidth - ancho - 16, 290 + (indice % 4) * 60)}px`;
  ventana.style.top = `${angosto ? 120 + (indice % 4) * 24 : 60 + (indice % 5) * 36}px`;
  ventana.innerHTML = `
    <div class="ventana__barra">
      <span>${archivo.icono} ${archivo.titulo}</span>
      <button type="button" aria-label="Cerrar">✕</button>
    </div>
    ${archivo.entrada ? '<label class="ventana__entrada">Palabra: <input type="text" value="banana"></label>' : ""}
    <pre class="ventana__cuerpo"></pre>`;
  const cuerpo = ventana.querySelector(".ventana__cuerpo");
  cuerpo.innerHTML = archivo.contenido();
  if (archivo.entrada) {
    ventana.querySelector("input").addEventListener("input", (e) => {
      cuerpo.innerHTML = archivo.contenido(e.target.value);
    });
  }
  ventana.querySelector("button").addEventListener("click", () => {
    ventana.classList.add("cerrando");
    setTimeout(() => ventana.remove(), 250);
  });
  ventana.addEventListener("pointerdown", () => (ventana.style.zIndex = ++capa));
  arrastrable(ventana, ventana.querySelector(".ventana__barra"));
  ventanas.appendChild(ventana);
}

function arrastrable(ventana, agarre) {
  let inicioX = 0;
  let inicioY = 0;
  agarre.addEventListener("pointerdown", (evento) => {
    if (evento.target.tagName === "BUTTON") return;
    inicioX = evento.clientX - ventana.offsetLeft;
    inicioY = evento.clientY - ventana.offsetTop;
    agarre.setPointerCapture(evento.pointerId);
    const mover = (e) => {
      ventana.style.left = `${Math.max(0, e.clientX - inicioX)}px`;
      ventana.style.top = `${Math.max(40, e.clientY - inicioY)}px`;
    };
    const soltar = () => {
      agarre.removeEventListener("pointermove", mover);
      agarre.removeEventListener("pointerup", soltar);
    };
    agarre.addEventListener("pointermove", mover);
    agarre.addEventListener("pointerup", soltar);
  });
}

const iconos = document.getElementById("iconos");
archivos.forEach((archivo, indice) => {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "icono";
  boton.style.animationDelay = `${1.4 + indice * 0.06}s`;
  boton.innerHTML = `<span>${archivo.icono}</span>${archivo.nombre}`;
  boton.addEventListener("click", () => abrir(archivo, indice));
  iconos.appendChild(boton);
});

function tic() {
  const ahora = new Date();
  document.getElementById("reloj").textContent = ahora.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}
tic();
setInterval(tic, 10000);
setTimeout(() => document.getElementById("arranque").classList.add("listo"), 1300);
setTimeout(() => abrir(archivos[1], 1), 1700);
