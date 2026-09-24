const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "products Api",
    description: "products Api",
  },
  host: "cse-341-project2-haye.onrender.com",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
