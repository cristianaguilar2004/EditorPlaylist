class Cancion {
	constructor(titulo, artista, duracion) {
		this.titulo = titulo;
		this.artista = artista;
		this.duracion = duracion;
	}

	formatoTiempo(segundos) {
		const minutos = Math.floor(segundos / 60);
		const segundosRestantes = segundos % 60;
		return `${minutos}:${String(segundosRestantes).padStart(2, "0")}`;
	}
}

class Accion {
	constructor(tipo, cancion, posicion) {
		this.tipo = tipo;
		this.cancion = cancion;
		this.posicion = posicion;
	}
}

class Album {
	constructor(titulo, anio, canciones) {
		this.titulo = titulo;
		this.anio = anio;
		this.canciones = canciones;
	}

	cantidad() {
		return this.canciones.length;
	}

	duraciontotal() {
		return this.canciones.reduce((total, cancion) => total + cancion.duracion, 0); //
	}
}

class PilaEstática {
	constructor(capacidad = 100) {
		this.elementos = new Array(capacidad);
		this.tope = 0;
		this.capacidad = capacidad;
	}

	push(elemento) {
		if (!this.estáLlena()) {
			this.elementos[this.tope] = elemento;
			this.tope++;
			return true;
		}
		return false;
	}

	pop() {
		if (!this.estáVacia()) {
			this.tope--;
			return this.elementos[this.tope];
		}
		return null;
	}

	peek() {
		if (!this.estáVacia()) {
			return this.elementos[this.tope - 1];
		}
		return null;
	}

	estáVacia() {
		return this.tope === 0;
	}

	estáLlena() {
		return this.tope === this.capacidad;
	}

	tamaño() {
		return this.tope;
	}
}

class EditorPlaylist {
	constructor() {
		this.playlist = [];
		this.deshacer = new PilaDinámica();
		this.rehacer = new PilaDinámica();
	}

	agregarCancion(cancion) {
		if (!this.deshacer.estáVacia()) {
			console.log(`   Historia: ${this.deshacer.tamaño()} acción(es) pendiente(s)`);
		}
		const accion = new Accion("agregar", cancion, this.playlist.length);
		this.deshacer.push(accion);
		this.playlist.push(cancion);
		this.rehacer = new PilaDinámica();
	}

	eliminar(posicion) {
		if (posicion < 0 || posicion >= this.playlist.length) {
			console.log(`   Error: Posición ${posicion} fuera de rango`);
			return false;
		}
		const cancion = this.playlist[posicion];
		const accion = new Accion("eliminar", cancion, posicion);
		this.deshacer.push(accion);
		this.playlist.splice(posicion, 1);
		this.rehacer = new PilaDinámica();
		return true;
	}

	deshacer() {
		if (this.deshacer.estáVacia()) {
			console.log(`   Error: No hay acciones para deshacer`);
			return;
		}
		const accion = this.deshacer.pop();
		if (accion.tipo === "agregar") {
			this.playlist.pop();
			this.rehacer.push(accion);
		} else if (accion.tipo === "eliminar") {
			this.playlist.splice(accion.posicion, 0, accion.cancion);
			this.rehacer.push(accion);
		}
	}

	rehacer() {
		if (this.rehacer.estáVacia()) {
			console.log(`   Error: No hay acciones para rehacer`);
			return;
		}
		const accion = this.rehacer.pop();
		if (accion.tipo === "agregar") {
			this.playlist.push(accion.cancion);
			this.deshacer.push(accion);
		} else if (accion.tipo === "eliminar") {
			this.playlist.splice(accion.posicion, 1);
			this.deshacer.push(accion);
		}
	}

	guardar() {
		console.log(`   Guardando... Se vaciaron las pilas`);
		this.deshacer = new PilaDinámica();
		this.rehacer = new PilaDinámica();
		this.mostrar();
	}

	estado() {
		console.log(`   Estado actual de la playlist:`);
		this.playlist.forEach((cancion, indice) => {
			console.log(`   ${indice + 1}. ${cancion.titulo}`);
		});
	}

	mostrar() {
		console.log(`   Playlist (${this.playlist.length} canciones):`);
		if (this.playlist.length === 0) {
			console.log(`   [vacía]`);
		} else {
			this.playlist.forEach((cancion, indice) => {
				console.log(`   ${indice + 1}. ${cancion.titulo} - ${cancion.artista}`);
			});
		}
	}
}

