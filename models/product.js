const fs = require("fs");
const path = require("path");

const pathd = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(pathd, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const exisitingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[exisitingProductIndex] = this;
        fs.writeFile(pathd, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(pathd, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteproductbyID(id, cb) {
    getProductsFromFile((products) => {
      const exisitingProductIndex = products.findIndex(
        (prod) => prod.id === id
      );
      products.splice(exisitingProductIndex, 1);
      fs.writeFile(pathd, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        } else {
          cb();
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => Number(p.id) === Number(id));
      cb(product);
    });
  }
};
