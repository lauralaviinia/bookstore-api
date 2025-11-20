declare module "swagger-ui-express" {
  import type { RequestHandler } from "express";
  const swaggerUi: {
    serve: RequestHandler[];
    setup: (swaggerDoc: any, opts?: any) => RequestHandler;
  };
  export default swaggerUi;
}

declare module "swagger-jsdoc" {
  const swaggerJSDoc: (opts: any) => any;
  export default swaggerJSDoc;
}
