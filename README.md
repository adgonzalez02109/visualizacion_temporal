# ¿Los delicuentes si estan siendo capturados?


Overview de como se ha comportado el numero de capturas en los ultimos 18 años.
En la siguiente visualización puedes ver el numero de capturas por día de 2000 a 2018, información extraida de https://www.datos.gov.co/Justicia-y-Derecho/Evoluci-n-reincidencia/53ri-ucd8 del dataset de Evolución reincidencia. Cada punto representa el numero de capturas diarias, si te paras son un punto mostrará el día y el numero de capturas en la parte superior y con los filtros por rangos de edades se puede filtrar la información (se pueden seleccionar varios a la vez).
Enjoy!

WHAT

Se ultilizó una tabla de item de la cual se usaron los siguientes campos:
EDAD (cuantitativo secuencial): Este campo tiene las edades de las personas capturadas e inicia en 19 años.
RANGO EDAD: (categorico ordenado):Este campo es calculado y tiene los rangos de edad a las que pertenecen las personas capturadas
FECHA_CAPTURA (time con año, mes y dia): Este campo tiene el día en que fue capturada la persona.
NUMERO CAPTURADOS: (cuantitativo secuencial): Este campo es calculado y tiene el numero de capturados por día.


WHY

EXPLORE TRENDS AND OUTLIERS: Pretende ver una tendencia y valores atipicos en el numero de capturas diarias durante los años  por edades o en cualquier ubicación en el tiempo.

DISCOVER FEATURES: Permite ver en cada día cuantos arrestos hubo.
BROWSE: Permite consultar el numero de capturador por rangos de edad. 

HOW

Por medio de la marca punto se usaron los canales de order and align para los ejes X y Y dado que ambos ejes son ordenados secuenciales y luminance para evidenciar outliers.

Al canal de puntos se aplicó un manipulate de change dado que con los filtros cambian las posiciones de los puntos con transición, select dado que se puede ubicar un punto y se muestra su valor, y navigate dado que se puede seleccionar uno o varios rangos de edad.
Para el canal de color se uso un superimpose en el que la transparencia de los puntos es igual en todos pero si los puntos se superponen debido a un conjunto similar de capturas en un rango de tiempo pequeño las transparencias se superponen creando un efecto de luminance negativa.

A la visualización se le puede hacer un filter por rango de edad.


  Autor: Alvaro Diego Gonzalez Vesga
  
  Este proyecto se publica bajo la licencia de MIT.
  
  ![alt text](https://i.imgur.com/HcvkHlT.png)
