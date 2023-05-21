const fs = require('fs');
// declaración de la clase productManager
class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.id = 1;
        this.loadProducts();
    }

    loadProducts() {
        // carga los productos del archivo
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                const lastProduct = this.products[this.products.length - 1];
                this.id = lastProduct.id + 1;
            }
        } catch (error) {
            console.log('Error al leer el archivo de productos:', error);
        }
    }

    saveProducts() {
        // guarda los productos en el archivo
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.log('Error al guardar el archivo de productos:', error);
        }
    }
    addProduct(product) {
        // comprueba si todos los campos obligatorios estan en los productos
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock
        ) {
            console.log('Todos los campos son obligatorios');
            return;
        }
        //comprueba si existen productos con el mismo codigo
        if (this.products.some((p) => p.code === product.code)) {
            console.log('Ya existe un producto con ese código');
            return;
        }
        // asigna un id unico al producto y lo agrega al array de productos
        product.id = this.id++;
        this.products.push(product);
        // guarda los productos en el archivo
        this.saveProducts();
        console.log(`Producto agregado correctamente ${product.title}, su id es: ${product.id}`);
    }

    getProducts() {
        // muestra todos los productos
        return this.products;
    }

    getProductById(id) {
        //comprueba si existe un producto con el id ingresado y lo devuelve
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.log('Producto no encontrado');
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        //comprueba si existe un producto con el id ingresado y lo actualiza
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            console.log('Producto no encontrado');
            return;
        }
        const updatedProduct = { ...this.products[productIndex], ...updatedFields };
        this.products[productIndex] = updatedProduct;
        this.saveProducts();
        console.log('Producto actualizado correctamente');
    }

    deleteProduct(id) {
        //comprueba si existe un producto con el id ingresado y lo elimina
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            console.log('Producto no encontrado');
            return;
        }
        this.products.splice(productIndex, 1);
        this.saveProducts();
        console.log('Producto eliminado correctamente');
    }
}

// testing del entregable
const productManager = new ProductManager('./productos.txt');

// getProducts - Debe devolver un arreglo vacío
// console.log(productManager.getProducts()); // []

// // addProduct - Agregar un nuevo producto
// productManager.addProduct({
//     title: "producto prueba",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "abc123",
//     stock: 25,
// });

// // getProducts - El producto recién agregado debe aparecer
// console.log(productManager.getProducts());

// // getProductById - Obtener producto por id (existente)
// const productId = 1; // Id del producto recién agregado
// console.log(productManager.getProductById(productId));

// // getProductById - Obtener producto por id (no existente)
// const nonExistingId = 3;
// console.log(productManager.getProductById(nonExistingId)); // Producto no encontrado

// updateProduct - Actualizar un campo del producto
// const updatedFields = {
//     price: 300, // Actualizar el precio
//     description: "Producto actualizado", // Actualizar la descripción
// };
// const productId = 1; // Id del producto a actualizar
// productManager.updateProduct(productId, updatedFields);

// // getProducts - El producto actualizado debe aparecer
// console.log(productManager.getProducts());

// // deleteProduct - Eliminar producto
// const productId = 1; // Id del producto a eliminar
// productManager.deleteProduct(productId);

// getProducts - El producto eliminado ya no debe aparecer
console.log(ProductManager.getProducts());
