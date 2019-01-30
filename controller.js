// The current state.
var state = {
    gameshow: {
        greenTeam: {
            name: "Green Team",
            showName: false,
            score: 0,
            showScore: false
        },
        blueTeam: {
            name: "Blue Team",
            showName: false,
            score: 0,
            showScore: false
        },
        showScores: false,
        teamHasBuzzed: false
    }
}

exports.get_gameshow = function (req, res) {
    res.json(state.gameshow);
}

exports.set_gameshow = function (req, res) {
    state.gameshow = req.body;

    res.status(200).send("Updated");
}

exports.team_buzzed = function (req, res) {
    if (!state.gameshow.teamHasBuzzed) {
        state.gameshow.teamHasBuzzed = true;
        state.gameshow[req.params.team + "Team"].showName = true;

        res.status(200).send("Buzz!");
    } else {
        res.status(400).send("Too slow");
    }
}

exports.set_name = function (req, res) {
    state.gameshow[req.params.team + "Team"].name = req.body.name;

    res.status(200).send("Updated");
}
