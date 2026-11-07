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
}

main();