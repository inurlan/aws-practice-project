// import { Application, NextFunction, Request, Response } from "express";
// import { errorMessages } from "../utils/constants";
// import {
//   UnauthorizedError,
//   ForbiddenError,
//   SoftError,
//   NotFoundError,
//   ValidationError,
//   BadRequestError,
//   InternalServerError,
// } from "../utils/errors";

// export default function init(app: Application) {
//   // Catch HTTP 404 and forward to error handler
//   app.use((req: Request, res: Response, next: NextFunction) => {
//     return next(new NotFoundError(errorMessages.RESOURCE_NOT_FOUND));
//   });

//   // Development error handler (no stacktraces leaked to user)
//   if (app.get("env") === "development") {
//     app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//       console.log(err.stack);
//       let errorMessage = err.message;

//       if (err instanceof BadRequestError) {
//         return res.status(400).json({
//           message: errorMessage,
//         });
//       }

//       if (err instanceof ValidationError) {
//         return res.status(400).json({
//           message: errorMessage,
//         });
//       }

//       if (err instanceof UnauthorizedError) {
//         return res.status(401).send();
//       }

//       if (err instanceof ForbiddenError) {
//         return res.status(403).send();
//       }

//       if (err instanceof NotFoundError) {
//         return res.status(404).json({
//           message: errorMessage,
//         });
//       }

//       if (err instanceof InternalServerError) {
//         return res.status(500).json({
//           message: errorMessage,
//         });
//       }

//       if (!(err instanceof SoftError)) {
//         errorMessage = errorMessages.ERROR_OCCURRED;
//       }
//       return res.status(400).json({
//         message: errorMessage,
//       });
//     });
//   }

//   // Production error handler (no stacktraces leaked to user)
//   if (app.get("env") === "production") {
//     app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//       console.log(err.message);
//       let errorMessage = err.message;
//       if (!(err instanceof SoftError)) {
//         errorMessage = errorMessages.ERROR_OCCURRED;
//       }
//       return res.status(400).json({
//         message: errorMessage,
//       });
//     });
//   }
// }
