/////Realizar un fetch a https://fakestoreapi.com/products para obtener todos los productos/////
async function fetchData() {
  try {
    const result = await fetch("https://fakestoreapi.com/products");
    const products = await result.json();
    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

//////Crear una función que filtre productos por categoría//////
function filterCategorys(products, categorys) {
  try {
    return products.filter((products) => products.category == categorys);
  } catch (error) {
    console.log(error);
    return [];
  }
}

//////Implementar una función que ordene productos por precio (ascendente/descendente)//////
function OrderByPrice(products, order) {
  try {
    return [...products].sort((a, b) => {
      if (order == "asc") {
        return a.price - b.price;
      } else if (order == "desc") {
        return b.price - a.price;
      }
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

//////Desarrollar una función que calcule el precio promedio por categoría//////
function pricePromedyCategorys(products, categorys) {
  try {
    const category = filterCategorys(products, categorys);
    if (category.length > 0) {
      const priceCategory = category.map((num) => num.price);
      const promedyCategory = priceCategory.reduce((acc, num) => acc + num, 0);
      const promedyFinal = promedyCategory / category.length;
      return promedyFinal.toFixed(2);
    } else {
      return "No hay productos en esta categoria";
    }
  } catch (error) {
    console.log(error);
  }
}

//////Crear una función que busque productos por nombre (incluso con coincidencias parciales)//////
function nameProduct(products, productTitle) {
  try {
    const titles = products.filter((product) =>
      product.title.toLowerCase().includes(productTitle.toLowerCase())
    );
    return titles;
  } catch (error) {
    console.log(error);
    return [];
  }
}

//////Agrupar los productos en un objeto donde las claves (key) sean las categorías//////
function groupProductsByCategory(products) {
  try {
    const groupProducts = {};
    products.map((product) => {
      const category = product.category;
      if (groupProducts[category]) {
        groupProducts[category].push(product);
      } else {
        groupProducts[category] = [product];
      }
    });
    return groupProducts;
  } catch (error) {
    console.log(error);
    return {};
  }
}

//////Encontrar el producto más caro y el más barato de cada categoría//////
function orderByPriceByCategory(products) {
  try {
    const result = {};
    Object.keys(products).map((category) => {
      const productsFinal = products[category];
      const sorted = [...productsFinal].sort((a, b) => b.price - a.price);
      result[category] = {
        expensive: sorted[0],
        cheap: sorted[sorted.length - 1],
      };
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

//////funcion Main//////
async function main() {
  const fetch = await fetchData();
  if (fetch.length > 0) {
    const filterCategory = filterCategorys(fetch, "men's clothing");
    console.log("Men's Clothing:", filterCategory);
    console.log("//////////////////////////////////");

    const OrderPrice = OrderByPrice(fetch, "desc");
    console.log(OrderPrice);
    console.log("//////////////////////////////////");

    const pricePromedy = pricePromedyCategorys(fetch, "women's clothing");
    console.log(pricePromedy);
    console.log("//////////////////////////////////");

    const nameProdcut = nameProduct(fetch, "Fjallraven");
    console.log(nameProdcut);
    console.log("//////////////////////////////////");

    const groupByCategory = groupProductsByCategory(fetch);
    console.log(groupByCategory);
    console.log("//////////////////////////////////");

    const priceCategory = orderByPriceByCategory(groupByCategory);
    console.log(priceCategory);
  } else {
    console.log("No hay resultados");
  }
}

main();
