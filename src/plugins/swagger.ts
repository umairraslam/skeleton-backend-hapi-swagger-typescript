import { Plugin } from "../interfaces/plugin";
import * as Hapi from "hapi";

const register = async (server: Hapi.Server) : Promise<void> => {
  try {
    return server.register([
      require("inert"),
      require("vision"),
      {
        plugin: require("hapi-swagger"),
        options: {
          info: {
            title: "Test Api",
            description: "Test Api Documentation",
            version: "1.0"
          },
          tags: [
            {
              name: "testFeature",
              description: "Api interface for TestFeature."
            }
          ],
          swaggerUI: true,
          documentationPage: true,
          documentationPath: "/documentation"
        }
      }
    ]);
  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`);
  }
};

export default (): Plugin => {
  return {
    register,
    info: () => {
      return { name: "Swagger Documentation", version: "1.0.0" };
    }
  };
};
