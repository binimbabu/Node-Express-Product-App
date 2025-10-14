const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductFromFile = (callBack) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      // File not found or cannot be read — return an empty array
      return callBack([]);
    }

    if (!fileContent || fileContent.length === 0) {
      // File is empty — return empty list instead of crashing
      return callBack([]);
    }

    try {
      const data = JSON.parse(fileContent);
      callBack(data);
    } catch (e) {
      console.error("⚠️ Invalid JSON in products.json. Resetting file...");
      callBack([]);
    }
  });
};

const products = [];
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {});
    });
  }
  static fetchAll(callBack) {
    getProductFromFile(callBack);
  }
};
