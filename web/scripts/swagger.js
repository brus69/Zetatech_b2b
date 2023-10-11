const path = require("path");
const { generateApi } = require("swagger-typescript-api");

generateApi({
  name: "generated.ts",
  output: path.resolve(process.cwd(), "./src/shared/api"),
  url: "http://localhost:8000/content/schema/",
  generateResponses: true,
  enumNamesAsValues: true,
  moduleNameFirstTag: true,
  generateUnionEnums: true,
  generateRouteTypes: false,
  generateClient: false,
});
