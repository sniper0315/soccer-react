const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/logger",
    [authJwt.verifyToken, authJwt.isLogger],
    controller.loggerBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/user/coach",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllCoach
  );

  app.get(
    "/user/representative",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllRepresentatives
  );

  app.put(
    "/user/representative/add/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addRepresentative
  );

  app.delete(
    "/user/representative/delete/:roleId/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteRepresentative
  );

  app.get(
    "/user/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  );

  app.put(
    "/user/academy/add/:name/:country",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addAcademy
  );

  app.delete(
    "/user/academy/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAcademy
  );

  app.put(
    "/user/academy/update/:id/:name/:country",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editAcademy
  );

  app.put(
    "/user/representative_academy/add/:userId/:academyId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addAcademyToRepresentative
  );

  app.get(
    "/user/representative_academy/get/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAcademiesForRepresentative
  );

  app.delete(
    "/user/representative_academy/delete/:userId/:academyId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAcademyFromRepresentative
  );

  app.get(
    "/user/academy/get/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllAcademies
  );

  app.get(
    "/user/academy_team/get/:userId/:academyId/:seasonId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getTeamsByAcademy
  );

  app.put(
    "/user/academy_team/add/:userId/:academyId/:seasonId/:teamId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addTeamToAcademy
  );

  app.delete(
    "/user/academy_team/delete/:userId/:academyId/:seasonId/:teamId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteTeamsFromAcademy
  );

  app.get(
    "/user/academy_coach/get/:userId",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.getAcademyCoach
  );

  app.get(
    "/user/academy_coach/all",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.getAllAcademyCoaches
  );

  app.put(
    "/user/academy_coach/add/:userId/:academyId",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.addAcademyCoach
  );

  app.delete(
    "/user/academy_coach/delete/:userId/:academyId",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.deleteAcademyCoach
  );

  app.get(
    "/user/all_subscription",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsersWithSubscription
  );

  app.delete(
    "/user/delete/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  app.post(
    "/user/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );

  app.post(
    "/user/add",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addNewUser
  );

  app.put(
    "/user/subscription/update/:subId/:scriptId/:start/:end",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.updateSubscription
  );

  app.get(
    "/user/subscription/all",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.getAllSubscriptions
  );

  app.get(
    "/user/coach/:seasonId/:leagueId/:teamId",
    [authJwt.verifyToken, authJwt.isAdminOrCoach],
    controller.getAllCoachesByTeam
  );
};
