var palabra;
var palabraEscondida = [];
var letra;
var espacios;
var posicion;  
var intentos = 0;     
var maxintentos = 7;
var indice = 0;
var juegoNuevo = true;
//
var vecpalabras = ["elefante", "hipopotamo", "jirafa", "rinoceronte", "hormiga"];
//
var dibujo = document.getElementById("areaDibujo");
var papel = dibujo.getContext("2d");
//
var dibujoPalabra = document.getElementById("areaPalabra");
var papelPalabra = dibujoPalabra.getContext("2d");
//
var fondo = {
    url: "init.png",
    cargaOK: false
  }
//
var texto = document.getElementById("texto_letra");
var boton = document.getElementById("boton_letra");
boton.addEventListener("click",verificarLetra);
//
fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener("load", cargarFondo);

function jugar() {    
    juegoNuevo = false;
    indice = seleccionaPalabra();    
    console.log("indice: " + indice);
    palabra = vecpalabras[indice]; 
    console.log("palabra: " + palabra);      
    espacios = palabra.length;    
    console.log("espacios: " + espacios);    
    generarPalabraEscondida(espacios);    
}



function cargarFondo(){    
    fondo.cargaOK = true;
    dibujarFondo();    
  if(juegoNuevo == true)
  {    
    jugar();           
  }

}


function dibujarFondo()
{
  if(fondo.cargaOK)
  {
    
    papel.fillStyle = '#F0DB4F'; // le damos un color de llenado al contexto
    // dibujamos un cuadrado con el color de llenado
    papel.fillRect(0, 0, 300, 300); // fillRect(x, y, largo, alto)
    // le damos al contexto un tamaño y color de linea
    papel.lineWidth = 3;
    papel.strokeStyle = 'black';
    // dibujamos un cuadrado pero solo de contorno
    papel.strokeRect(1, 1, 298, 298); // strokeRect(x, y, largo, alto)
    // dibujamos la Imagen de Fondo
    papel.drawImage(fondo.imagen, 20, 20);        
  }
}

function dibujar(numDibujo)
{
    //fondo.imagen = new Image();
    fondo.imagen.src= numDibujo + ".png"; 
    papel.drawImage(fondo.imagen, 0, 0);
}

function seleccionaPalabra()
{
  var resultado;
  var min = 0;
  var maxi = vecpalabras.length - 1;
  resultado = Math.floor(Math.random() * (maxi - min + 1)) + min;
  return resultado;
}

function dibujarPalabra(palabra)
{
    papelPalabra.lineWidth = 3;
    papelPalabra.strokeStyle = 'red';
    // asignamos al contexto el tipo de letra, tamaño y posicion inicial
    papelPalabra.font = 'bold 32px sans-serif';
    papelPalabra.textBaseline = 'top';
    
    //Limpiamos el contexto dibujando un rectangulo transparente
    papelPalabra.clearRect(0,0,600,100);

    // dibujamos el texto    
    papelPalabra.fillText(palabra, 0, 0); // fillText(texto, x, y);
}

function generarPalabraEscondida(numEspacios)
{
    for (var index = 0; index < numEspacios; index++) {
        palabraEscondida[index] = '_';                
    }
    dibujarPalabra(palabraEscondida);
}

function verificarLetra()
{         
        letra = texto.value;
        if(letra.length == 1)
        {
            if(palabraEscondida.indexOf(letra,0) < 0)
            {
                posicion = palabra.indexOf(letra,0); 
                console.log(posicion);                                    
                if (posicion >= 0) 
                {                                
                    while ((posicion >= 0) && (posicion < palabra.length))
                    {
                        console.log(letra + " | " + posicion + " | " + espacios);
                        espacios = espacios - 1;
                        palabraEscondida[posicion] = letra;
                        dibujarPalabra(palabraEscondida);
                        posicion = palabra.indexOf(letra,posicion+1);                
                    }          
                } else 
                {
                    intentos = intentos + 1;                                       
                    posicion = 0;
                    console.log("** intentos: " + intentos);
                    dibujar(intentos);            
                }
            }
            // Validando que la letra no haya sido usada
            else
            {
                alert("Esa letra ya la jugaste");
            }
        // Validando que ingrese una sola letra                        
        }
        else 
        {
            alert("Por favor digita una letra");                        
        }
         
        texto.value = "";
        texto.focus();
        //
        if(intentos >= 7) 
        {
            dibujar("final"); 
            boton.disabled = true; 
            dibujarPalabra("La palabra era: " + palabra);                    
        }
        if(espacios <= 0)
        {                         
            dibujar("winner");    
            boton.disabled = true;                               
        }
}

