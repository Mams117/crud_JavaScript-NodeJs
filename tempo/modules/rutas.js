// las rutas para resolver cada verbo de http
//modulo  que resuelve las rutas de las api rest
// arquitectura  restfull
//recordar: la api rest  trabaja  con los verbos http
// get, post, delete,  patch
//creamos los endpoints

//modulos requeridos para el proyecto
const express = require("express");
const cors = require("cors"); //para evitar restricciones  entre llamadas de sitios
const ruta = express.Router(); // trae el metodo router  de express  para hacer los
const conex = require("./bdatos");

//construimos la capoa intermedia middleware
ruta.use(express.json()); //serializa  la data en json
ruta.use(cors()); //permite acceso  de otras direcciones ip distintas a mi srevicio
ruta.options("*", cors()); // configura las ip admitidas por cors ,  *  significa que las acepta todas

// codificamos  los  verbos http  (crud tipico)
// verbo GET  listar

ruta.get("/api/users", (req, res) => {
  conex.query("SELECT * FROM users", (Error, Respuesta) => {
    if (Error) {
      throw Error;
    } else {
      res.send(Respuesta);
    }
  });
});

//verbo post  insertar
ruta.post("/api/users", (req, res) => {
  let data = {
    name: req.body.name,
    lastname: req.body.lastName,
    phone: req.body.phone,
  };
  conex.query("INSERT INTO users set ? ", data, (error, Respuesta) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(Respuesta);
    }
  });
});

ruta.put("/api/users/:id", (req, res) => {
  let id = req.params.id;
  let datos = {
    name: req.body.name,
    lastname: req.body.lastname,
    phone: req.body.phone,
  };
  conex.query("UPDATE users set ? where id = ?", [datos, id]),
    (error, Respuesta) => {
      if (Error) {
        console.log(error);
      } else {
        res.status(201);
      }
    };
});

ruta.delete("/api/users/:id", (req, res) => {
  let id = req.params.id;

  conex.query("DELETE FROM users where id = ?", id),
    (error, Respuesta) => {
      if (Error) {
        console.log(error);
      } else {
        res.status(201).send(Respuesta);
      }
    };
});

module.exports = ruta;
