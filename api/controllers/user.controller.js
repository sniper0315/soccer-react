const db = require("../models");
const User = db.user;
const User_Subscription = db.user_subscription;
const Sequelize = db.sequelize;

var bcrypt = require("bcryptjs");
var randomstring = require("randomstring");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.loggerBoard = (req, res) => {
  res.status(200).send("Logger Content.");
};

exports.getAllCoach = (req, res) => {
  User.findAll({
    include: [{ model: db.role, where: { id: 3 } }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.getAllRepresentatives = (req, res) => {
  Sequelize.query(
    `
      select * from public.fnc_get_representative()
    `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.addRepresentative = (req, res) => {
  Sequelize.query(
    `
      select * from public.fnc_add_representative(${req.params.userId})
    `
  )
    .then((data) => {
      res.send("Successfully added");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.deleteRepresentative = (req, res) => {
  Sequelize.query(
    `
      select * from public.fnc_delete_representative(${req.params.userId})
    `
  )
    .then((data) => {
      res.send("Successfully deleted");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.getAllUsers = (req, res) => {
  Sequelize.query(
    `
      SELECT * FROM public."Users"
    `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.addAcademy = (req, res) => {
  Sequelize.query(
    `
      select * from public.fnc_new_academy('${req.params.name}','${req.params.country}')
    `
  )
    .then((data) => {
      res.send("Successfully added");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.deleteAcademy = (req, res) => {
  Sequelize.query(
    `
      select * from public.fnc_delete_academy(${req.params.id})
    `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.editAcademy = (req, res) => {
  Sequelize.query(
    `
      UPDATE public."Academies" SET "name" = '${req.params.name}', "Country" = '${req.params.country}' WHERE public."Academies"."id" = ${req.params.id}
    `
  )
    .then((data) => {
      res.send("Successfully updated");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.addAcademyToRepresentative = (req, res) => {
  Sequelize.query(
    `
      select * from public.fnc_add_academy_to_representative(${req.params.academyId},${req.params.userId})
    `
  )
    .then((data) => {
      res.send("Successfully added");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.getAcademiesForRepresentative = (req, res) => {
  Sequelize.query(
    `
      select * from public.fnc_get_representative_academies(${req.params.userId})
    `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.deleteAcademyFromRepresentative = (req, res) => {
  Sequelize.query(
    `
      DELETE FROM public."Representative_Academies" WHERE public."Representative_Academies"."user_id" = ${req.params.userId} and public."Representative_Academies"."academy_id" = ${req.params.academyId}
    `
  )
    .then((data) => {
      res.send("Successfully deleted");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.getAllAcademies = (req, res) => {
  Sequelize.query(
    `
      SELECT * FROM public."Academies"
    `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.getTeamsByAcademy = (req, res) => {
  Sequelize.query(
    `
      SELECT public."Teams".*, public."Academy_Teams".*
      FROM public."Academy_Teams"
      JOIN public."Teams" on public."Teams"."id" = public."Academy_Teams"."team_id"
      WHERE public."Academy_Teams"."user_id" = ${req.params.userId} and public."Academy_Teams"."academy_id" = ${req.params.academyId} and public."Academy_Teams"."season_id" = ${req.params.seasonId}
    `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.addTeamToAcademy = (req, res) => {
  const date = new Date().toDateString();

  Sequelize.query(
    `
      INSERT INTO public."Academy_Teams" ("user_id", "season_id", "team_id", "createdAt", "updatedAt", "academy_id") VALUES(${req.params.userId}, ${req.params.seasonId}, ${req.params.teamId}, '${date}', '${date}', ${req.params.academyId})
    `
  )
    .then((data) => {
      res.send("Successfully added");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.deleteTeamsFromAcademy = (req, res) => {
  Sequelize.query(
    `
      DELETE FROM public."Academy_Teams"
      WHERE public."Academy_Teams"."user_id" = ${req.params.userId} and
        public."Academy_Teams"."academy_id" = ${req.params.academyId} and
        public."Academy_Teams"."season_id" = ${req.params.seasonId} and
        public."Academy_Teams"."team_id" = ${req.params.teamId}
    `
  )
    .then((data) => {
      res.send("Successfully deleted");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.addAcademyCoach = (req, res) => {
  Sequelize.query(
    `
      select * from public.fnc_add_academy_coach(${req.params.userId}, ${req.params.academyId})
    `
  )
    .then((data) => {
      res.send("Successfully added");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.deleteAcademyCoach = (req, res) => {
  Sequelize.query(
    `
      select * from public.fnc_delete_academy_coach(${req.params.userId}, ${req.params.academyId})
    `
  )
    .then((data) => {
      res.send("Successfully deleted");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.getAcademyCoach = (req, res) => {
  Sequelize.query(
    `
      select * from public.fnc_get_academy_coach(${req.params.userId})
    `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.getAllAcademyCoaches = (req, res) => {
  Sequelize.query(
    `select
      public."Users".*,
      public."Roles".name as role_name
    from public."User_Roles"
    join public."Users" on public."Users".id = public."User_Roles"."userId"
    join public."Roles" on public."Roles".id = public."User_Roles"."roleId"
    where public."User_Roles"."roleId" = 3
    `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.getAllUsersWithSubscription = (req, res) => {
  Sequelize.query(
    `
      select
        public."Users".*,
        public."User_Subscriptions".id as subscription_id,
        public."User_Subscriptions".start_date as subscription_start,
        public."User_Subscriptions".end_date as subscription_end,
        public."Subscriptions".name as subscription_name
      from public."Users"
      join public."User_Subscriptions" on public."User_Subscriptions".user_id = public."Users".id
      join public."Subscriptions" on public."Subscriptions".id = public."User_Subscriptions".subscription_id
    `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.deleteUser = (req, res) => {
  Sequelize.query(
    `delete from public."Users" where public."Users".id = ${req.params.userId}`
  )
    .then((data) => {
      res.send("Successfully deleted");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.updateUser = (req, res) => {
  Sequelize.query(
    `
    UPDATE public."Users"
    SET first_name='${req.body.first_name}',
    last_name='${req.body.last_name}',
    country='${req.body.country}',
    phone_number='${req.body.phone}',
    user_image='${req.body.logo}'
    WHERE id = ${req.body.userId}
  `
  )
    .then((data) => {
      res.send("Successfully updated");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.addNewUser = (req, res) => {
  const password = randomstring.generate(8);

  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(password, 8),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    country: req.body.country,
    phone_number: req.body.phone,
    user_image: req.body.logo,
    is_verified: true,
  })
    .then((data) => {
      User_Subscription.create({
        user_id: data.id,
        subscription_id: 3,
        start_date: new Date(),
        end_date: new Date(),
      })
        .then((data) => {
          res.send("Successfully added");
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving seasons.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.updateSubscription = (req, res) => {
  Sequelize.query(
    `
      update public."User_Subscriptions"
      set start_date='${req.params.start}',
      end_date='${req.params.end}',
      subscription_id=${req.params.scriptId}
      where id=${req.params.subId}
    `
  )
    .then((data) => {
      res.send("Successfully updated");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.getAllSubscriptions = (req, res) => {
  Sequelize.query(`select * from public."Subscriptions"`)
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};

exports.getAllCoachesByTeam = (req, res) => {
  Sequelize.query(
    `
      select public."Users".*
      from public."Coach_Teams"
      join public."Users" on public."Users".id = public."Coach_Teams".user_id
      where public."Coach_Teams".team_id = ${req.params.teamId} and public."Coach_Teams".season_id = ${req.params.seasonId} and public."Coach_Teams".league_id = ${req.params.leagueId}
    `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving seasons.",
      });
    });
};
