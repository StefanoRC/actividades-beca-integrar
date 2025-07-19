/*Ejercicio 1: Utility Types
Crea un sistema de gestión de productos que use Partial, Pick y Omit para diferentes operaciones ABM.*/
console.log("/////////EJERCICIO 1////////////");

//pick
interface Product {
  id: number;
  name: string;
  price: number;
  stock: boolean;
}
let id = 0;
let productArray: Product[] = [];

type ProductPick = Pick<Product, "name" | "price">;

function createProduct(product: ProductPick) {
  id++;
  const newProduct: Product = {
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
///////////////////////////////////////////////////
//omit
type ProductOmit = Omit<Product, "name" | "price" | "stock">;

function deleteProuct(product: ProductOmit) {
  const indexProductArray = productArray.findIndex((p) => p.id === product.id);
  if (indexProductArray !== -1) {
    productArray.splice(indexProductArray, 1);
  }
}

deleteProuct({ id: 2 });
console.log(productArray);
///////////////////////////////////////////////////
//partial
function updateProduct(id: number, updates: Partial<Product>) {
  const index = productArray.findIndex((p) => p.id === id);
  if (index !== -1) {
    productArray[index] = { ...productArray[index], ...updates };
  }
}

updateProduct(1, { name: "cacao" });
console.log(productArray);

/*Ejercicio 2: Clases con Types
Implementa un sistema de usuarios con roles, usando herencia, interfaces y modificadores de acceso apropiados.
cada uno tenga su propia clase y ver como usar herencia, si hay abstracto, si hay protect o private*/
console.log("/////////EJERCICIO 2////////////");

interface Moderator {
  office: number;
  deleteMessage(): void;
}

interface Administrator {
  office: number;
  parkingNumber: number;
  deleteMessage(): void;
  deletePeople(): void;
}

interface Viewer {}

abstract class Person {
  protected static userArray: Person[] = [];
  static userId: number = 0;
  constructor(public id: number, public name: string, public email: string) {}

  abstract newAccount(name: string, email: string): void;
  abstract getAllUsers();
}

class Moderator extends Person implements Moderator {
  constructor(id: number, name: string, email: string, public office: number) {
    super(id, name, email);
  }

  public newAccount(name: string, email: string): void {
    Person.userId++;
    const newMod = new Moderator(Person.userId, name, email, this.office);
    Person.userArray.push(newMod);
  }

  public deleteMessage(): void {
    console.log("se ha borrado el mensaje");
  }

  public getAllUsers() {
    Person.userArray.forEach((user) => {
      console.log(`NAME: ${user.name} / EMAIL:${user.email}`);
    });
  }
}

class Administrator extends Person implements Administrator {
  constructor(
    id: number,
    name: string,
    email: string,
    public office: number,
    public parkingNumber: number
  ) {
    super(id, name, email);
  }
  public deleteMessage(): void {
    console.log("se ha borrado el mensaje");
  }

  public newAccount(name: string, email: string): void {
    Person.userId++;
    const newAdmin = new Administrator(
      Person.userId,
      name,
      email,
      this.office,
      this.parkingNumber
    );
    Person.userArray.push(newAdmin);
  }

  public getAllUsers() {
    Person.userArray.forEach((user) => {
      console.log(`ID: ${user.id} / NAME: ${user.name} / EMAIL:${user.email}`);
    });
  }

  public deletePeople(): void {
    console.log("se borro una cuenta");
  }
}

class Viewer extends Person implements Viewer {
  constructor(id: number, name: string, email: string) {
    super(id, name, email);
  }

  public newAccount(name: string, email: string): void {
    Person.userId++;
    const newViewer = new Viewer(Viewer.userId, name, email);
    Person.userArray.push(newViewer);
  }

  public getAllUsers() {
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

class CreatorCache<T> {
  constructor(
    public readonly value: T,
    private readonly expiresAt: number = Date.now()
  ) {}

  static create<T>(value: T, ttl: number): CreatorCache<T> {
    return new CreatorCache(value, Date.now() + ttl);
  }

  public expired(): boolean {
    return Date.now() > this.expiresAt;
  }
}

class CacheMain<T> {
  private localStorage = new Map<string, CreatorCache<T>>();

  public set(key: string, value: T, ttl: number): void {
    this.localStorage.set(key, CreatorCache.create(value, ttl));
  }

  public get(key: string): T | undefined {
    const entry = this.localStorage.get(key);
    if (!entry || entry.expired()) {
      this.localStorage.delete(key);
      return undefined;
    }
    return entry.value;
  }
}

const cache1 = new CacheMain<string>();
const cache2 = new CacheMain<number>();

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