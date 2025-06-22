console.log("EJERCICIO 1:");
//Haga una función que elimine el primer elemento del arreglo.

let arrayNumbers = [1, 2, 3, 4, 5];

function shiftArray(array) {
  console.log(`Antes de eliminar el primer elemento: ${array}`);
  array.shift();
  console.log(`Despues de eliminar el primer elemento: ${array}`);
}

shiftArray(arrayNumbers);

console.log(
  "//////////////////////////////////////////////////////////////////////////////////////////"
);
console.log("EJERCICIO 2:");
/* Haga una función:
que solo reciba arreglos con más de 5 elementos y luego elimine los últimos 3

En caso de recibir un arreglo de menos de 5 elementos:
mostrar en pantalla un mensaje de error. */

let arrayNumbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function arrayFiveElement(array) {
  if (array.length > 5) {
    console.log(`estos elementos se eliminaran: ${array.splice(-3, 3)}`);
    console.log(`Asi quedo el array actual: [${array}]`);
  } else {
    console.log(
      `error es un array de '${array.length}' elementos, solo se permiten minimo '5' elementos`
    );
  }
}

arrayFiveElement(arrayNumbers2);

console.log(
  "//////////////////////////////////////////////////////////////////////////////////////////"
);
console.log("EJERCICIO 3:");
/*Haga una función que: reciba un arreglo y un número. 
Tenemos que sumarle dicho número a cada elemento del arreglo y
devolver el arreglo modificado. */

let arrayNumbers3 = [1, 2, 3, 4, 5];

function arraySumaElement(array, number) {
  let newArray = array.map((num) => num + number);
  console.log(
    `la suma del numero dado: '${number}' + el de cada elemento del array: [${array}] es = [${newArray}]`
  );
}

arraySumaElement(arrayNumbers3, 500);

console.log(
  "//////////////////////////////////////////////////////////////////////////////////////////"
);
console.log("EJERCICIO 4:");
/*Haga una función que reciba un número y devuelva un arreglo que tenga el tamaño del número recibido.
El contenido del arreglo deben ser números desde el 1 hasta el número recibido. (1 a n)*/

function newArreglo(numberElements) {
  let newArray = new Array(numberElements);
  for (i = 0; i < newArray.length; i++) {
    newArray[i] = i + 1;
  }
  console.log(
    `le pasamos '${numberElements}' espacios al array y quedaria de esta forma: [${newArray}]`
  );
}

newArreglo(8);

console.log(
  "//////////////////////////////////////////////////////////////////////////////////////////"
);
console.log("EJERCICIO 5:");
/*Hay un arreglo con varios números donde todos son iguales excepto uno. Haga una función que encuentre qué número es el distinto.*/
//findUniq([1,1,1,1,1,2,1,1,1])   # return (2)

function findUniq(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] != 1) {
      console.log(`el elemento '${array[i]}' es el valor diferente`);
    }
  }
}

findUniq([1, 1, 1, 1, 1, 2, 1, 1, 1]);

console.log(
  "//////////////////////////////////////////////////////////////////////////////////////////"
);
console.log("EJERCICIO 6:");
//Dado un arreglo de números enteros, encuentre y devuelva el valor de la menor suma posible entre ellos.
//minSum([7,4,2,3])    # return (5)

function minSum(array) {
  array.sort((a, b) => a - b);
  result = array[0] + array[1];
  console.log(`la menor suma posible da '${result}'`);
}

minSum([7, 4, 2, 3]);

console.log(
  "//////////////////////////////////////////////////////////////////////////////////////////"
);
console.log("EJERCICIO 7:");
//Dado un arreglo de números enteros, encuentre el mayor producto posible entre dos números adyacentes y devuelva el valor de dicho producto.
/* adjacentElementsProduct([9,5,10,2,24,-1])  # return (50) # 5 * 10 = 50 */

function adjacentElementsProduct(array) {
  let maxNumber = 0;
  for (let i = 0; i < array.length; i++) {
    const result = array[i] * array[i + 1];
    if (result > maxNumber) {
      maxNumber = result;
    }
  }
  return console.log(
    `el numero mas alto conseguido adyacentemente es: '${maxNumber}'`
  );
}

adjacentElementsProduct([9, 5, 10, 2, 24, -1]);

console.log(
  "//////////////////////////////////////////////////////////////////////////////////////////"
);
console.log("EJERCICIO 8:");
//Tenemos un grupo de ovejas amenazadas por un lobo y necesitamos saber a cuál se está por comer.
//Consideramos que tenemos a las ovejas y al lobo en un arreglo y que en ese mismo consideramos al último elemento como el primero.
//Consideración: El lobo solo puede comer a la oveja que tiene a su derecha.

/* warnTheSheep(["sheep", "sheep", "sheep", "wolf", "sheep"])
# "Hey! Oveja numero 1! El lobo esta cerca!"

warnTheSheep(["sheep", "sheep", "sheep", "wolf"])
# "No sigas comiendo ovejas!" */

function warnTheSheep(array) {
  const lastIndex = array.length - 1;
  if (array[lastIndex] == "sheep" && array[lastIndex - 1] == "wolf") {
    console.log("Hey! Oveja numero 1! El lobo esta cerca!");
  } else {
    console.log("No sigas comiendo ovejas!");
  }
}

warnTheSheep(["sheep", "sheep", "sheep", "wolf", "sheep"]);
warnTheSheep(["sheep", "sheep", "sheep", "sheep", "wolf"]);
