#pragma once
#include <iostream>
#include <string>

using namespace std;

class Cancion
{
public:
	string Titulo;
	string Artista;
	int Duracion;

	string formatoTiempo()
	{
		int minutos = Duracion / 60;
		int segundosRestantes = Duracion % 60;
		string resultado = to_string(minutos)+ ":" + to_string(segundosRestantes);
		return resultado;
	}

	string format()
	{
		return "Titulo: " + Titulo + ", Artista: " + Artista + ", Duracion: " + formatoTiempo();
	}
};



