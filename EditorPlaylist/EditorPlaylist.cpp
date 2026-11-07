#include <iostream>
#include <string>
#include "Cancion.h"
#include "Album.h"

using namespace std;


int main()
{
    /*cancion*/
    Cancion cancion1;
    Cancion cancion2;
    Cancion cancion3;
    Cancion cancion4;

    cancion1.Artista = "Los tucanes de tijuana";
    cancion1.Titulo = "La chona";
    cancion1.Duracion = 200;

    cancion2.Artista = "Los tucanes de tijuana";
    cancion2.Titulo = "La puerta negra";
    cancion2.Duracion = 150;

    cancion3.Artista = "Ni parientes somos";
    cancion3.Titulo = "La chona";
    cancion3.Duracion = 200;

    cancion4.Artista = "Los tucanes de tijuana";
    cancion4.Titulo = "El aguila blanca";
    cancion4.Duracion = 300;

    Album album;
    album.Titulo = "Los extraterrestres";
    album.anio = 2025;
    album.canciones[0] = {cancion1};
    album.canciones[1] = {cancion2};
    album.canciones[2] = {cancion3};
    album.canciones[3] = {cancion4};

    cout <<  "Titulo: " + album.Titulo + ", Anio:" + to_string(album.anio) + ", Cantidad: " + to_string(album.cantidad()) << endl;


    for (int i = 0; i < album.canciones.size(); i++)
    {
        cout << to_string(i + 1) + ". " + album.canciones[i].format() << endl;
    }

    cout << endl << "Diracion del album: " + album.formatoTiempo() << endl;

    cout << endl;
    cout << endl;
    system("pause");
}