function prebarP1(canciones) {
	console.log("\n--- Prueba P1: PilaEstática con Canciones ---");
	const pila = new PilaEstática(5);

	// Paso 1: Meter las tres primeras canciones y mostrar tamaño y peek
	console.log("\n1. Metiendo las tres primeras canciones...");
	for (let i = 0; i < 3; i++) {
		pila.push(canciones[i]);
		console.log(`   Agregada: ${canciones[i].titulo}`);
	}
	console.log(`   Tamaño: ${pila.tamaño()}`);
	console.log(`   Peek (tope): ${pila.peek().titulo}`);

	// Paso 2: Intentar meter la cuarta canción
	console.log("\n2. Intentando agregar la cuarta canción...");
	const resultado = pila.push(canciones[3]);
	if (resultado) {
		console.log(`   Agregada: ${canciones[3].titulo}`);
		console.log(`   Tamaño: ${pila.tamaño()}`);
	} else {
		console.log(`   Error Pila llena: no cabe`);
	}

	// Paso 3: Sacar todas con un ciclo while
	console.log("\n3. Sacando todas las canciones con pop()...");
	while (!pila.estáVacia()) {
		const cancion = pila.pop();
		console.log(`   Sacada: ${cancion.titulo}`);
	}

	// Paso 4: Intentar sacar una más
	console.log("\n4. Intentando sacar de pila vacía...");
	const resultado2 = pila.pop();
	if (resultado2 === null) {
		console.log(`   Error Pila vacía: no hay que sacar`);
	}
}

function pruebaP1la(canciones) {
	console.log("\n--- Prueba P1la: PilaDinámica con Canciones ---");
	const pila = new PilaDinámica();

	// Paso 1: Meter las tres primeras canciones y mostrar tamaño y peek
	console.log("\n1. Metiendo las tres primeras canciones...");
	for (let i = 0; i < 3; i++) {
		pila.push(canciones[i]);
		console.log(`   Agregada: ${canciones[i].titulo}`);
	}
	console.log(`   Tamaño: ${pila.tamaño()}`);
	console.log(`   Peek (tope): ${pila.peek().titulo}`);

	// Paso 2: Agregar la cuarta canción (sin límite en pila dinámica)
	console.log("\n2. Agregando la cuarta canción...");
	pila.push(canciones[3]);
	console.log(`   Agregada: ${canciones[3].titulo}`);
	console.log(`   Tamaño: ${pila.tamaño()}`);

	// Paso 3: Sacar todas con un ciclo while
	console.log("\n3. Sacando todas las canciones con pop()...");
	while (!pila.estáVacia()) {
		const cancion = pila.pop();
		console.log(`   Sacada: ${cancion.titulo}`);
	}

	// Paso 4: Intentar sacar una más
	console.log("\n4. Intentando sacar de pila vacía...");
	const resultado = pila.pop();
	if (resultado === null) {
		console.log(`   Error Pila vacía: no hay que sacar`);
	}
}

function pruebaP4(canciones) {
	console.log("\n--- Paso 4: Editor de Playlist ---");
	const editor = new EditorPlaylist();

	// Paso 1: Agregar canción 1 del álbum
	console.log("\nPaso 1: agregar canción 1");
	editor.agregarCancion(canciones[0]);
	editor.mostrar();

	// Paso 2: agregar canción 2
	console.log("\nPaso 2: agregar canción 2");
	editor.agregarCancion(canciones[1]);
	editor.mostrar();

	// Paso 3: agregar canción 3
	console.log("\nPaso 3: agregar canción 3");
	editor.agregarCancion(canciones[2]);
	editor.mostrar();

	// Paso 4: agregar canción 4
	console.log("\nPaso 4: agregar canción 4");
	editor.agregarCancion(canciones[3]);
	editor.mostrar();

	// Paso 5: deshacer
	console.log("\nPaso 5: deshacer");
	editor.deshacer();
	editor.mostrar();

	// Paso 6: deshacer
	console.log("\nPaso 6: deshacer");
	editor.deshacer();
	editor.mostrar();

	// Paso 7: eliminar(1)
	console.log("\nPaso 7: eliminar(1)");
	editor.eliminar(1);
	editor.mostrar();

	// Paso 8: rehacer
	console.log("\nPaso 8: rehacer");
	editor.rehacer();
	editor.mostrar();

	// Paso 9: deshacer
	console.log("\nPaso 9: deshacer");
	editor.deshacer();
	editor.mostrar();

	// Paso 10: deshacer
	console.log("\nPaso 10: deshacer");
	editor.deshacer();
	editor.mostrar();

	// Paso 11: deshacer
	console.log("\nPaso 11: deshacer");
	editor.deshacer();
	editor.mostrar();

	// Paso 12: deshacer
	console.log("\nPaso 12: deshacer");
	editor.deshacer();
	editor.mostrar();

	// Paso 13: agregar canción 4
	console.log("\nPaso 13: agregar canción 4");
	editor.agregarCancion(canciones[3]);
	editor.mostrar();
}


function main() {
	const canciones = [
		new Cancion("Try again", "Pierre Bourne", 185),
		new Cancion("Feds", "Pierre Bourne", 210),
		new Cancion("Horoscopes", "Pierre Bourne", 195),
		new Cancion("Lovers", "Pierre Bourne", 230),
	];
	const album = new Album("TLOP 5", 2026, canciones);

	console.log(`${album.titulo} (${album.anio}) - ${album.cantidad()} canciones`);
	album.canciones.forEach((cancion, indice) => {
		console.log(`${indice + 1}. ${cancion.titulo} - ${cancion.artista} - ${cancion.formatoTiempo(cancion.duracion)}`);
	});
	console.log(`Duracion: ${canciones[0].formatoTiempo(album.duraciontotal())}`);

	// Ejecutar pruebaP4 (Editor de Playlist)
	pruebaP4(canciones);
}

main();