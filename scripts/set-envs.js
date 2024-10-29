// SCRIPT PARA GENERAR LOS ENVIRONMENTS AUTOMATICAMENTE

// hacemos las importaciones
const { writeFileSync, mkdirSync } = require("fs");
require("dotenv").config();

// definimos la direccion del archivo que se va a crear
const targetPath = "./src/environments/environment.ts";

// se definen las claves que estan en el .env y pasan al
// environment.ts
const envFileContent = `
export const environment = {
  maplibre_key:"${process.env["MAPLIBRE_KEY"]}"
};
`;

// creamos la carpeta, el recursive en  true porque si ya existe
// se sobreescribe
mkdirSync("./src/environments", { recursive: true });
// creamos el archivo
writeFileSync(targetPath, envFileContent);
