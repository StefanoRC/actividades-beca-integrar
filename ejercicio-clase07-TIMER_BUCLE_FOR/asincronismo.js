//TIMER CON BUCLE FOR
//Hacer un timer que muestre en pantalla una cuenta del 1 al 10 mediante el uso de un bucle for.
//Una vez realizado el timer, verificar que es lo que sucede si en lugar de utilizar let para declarar el iterador del bucle, se usa var.
//Intentar corregir dicho comportamiento, considerando que parte es sincrónica del código y cual asincrónica.


for (let i = 1; i <= 10; i++) {
  setTimeout(() => {
    console.log(`Queda ${i} segundos con let`);
  }, 1000 * i);
}



//AL USAR VAR EN UN BLOQUE FOR, LO QUE HACE ES HOISTED, ES COMO SI SE ELEVARA ESE 'VAR I',
//YA SEA DENTRO DE LA FUNCION Y FUERA DEL BLOQUE FOR O FUERA DEL BLOQUE EN UN ENTORNO GLOBAL
//ADEMAS SE COMPARTE ESE MISMO VAR 'I' EN CADA ITERACION Y NO SE CREA UNA NUEVA , ASI LLEGANDO A 11
//AL SER EL FOR SINCRONA Y SETTIMEOUT()ASYNC, EL FOR TERMINA SU ITERACION Y LUEGO SE EJECUTA EL SETTIMEOUT, POR ESO SE VE 11 EN CADA ITERACION 
//EN RESUMEN POR EL HILO DE EJECUCION DE JS PASA ESTO, YA QUE EL EVENT LOOP DICE QUE PRIMERO SE EJECUTE EL FOR DEJANDO 'I' EN 11 Y LUEGO EL SETTIMEOUT

for (var i = 1; i <= 10; i++) {
    setTimeout(() => {
      console.log(`Queda ${i} segundos con var`);
    }, 1000 * i);
  }
  


async function forVar() {
  for (var i = 1; i <= 10; i++) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Queda ${i} segundo con var asyn await promise`)
    } catch (error) {
      console.log("ERROR CON EL TIMER");
    }
  }
}

forVar();

