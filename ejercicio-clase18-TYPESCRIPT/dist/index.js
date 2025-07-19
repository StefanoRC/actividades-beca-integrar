/*Ejercicio 1: Utility Types
Crea un sistema de gestión de productos que use Partial, Pick y Omit para diferentes operaciones ABM.*/
console.log("/////////EJERCICIO 1////////////");
let id = 0;
let productArray = [];
function createProduct(product) {
    id++;
    const newProduct = {
        id,
        name: product.name,
        price: product.price,
        stock: true,
    };
    productArray.push(newProduct);
}
createProduct({ name: "azucar", price: 10 });
createProduct({ name: "arroz", price: 20 });
console.log(productArray);
function deleteProuct(product) {
    const indexProductArray = productArray.findIndex((p) => p.id === product.id);
    if (indexProductArray !== -1) {
        productArray.splice(indexProductArray, 1);
    }
}
deleteProuct({ id: 2 });
console.log(productArray);
///////////////////////////////////////////////////
//partial
function updateProduct(id, updates) {
    const index = productArray.findIndex((p) => p.id === id);
    if (index !== -1) {
        productArray[index] = Object.assign(Object.assign({}, productArray[index]), updates);
    }
}
updateProduct(1, { name: "cacao" });
console.log(productArray);
/*Ejercicio 2: Clases con Types
Implementa un sistema de usuarios con roles, usando herencia, interfaces y modificadores de acceso apropiados.
cada uno tenga su propia clase y ver como usar herencia, si hay abstracto, si hay protect o private*/
console.log("/////////EJERCICIO 2////////////");
class Person {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
Person.userArray = [];
Person.userId = 0;
class Moderator extends Person {
    constructor(id, name, email, office) {
        super(id, name, email);
        this.office = office;
    }
    newAccount(name, email) {
        Person.userId++;
        const newMod = new Moderator(Person.userId, name, email, this.office);
        Person.userArray.push(newMod);
    }
    deleteMessage() {
        console.log("se ha borrado el mensaje");
    }
    getAllUsers() {
        Person.userArray.forEach((user) => {
            console.log(`NAME: ${user.name} / EMAIL:${user.email}`);
        });
    }
}
class Administrator extends Person {
    constructor(id, name, email, office, parkingNumber) {
        super(id, name, email);
        this.office = office;
        this.parkingNumber = parkingNumber;
    }
    deleteMessage() {
        console.log("se ha borrado el mensaje");
    }
    newAccount(name, email) {
        Person.userId++;
        const newAdmin = new Administrator(Person.userId, name, email, this.office, this.parkingNumber);
        Person.userArray.push(newAdmin);
    }
    getAllUsers() {
        Person.userArray.forEach((user) => {
            console.log(`ID: ${user.id} / NAME: ${user.name} / EMAIL:${user.email}`);
        });
    }
    deletePeople() {
        console.log("se borro una cuenta");
    }
}
class Viewer extends Person {
    constructor(id, name, email) {
        super(id, name, email);
    }
    newAccount(name, email) {
        Person.userId++;
        const newViewer = new Viewer(Viewer.userId, name, email);
        Person.userArray.push(newViewer);
    }
    getAllUsers() {
        console.log("No tienes esta opcion habilitada");
    }
}
const mod1 = new Moderator(1, "mod1", "mod@mod", 25);
mod1.newAccount("stefano", "ste@ste");
const admin1 = new Administrator(1, "admin1", "admin@admin", 621, 6);
admin1.newAccount("mayra", "may@may");
const viewer1 = new Viewer(1, "viewer1", "viewer@viewer");
viewer1.getAllUsers();
admin1.getAllUsers();
mod1.getAllUsers();
viewer1.getAllUsers();
/*Ejercicio 3: Construye un sistema de cache genérico que pueda almacenar cualquier tipo de dato con TTL (time to live).
Utiliza una clase con métodos set, get y cleanup. */
console.log("/////////EJERCICIO 3////////////");
class CreatorCache {
    constructor(value, expiresAt = Date.now()) {
        this.value = value;
        this.expiresAt = expiresAt;
    }
    static create(value, ttl) {
        return new CreatorCache(value, Date.now() + ttl);
    }
    expired() {
        return Date.now() > this.expiresAt;
    }
}
class CacheMain {
    constructor() {
        this.localStorage = new Map();
    }
    set(key, value, ttl) {
        this.localStorage.set(key, CreatorCache.create(value, ttl));
    }
    get(key) {
        const entry = this.localStorage.get(key);
        if (!entry || entry.expired()) {
            this.localStorage.delete(key);
            return undefined;
        }
        return entry.value;
    }
}
const cache1 = new CacheMain();
const cache2 = new CacheMain();
cache1.set("texto", "Este mensaje se autodestruirá", 4000);
cache2.set("numero", 2, 7000);
console.log("Primer ciclo:");
console.log(`mensaje: ${cache1.get("texto")}`);
console.log(`numero: ${cache2.get("numero")}`);
setTimeout(() => {
    console.log("Segundo ciclo:");
    console.log(`mensaje: ${cache1.get("texto")}`);
    console.log(`activo: ${cache2.get("numero")}`);
}, 5000);
