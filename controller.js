const homeTeamName = "Lancaster";
const awayTeamName = "York";
const homeTeamShortName = "LAN";
const awayTeamShortName = "YOR";
const homeTeamImage = "images/LancasterSport250.png";
const awayTeamImage = "images/YorkSport250.png";

const eventLogo = "/images/roses2018logo.png";

var state = {
    bug: {
        livetext: "Live",
        locationtext: "",
        showLive: false,
        showLocation: false,
        logo: eventLogo,
        showLogo: false,
        showGeneral: false,
        showClock: false
    },
    boxing: {
        homeTeam: homeTeamShortName,
        awayTeam: awayTeamShortName,
        homeScore: 0,
        awayScore: 0,
        currRound: ""
    },
    score: {
        totalPoints: 354
    },
    football: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamShort: homeTeamShortName,
        awayTeamShort: awayTeamShortName,
        homeScore: 0,
        awayScore: 0,
        homeTeamImage: homeTeamImage,
        awayTeamImage, awayTeamImage
    },
    rugby: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamShort: homeTeamShortName,
        awayTeamShort: awayTeamShortName,
        homeScore: 0,
        awayScore: 0
    },
    basketball: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeTeamShort: homeTeamShortName,
        awayTeamShort: awayTeamShortName,
        homeScore: 0,
        awayScore: 0
    },
    darts: {
        match: "Darts",
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        player1: homeTeamName,
        player2: awayTeamName,
        set1: 0,
        set2:0,
        leg1: 0,
        leg2: 0,
        score1:501,
        score2:501
    },
    swimming: {
        order: '',
        lanes: [],
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        laneOrder: [],
        prevOrderLength: 0
    },
    grid: {
        headingcolor:"#BC204B",
        leftcolor: "#1f1a34", 
        rightcolor:"#1f1a34"
    },
    archery: {

    },
    tennis: {
        options: {
            homeTeam: homeTeamName,
            awayTeam: awayTeamName,
            matchName: "",
            maxSets: 3,
            disableInput: false,
            showScore: false,
            showSets: false,
            showStats: false
        },
        score: [{
            sets1: [0], sets2: [0],
            set1: 0, set2: 0,
            game1: 0, game2: 0,
            point1: 0, point2: 0,
            pointName1: 0, pointName2: 0,
            pointsServed1: 0, pointsServed2: 0,
            pointsWon1: 0, pointsWon2:0,
            firstServeWon1: 0, firstServeWon2: 0,
            secondServeWon1: 0, secondServeWon2: 0,
            ace1: 0, ace2: 0,
            singleFault1: 0, singleFault2: 0,
            doubleFault1: 0, doubleFault2: 0,
            breakPoint1: 0, breakPoint2: 0,
            breaksWon1: 0, breaksWon2: 0,
            serviceGame1: 0, serviceGame2: 0,
            servicesWon1: 0, servicesWon2: 0,
            pointsPlayed: 0, server: 1, tiebreak: false, gamePoint: "", firstFault: false
        }]
    },
    badminton: {
        match: "Badminton",
        subtitle: "Best of 3 Games Wins Match",
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        game1: 0,
        game2:0,
        point1: 0,
        point2: 0
    },
    netball: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeScore: 0,
        awayScore: 0
    },
    waterpolo: {
        homeTeam: homeTeamName,
        awayTeam: awayTeamName,
        homeScore: 0,
        awayScore: 0
    }
}

for (var i = 0; i < 8; i++){
	state.swimming.lanes[i] = {
		id: i,
		name: "",
		team: ""
	};
}

exports.get_logo = function(req, res) {
    res.json(eventLogo)
}

exports.get_bug = function(req, res) {
    res.json(state.bug)
}

exports.set_bug = function(req, res) {
    state.bug = req.body
    res.status(200).send("Updated");
}

exports.get_state = function(req, res) {
    res.json(state);
}

exports.get_sport = function(req, res) {
    var sport = req.params.sport.toUpperCase();

    switch (sport) {
        case "BOXING":
            res.json(state.boxing)
            break;
        case "FOOTBALL":
            res.json(state.football)
            break;
        case "RUGBY":
            res.json(state.rugby)
            break;
        case "DARTS":
            res.json(state.darts)
            break;
        case "SWIMMING":
            res.json(state.swimming)
            break;
        case "BASKETBALL":
            res.json(state.basketball)
            break;
        case "ARCHERY":
            res.json(state.archery)
            break;
        case "BADMINTON":
            res.json(state.badminton)
            break;
        case "TENNIS":
            res.json(state.tennis)
            break;
        case "NETBALL":
            res.json(state.netball)
            break;
        case "WATERPOLO":
            res.json(state.waterpolo)
            break;
        default:
            res.status(404).send('Not found');
            break;
    }
}
