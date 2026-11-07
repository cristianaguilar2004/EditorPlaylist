#pragma once
#include <iostream>
#include <string>
#include "Cancion.h"
#include <array>

using namespace std;

class Album
{
public:
	string Titulo;
	int anio;
	std::array<Cancion, 4> canciones;

	int cantidad()
	{
		return canciones.size();
	}

	int duracionTotal()
	{
		int tiempoTotal = 0;
		for (int i = 0; i < canciones.size(); i++)
		{
			tiempoTotal += canciones[i].Duracion;
		}

		return tiempoTotal;
	}

	string formatoTiempo()
	{
		int minutos = duracionTotal() / 60;
		int segundosRestantes = duracionTotal() % 60;
		string resultado = to_string(minutos) + ":" + to_string(segundosRestantes);
		return resultado;
	}
};

