/* 1 Crear una interfaz Product con propiedades como nombre, precio, stock y una función para calcular el valor total.*/
console.log("//////////////////////////ejercicio 1/////////////////////////");
interface Product {
  name: string;
  price: number;
  stock: number;
}

//funcion valor total
const valueTotal = ({ name, stock, price }: Product) => {
  const valueTotal = stock * price;
  console.log(
    `el producto ${name} tiene en stock de ${stock}u y el precio total es de $${valueTotal}`
  );
};

valueTotal({ name: "desodorante", stock: 20, price: 10 });
valueTotal({ name: "dentrifico", stock: 10, price: 5 });

console.log("//////////////////////////ejercicio 2/////////////////////////");
/*2 Implementar un sistema de tipos para un carrito de compras con funciones para añadir/eliminar productos y calcular el total.*/
type ShoppingCart = Product & {
  quantity: number;
};

let cartUser: ShoppingCart[] = [];

type Items = {
  name: string;
  price: number;
  stock: number;
};

//añadir item
const add = (product: ShoppingCart) => {
  const existent = cartUser.find((item) => item.name === product.name);
  if (existent) {
    existent.quantity += product.quantity;
  } else {
    cartUser.push(product);
  }
};

add({ name: "jabon", stock: 3, price: 4, quantity: 8 });
add({ name: "cerveza", stock: 6, price: 14, quantity: 3 });
add({ name: "desodorante", stock: 8, price: 1, quantity: 4 });
add({ name: "repasador", stock: 24, price: 10, quantity: 7 });
add({ name: "cepillo de dientes", stock: 30, price: 15, quantity: 2 });
add({ name: "plato", stock: 3, price: 45, quantity: 1 });

console.log(`Su carrito tiene los siguientes items:`);
console.log(cartUser);

//borrar item
const deleteItem = (product: { name: string }) => {
  const initialLength = cartUser.length;
  cartUser = cartUser.filter((item) => item.name !== product.name);
  if (cartUser.length < initialLength) {
    console.log(
      `El producto "${product.name}" fue eliminado del carrito y del contenedor.`
    );
  } else {
    console.log(`El producto "${product.name}" no se encontró en el carrito.`);
  }
};

deleteItem({ name: "cepillo de dientes" });
console.log(cartUser);

//total del carrito
const totalCartUser = () => {
  const total = cartUser.reduce(
    (acc, number) => acc + number.price * number.quantity,
    0
  );
  console.log(`el total de su carrito es de $${total} `);
};

totalCartUser();

console.log("//////////////////////////ejercicio 3/////////////////////////");
/*3 Convertir una función JavaScript existente a TypeScript añadiendo tipos adecuados.*/

/* let arrayNumbers = [1, 2, 3, 4, 5];

function shiftArray(array) {
  console.log(`Antes de eliminar el primer elemento: ${array}`);
  array.shift();
  console.log(`Despues de eliminar el primer elemento: ${array}`);
}
  shiftArray(arrayNumbers);
   */

let arrayNumbers: number[] = [1, 2, 3, 4];

const shiftArrayNumber = (array: Array<number>) => {
  console.log(`antes de eliminar el primer elemento: ${arrayNumbers}`);
  array.shift();
  console.log(`Despues de eliminar el primer elemento: ${array}`);
};

shiftArrayNumber(arrayNumbers);
