const db = require("../models");
const Sequelize = db.sequelize;

exports.create = (req, res) => {
  Sequelize.query(
    `
            INSERT INTO
            public."Multiple_Video_Screens" (
                "tag_id",
                "start_time",
                "end_time",
                "player_name",
                "action_name",
                "action_type",
                "action_result",
                "game_id",
                "team_id",
                "court_area",
                "inside_pain",
                "period",
                "time",
                "home_team_image",
                "away_team_image",
                "home_team_goals",
                "away_team_goals")
            VALUES (
                ${req.body.tag_id},
                '${req.body.start_time}',
                '${req.body.end_time}',
                '${req.body.player_name}',
                '${req.body.action_name}',
                '${req.body.action_type}',
                '${req.body.action_result}',
                ${req.body.game_id},
                ${req.body.team_id},
                ${req.body.court_area},
                ${req.body.inside_pain},
                '${req.body.period}',
                '${req.body.time}',
                '${req.body.home_team_image}',
                '${req.body.away_team_image}',
                ${req.body.home_team_goals},
                ${req.body.away_team_goals}
            )
            RETURNING id
        `
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Game.",
      });
    });
};

exports.delete = (req, res) => {
  Sequelize.query('DELETE FROM public."Multiple_Video_Screens"')
    .then((data) => {
      res.send("Successfully deleted all rows");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Game.",
      });
    });
};

exports.getAllMultipleData = (req, res) => {
  Sequelize.query('select * from public."Multiple_Video_Screens"')
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Game.",
      });
    });
};

exports.getAllMultipleDataByIds = (req, res) => {
  Sequelize.query(
    `select * from public."Multiple_Video_Screens" where public."Multiple_Video_Screens".id in (${req.params.ids})`
  )
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Game.",
      });
    });
};
