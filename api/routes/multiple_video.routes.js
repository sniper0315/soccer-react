const { authJwt } = require("../middleware");
const controller = require("../controllers/multiple_video.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/multiple",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.create
  );

  app.delete(
    "/multiple",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.delete
  );

  app.get(
    "/multiple",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.getAllMultipleData
  );

  app.get(
    "/multiple/get/:ids",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.getAllMultipleDataByIds
  );
};
