const Product = require("../models/product");

exports.create = (req, res) => {
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const product = new Product({
      ean: req.body.ean,
      sku: req.body.sku,
      merk: req.body.merk,
      product: req.body.product,
      product_: req.body.product_,
      type: req.body.type,
      giftset_inhoud: req.body.giftset_inhoud,
      volume: req.body.volume,
      aantal: req.body.aantal,
      inkoop_prijs: req.body.inkoop_prijs,
      inkoop_min: req.body.inkoop_min,
      inkoop_max: req.body.inkoop_max,
      verkoop_berekend: req.body.verkoop_berekend,
      groothandel_prijs: req.body.groothandel_prijs,
      store_prijs: req.body.store_prijs,
      winst: req.body.winst,
      winst_min: req.body.winst_min,
      winst_max: req.body.winst_max,
      eu_clean: req.body.euclean,
      notities: req.body.notities,
      merk: req.body.merk
    });
  
    Product
      .save(product)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Product."
        });
      });
  };

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Product.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Product."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Product.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Product with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Product with id=" + id });
      });
  };

// Update a Product by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Product with id=${id}. Maybe Product was not found!`
          });
        } else res.send({ message: "Product was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Product with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Product.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
          });
        } else {
          res.send({
            message: "Product was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    Product.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Product were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Product."
        });
      });
  };

exports.findAllPublished = (req, res) => {
    Product.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Products,."
        });
      });
  };

