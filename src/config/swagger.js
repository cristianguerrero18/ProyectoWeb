import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API REST - Plataforma Web Colaborativa UTS",
    version: "1.0.0",
    description:
      "Documentación de endpoints de la plataforma web colaborativa para la gestión y compartición de recursos educativos digitales.",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Servidor local",
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/**/*.js", "./src/controllers/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;