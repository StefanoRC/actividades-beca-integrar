//Anota todas las malas practicas que encuentres y luego modifica el código para que esté bien estructurado según tu criterio y las pautas vistas en clase.

//MALAS PRACTICAS
/* function CalculateTotal(items, tax, discount) { var VALOR_TOTAL = 0;

  for(var i = 0; i < items.length; i++) { VALOR_TOTAL += items[i]; 
 } VALOR_TOTAL += VALOR_TOTAL * tax; if(discount) { VALOR_TOTAL -= VALOR_TOTAL * discount; } 
       return VALOR_TOTAL.toFixed(2); } var items = [10, 20, 30]; 
 var tax = 0.05; 
 var discount = 0.10; var ElprOFeEstuvo_aQui = CalculateTotal(items, tax, discount); 
 
 console.log("Total: " + ElprOFeEstuvo_aQui); */

//BUENAS PRACTICAS
const values = {
  array: [10, 20, 30],
  tax: 0.05,
  discount: 0.1,
};

function calculateTotal({ array, tax, discount }) {
  let valueTotal = array.reduce((acc, num) => acc + num, 0);

  valueTotal += valueTotal * tax;

  discount && (valueTotal -= valueTotal * discount);

  return valueTotal.toFixed(2);
}

try {
  const result = calculateTotal(values);
  console.log(`Total: ${result}`);
} catch (error) {
  console.log("ERROR: Halgo no ha salido bien");
}

/*
1- FORMATEE EL DOCUMENTO CON PRETTIER PORQUE ESTABA MAL FORMATEADO
2- CAMBIAR TODOS LOS VAR, POR LET Y CONST
3- LA FUNCION EMPIEZA CON MAYUSCULA Y TIENE SER SER EN camelCase
4- LOS NOMBRES DE VARIABLES TIENEN QUE IR EN MINUSCULA Y SI ES snake-case, TODO EN MINUSC y bien separado
5- EN EL CONSOLE.LOG SE PUEEDE USAR TEMPLATE LITERALS
6- EL FOR DE LA FUNCION NO ES NECESARIO YA QUE HAY UN METODO QUE NOS SUMA LO DE UN ARRAY
7- LAS VARIABLE SIEMPRE VAN AL INICIO DEL DOCUMENTO
8- NOMBRE DE VARIABLE (el profe estuvo aqui) INNECESARIA
9- HACER LA FUNCION DESTRUCTURADA PARA PODER PASAR EL ARGUMENTO ESPECIFICO, YA QUE PUEDE EN UN FUTURO HABER VARIOS TAX O DISCOUNT
10-LOS VALORES HACERLO OBJETO
11-MANEJO DE ERROR CON TRY/CATCH
12-EN VEZ DE UN IF, CAMBIARLO POR UN SHORT CUIRT
*/

//Diccionario - Map
//Realiza la implementación de una calculadora básica con JavaScript.
// Para ello crea las funciones de sumar, restar, multiplicar y dividir.
// Utiliza un diccionario o un map para organizar el código y respeta las prácticas vistas en esta clase.

const operador = new Map([
  ["SUMAR", (x, y) => x + y],
  ["RESTAR", (x, y) => x - y],
  ["MULTIPLICAR", (x, y) => x * y],
  [
    "DIVIDIR",
    (x, y) => {
      if (y === 0) {
        throw new Error("no se puede dividir por 0");
      }
      return x / y;
    },
  ],
]);

function calculadora(operacion, numero1, numero2) {
  const operacionMayus = operacion.toUpperCase();
  if (operador.has(operacionMayus)) {
    const resultado = operador.get(operacionMayus)(numero1, numero2);
    return console.log(resultado);
  } else {
    console.log("Compruebe si escribio bien la operacion");
  }
}

try {
  calculadora("sumar", 2, 1);
  calculadora("restar", 2, 1);
  calculadora("MULTIPLICAR", 2, 2);
  calculadora("DIVIDIR", 2, 0);
} catch (error) {
  console.log("Hubo un error:", error.message);
}
