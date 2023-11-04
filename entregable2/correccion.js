// CÓDIGO CORREGIDO

const fs = require('fs');



class ProductManager {

    constructor() {

        this.products = [];

        this.path = "./products.json";

    };



    // Modificaciones de convención y corrección de código.

    async addProduct(title, description, price, thumbnail, code, stock) {

        const existingProduct = this.products.find((product) => product.code === code); // Modifiqué el nombre "sumarProducto" a "existingProduct"



        if (existingProduct) {

            console.log("Código repetido");

            return;

        };



        // Creamos la constante "product" luego de verificar si el producto existía previamente o no. De esta forma optimizamos el espacio.

        // Recordemos que, cada variable almacena espacio en memoria. Por lo tanto, validar las condiciones posibles que puedan parar la función antes de crear dicha variable, permite evitar el consumo innecesario del dispositivo.

        const product = {

            title,

            description,

            price,

            thumbnail,

            code,

            stock,

        };



        if (this.products.length === 0) {

            product.id = 1;

        } else {

            product.id = this.products[this.products.length - 1].id + 1;

        };



        this.products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products));

    };



    // Modificaciones de convención.

    async getProducts() {

        const products = await fs.promises.readFile(this.path, "utf-8");

        // Modificaciones de convención. Por un lado, una variable que no se modifica se declara constante "const". Por el otro, las variables suelen funcionar como contenedores de datos, por lo que suelen nombrarse con los datos establecidos y no como la funcionalidad para arribar a ellos.

        const parsedProducts = await JSON.parse(products); // Cambio de "let" a "const" y de "parseProducts" a "parsedProducts"

        console.log(parsedProducts);

        return parsedProducts;

    };



    // Modificaciones de convención.

    async getProductById(productId) {

        const products = await this.getProducts(); // Cambio de "productsByID" a "products"

        const product = products.find((product) => product.id == productId); // Cambio de "byId" a "product"



        if (product) {

            console.log(product);

        } else {

            console.log("Producto no encontrado");

        };

    };



    // Simplificación de código.

    // Requerimos el identificador "id" por un lado y el objeto actualizado "updatedProduct" por el otro.

    async updateProduct(id, updatedProduct) {

        // Obtenemos los productos con la función "this.getProducts()"

        const products = await this.getProducts();

        // Encontramos el índice (index) del producto a actualizar a través del identificador (id).

        const index = products.findIndex((product) => product.id == id);



        // Verificamos que dicho producto exista.

        if (index === -1) {

            console.log("Producto no encontrado");

            return;

        };



        // Seleccionamos el producto a actualizar mediante su índice (index) y lo igualamos al objeto actualizado (updatedProduct).

        products[index] = updatedProduct;

        // Reescribimos el archivo "products.json".

        await fs.promises.writeFile(this.path, JSON.stringify(products));

    };



    // Corrección y simplificación de código.

    async deleteProduct(productId) {

        const products = await this.getProducts(); // Obtenemos los productos con la función "this.getProducts()"

        const index = products.findIndex((product) => product.id === productId); // Encontramos el índice (index) del producto a actualizar a través del identificador (id).



        // Verificamos que dicho producto exista.

        if (index === -1) {

            console.log("Producto no encontrado");

            return;

        };



        // CAMBIAMOS EL MÉTODO "SLICE" POR "SPLICE" PARA ELIMINAR UN PRODUCTO CORRECTAMENTE.

        // Recordemos que el método "slice()" no elimina un producto directamente del array, sino que devuelve un nuevo array con dicho producto eliminado. En otras palabras, no modifica el array de productos que deseamos modificar.

        // En cambio, el método "splice()" modifica el array original eliminando o reemplazando elementos existentes.

        products.splice(index, 1);

        await fs.promises.writeFile(this.path, JSON.stringify(products));

        console.log("Producto eliminado");

    };

};



//Test de instancia de ProductManager

const product = new ProductManager();

product.addProduct("arroz", "marolio", 200, "sin imagen", 123213, 10);

product.addProduct("yerba", "marolio", 500, "sin imagen", 121344, 5);

product.getProducts();

product.getProductById(1);

product.updateProduct(3, {

  title: "fideos",

  description: "303",

  price: 510,

  thumbnail: "sin imagen",

  code: 412444,

  stock: 5,

});

product.deleteProduct(1);