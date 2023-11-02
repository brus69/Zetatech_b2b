const path = require("path");
const { generateApi } = require("swagger-typescript-api");

generateApi({
  name: "codegen.ts",
  output: path.resolve(process.cwd(), "./src/api/"),
  url: "http://localhost:8088/schema/",
  generateResponses: true,
  enumNamesAsValues: true,
  moduleNameFirstTag: true,
  generateUnionEnums: true,
  generateRouteTypes: false,
  generateClient: false,
});
