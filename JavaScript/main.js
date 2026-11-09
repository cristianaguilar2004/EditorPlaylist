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

	// Ejecutar prebarP1
	prebarP1(canciones);
}

main();