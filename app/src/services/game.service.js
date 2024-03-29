import axios from 'axios';
import authHeader from './auth-header';
import * as settings from '../config/settings';

const API_URL = `${settings.APIBASEURL}/`;

const getAllTeamPlayers = (req) => {
    return axios.post(API_URL + 'team_player/findall', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getGameTeamPlayers = (req) => {
    return axios.post(API_URL + 'team_player/playersbygameteam', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllGameTeamPlayers = (gameId) => {
    return axios.get(API_URL + `team_player/allplayersbygameteam/${gameId}`, { headers: authHeader(), data: { gameId } }).then((response) => {
        return response.data;
    });
};

const getGameTeamPlayersByTeam = (teamId, gameId) => {
    return axios.get(API_URL + `team_player/playersbyteam/${teamId}/${gameId}`, { headers: authHeader(), data: { teamId, gameId } }).then((response) => {
        return response.data;
    });
};
const addTeamPlayer = (req) => {
    return axios.post(API_URL + 'team_player/create', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const addTeam = (req) => {
    return axios.post(API_URL + 'team', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const addMultiple = (req) => {
    return axios.post(API_URL + 'multiple', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllMultipleData = () => {
    return axios.get(API_URL + 'multiple', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllMultipleDataByIds = (ids) => {
    return axios.get(API_URL + `multiple/get/${ids}`, { headers: authHeader(), data: { ids } }).then((response) => {
        return response.data;
    });
};

const deleteMultipleDataByIds = (ids) => {
    return axios.delete(API_URL + `multiple/delete/${ids}`, { headers: authHeader(), data: { ids } }).then((response) => {
        return response.data;
    });
};

const deleteAllMultiple = () => {
    return axios.delete(API_URL + 'multiple', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllTeams = () => {
    return axios.get(API_URL + 'team', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllCoachTeam = () => {
    return axios.get(API_URL + 'coach_team', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllGamesByCoach = (seasonId, leagueId, teamId, datesBack) => {
    return axios.get(API_URL + `game/getbycoach/${seasonId}/${leagueId}/${teamId}/${datesBack}`, { headers: authHeader(), data: { seasonId, leagueId, teamId, datesBack } }).then((response) => {
        return response.data;
    });
};

const getAdditionalGames = (seasonId, leagueId, teamId, datesBack) => {
    return axios.get(API_URL + `game/getadditional/${seasonId}/${leagueId}/${teamId}/${datesBack}`, { headers: authHeader(), data: { seasonId, leagueId, teamId, datesBack } }).then((response) => {
        return response.data;
    });
};

const getCleanGame = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getcleangame/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamGoals = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamgoals/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentGoals = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentgoals/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getGamesByIds = (gameIds) => {
    return axios.get(API_URL + `game/all/${gameIds}`, { headers: authHeader(), data: { gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamGoalOpportunity = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamgoalopportunity/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentGoalOpportunity = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentgoalopportunity/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamOffensivePossession = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamoffensivepossession/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentOffensivePossession = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentoffensivepossession/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamDefensivePossession = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamdefensivepossession/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentDefensivePossession = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentdefensivepossession/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamBuildupGoalkeeper = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteambuildupgoalkeeper/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentBuildupGoalkeeper = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentbuildupgoalkeeper/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamBuildupGoalkeeperKick = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteambuildupgoalkeeperkick/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentBuildupGoalkeeperKick = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentbuildupgoalkeeperkick/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamBuildonDefensiveHalf = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteambuildondefensivehalf/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentBuildonDefensiveHalf = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentbuildondefensivehalf/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamInterception = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteaminterception/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentInterception = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentinterception/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamTackle = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamtackle/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentTackle = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponenttackle/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamThrowIn = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamthrowin/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentThrowIn = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentthrowin/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamFreekick = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamfreekick/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentFreekick = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentfreekick/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamCorner = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamcorner/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentCorner = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentcorner/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamCross = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamcross/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentCross = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentcross/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamPenalty = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteampenalty/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentPenalty = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentpenalty/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamDrawfoul = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamdrawfoul/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentDrawfoul = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentdrawfoul/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamOffside = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamoffside/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentOffside = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentoffside/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamShots = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamshots/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentShots = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentshots/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getGameHighlight = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getgamehighlight/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamBuildOnOffensiveHalf = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteambuildonoffensivehalf/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentBuildOnOffensiveHalf = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentbuildonoffensivehalf/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamCounterAttack = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamcounterattack/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentCounterAttack = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentcounterattack/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamTurnover = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamturnover/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentTurnover = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentturnover/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamSaved = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamsaved/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentSaved = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentsaved/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamClearance = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamclearance/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentClearance = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentclearance/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getTeamBlocked = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getteamblocked/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getOpponentBlocked = (teamId, gameIds) => {
    return axios.get(API_URL + `game/getopponentblocked/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const gameExportSportcode = (teamId, gameIds) => {
    return axios.get(API_URL + `game/game_export_sportcode/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const gameExportSportcodeShort = (teamId, gameIds) => {
    return axios.get(API_URL + `game/game_export_sportcode_short/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getGameById = (gameId) => {
    return axios.get(API_URL + `game/getgamebyid/${gameId}`, { headers: authHeader(), data: { gameId } }).then((response) => {
        return response.data;
    });
};

const getAllPlayersByCoach = () => {
    return axios.get(API_URL + `coach_team/getAllPlayersByCoach`, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllLeaguesByCoach = (userId) => {
    return axios.get(API_URL + `coach_team/getAllLeaguesByCoach/${userId}`, { headers: authHeader(), data: { userId } }).then((response) => {
        return response.data;
    });
};
const getAllTeamsByCoach = (userId) => {
    return axios.get(API_URL + `coach_team/getAllTeamsByCoach/${userId}`, { headers: authHeader(), data: { userId } }).then((response) => {
        return response.data;
    });
};
const getAllTeamsByLeagueSeason = (userId, seasonId, leagueId) => {
    return axios.get(API_URL + `coach_team/getAllTeamsByLeagueSeason/${userId}/${seasonId}/${leagueId}`, { headers: authHeader(), data: { userId, seasonId, leagueId } }).then((response) => {
        return response.data;
    });
};

const getAllLeaguesOfAdditionalGamesByCoach = () => {
    return axios.get(API_URL + `coach_team/getAllLeaguesOfAdditionalGamesByCoach`, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllTeamsOfAdditionalGamesByCoach = () => {
    return axios.get(API_URL + `coach_team/getAllTeamsOfAdditionalGamesByCoach`, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getNumberOfGamesOrdered = () => {
    return axios.get(API_URL + `coach_team/getNumberOfGamesOrdered`, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllMyCoachTeam = () => {
    return axios.get(API_URL + 'coach_team/mine', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getMyCoachTeamList = () => {
    return axios.get(API_URL + 'coach_team/teams', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getMyCoachPlayerList = () => {
    return axios.get(API_URL + 'coach_team/coach_players', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getAllMyCoachPlayer = () => {
    return axios.get(API_URL + 'coach_team/players', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getCoachPlayerGames = (playerId) => {
    return axios.get(API_URL + `coach_team/player_games/${playerId}`, { headers: authHeader(), data: { id: playerId } }).then((response) => {
        return response.data;
    });
};

const getCoachTeamPlayers = (teamId, seasonId, leagueId) => {
    return axios.get(API_URL + `coach_team/team_players/${teamId}/${seasonId}/${leagueId}`, { headers: authHeader(), data: { teamId, seasonId, leagueId } }).then((response) => {
        return response.data;
    });
};

const getGameCoachTeamPlayers = (teamId, gameIds) => {
    return axios.get(API_URL + `coach_team/game_team_players/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const getGameOpponentPlayers = (teamId, gameIds) => {
    return axios.get(API_URL + `coach_team/game_opponent_players/${teamId}/${gameIds}`, { headers: authHeader(), data: { teamId, gameIds } }).then((response) => {
        return response.data;
    });
};

const addCoachTeam = (req) => {
    return axios.post(API_URL + 'coach_team', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getAllPlayerTagsByCoachPlayer = (req) => {
    return axios.post(API_URL + 'coach_team/get_tags_by_player', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const updateCoachTeam = (req) => {
    return axios.put(API_URL + `coach_team/${req.id}`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const updateUserEdit = (req) => {
    return axios.put(API_URL + `user_edits/${req.id}`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const addNewEditClips = (req) => {
    return axios.put(API_URL + `user_edit_clip/add/${req.id}`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const moveFolderNewPosition = (req) => {
    return axios.put(API_URL + `user_edit_folders/move`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const moveEditClips = (clipIds, editId) => {
    return axios.put(API_URL + `user_edit_clip/move/${clipIds}/${editId}`, { clipIds, editId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const copyEditClips = (clipIds, editId) => {
    return axios.put(API_URL + `user_edit_clip/copy/${clipIds}/${editId}`, { clipIds, editId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const deleteUserEdit = (id) => {
    return axios.delete(API_URL + `user_edits/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};
const deleteUserFolder = (id) => {
    return axios.delete(API_URL + `user_edits_folders/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};
const deleteEditClip = (clipIds) => {
    return axios.delete(API_URL + `user_edits/edit_clip/${clipIds}`, { headers: authHeader(), data: { clipIds } }).then((response) => {
        return response.data;
    });
};
const deleteCoachTeam = (id) => {
    return axios.delete(API_URL + `coach_team/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};
const addGame = (req) => {
    return axios.post(API_URL + 'game', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const updateGame = (req) => {
    return axios.put(API_URL + `game/${req.id}`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const updateTeam = (req) => {
    return axios.put(API_URL + `team/${req.id}`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const updateLeague = (req) => {
    return axios.put(API_URL + `league/${req.id}`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const updateEditClipsSort = (req) => {
    return axios.put(API_URL + `user_edit_clips_sort`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const updateEditClip = (req) => {
    return axios.put(API_URL + `user_edit_clip/${req.id}`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllSeasons = () => {
    return axios.get(API_URL + 'season', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllLeagues = () => {
    return axios.get(API_URL + 'league', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getAllActions = () => {
    return axios.get(API_URL + 'action', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getAllActionTypes = () => {
    return axios.get(API_URL + 'action_type', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getAllActionResults = () => {
    return axios.get(API_URL + 'action_result', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const addLeague = (req) => {
    return axios.post(API_URL + 'league', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const addPlayer = (req) => {
    return axios.post(API_URL + 'player', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const deletePlayersInTeam = (id) => {
    return axios.delete(API_URL + `team_player/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};
const deleteTeamTag = (id) => {
    return axios.delete(API_URL + `team_tag/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const deleteGame = (id) => {
    return axios.delete(API_URL + `game/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const deleteTeam = (id) => {
    return axios.delete(API_URL + `team/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};
const deleteLeague = (id) => {
    return axios.delete(API_URL + `league/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const deletePlayerTag = (id) => {
    return axios.delete(API_URL + `player_tag/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};
const deletePlayer = (id) => {
    return axios.delete(API_URL + `player/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};
const deleteCorrection = (id) => {
    return axios.delete(API_URL + `player/correction/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getGame = (id) => {
    return axios.get(API_URL + `game/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getAllGames = () => {
    return axios.get(API_URL + 'game', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getTeamInitialStanding = () => {
    return axios.get(API_URL + 'game/standing', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllPlayers = () => {
    return axios.get(API_URL + 'player', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllCoach = () => {
    return axios.get(API_URL + 'user/coach', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllUsers = () => {
    return axios.get(API_URL + 'user/all', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllUserSubscriptions = () => {
    return axios.get(API_URL + 'user/all_subscription', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const deleteUser = (userId) => {
    return axios.delete(API_URL + `user/delete/${userId}`, { headers: authHeader(), data: { userId } }).then((response) => {
        return response.data;
    });
};

const updateUser = (req) => {
    return axios.post(API_URL + 'user/update', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const addNewUser = (req) => {
    return axios.post(API_URL + 'user/add', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllRepresentatives = () => {
    return axios.get(API_URL + 'user/representative', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const addRepresentative = (userId) => {
    return axios.put(API_URL + `user/representative/add/${userId}`, { userId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const deleteRepresentative = (roleId, userId) => {
    return axios.delete(API_URL + `user/representative/delete/${roleId}/${userId}`, { headers: authHeader(), data: { roleId, userId } }).then((response) => {
        return response.data;
    });
};

const addAcademy = (name, country) => {
    return axios.put(API_URL + `user/academy/add/${name}/${country}`, { name, country }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const deleteAcademy = (id) => {
    return axios.delete(API_URL + `user/academy/delete/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const editAcademy = (id, name, country) => {
    return axios.put(API_URL + `user/academy/update/${id}/${name}/${country}`, { id, name, country }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const addAcademyToRepresentative = (userId, academyId) => {
    return axios.put(API_URL + `user/representative_academy/add/${userId}/${academyId}`, { userId, academyId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAcademiesForRepresentative = (userId) => {
    return axios.get(API_URL + `user/representative_academy/get/${userId}`, { headers: authHeader(), data: { userId } }).then((response) => {
        return response.data;
    });
};

const deleteAcademyFromRepresentative = (userId, academyId) => {
    return axios.delete(API_URL + `user/representative_academy/delete/${userId}/${academyId}`, { headers: authHeader(), data: { userId, academyId } }).then((response) => {
        return response.data;
    });
};

const addHideGame = (academyId, gameId, teamId) => {
    return axios.put(API_URL + `game/hide_game/add/${academyId}/${gameId}/${teamId}`, { academyId, gameId, teamId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getHideGame = (academyId) => {
    return axios.get(API_URL + `game/hide_game/get/${academyId}`, { headers: authHeader(), data: { academyId } }).then((response) => {
        return response.data;
    });
};

const deleteHideGame = (academyId, gameId, teamId) => {
    return axios.delete(API_URL + `game/hide_game/delete/${academyId}/${gameId}/${teamId}`, { headers: authHeader(), data: { academyId, gameId, teamId } }).then((response) => {
        return response.data;
    });
};

const addTeamToAcademy = (userId, academyId, seasonId, teamId) => {
    return axios.put(API_URL + `user/academy_team/add/${userId}/${academyId}/${seasonId}/${teamId}`, { userId, academyId, seasonId, teamId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getTeamsByAcademy = (userId, academyId, seasonId) => {
    return axios.get(API_URL + `user/academy_team/get/${userId}/${academyId}/${seasonId}`, { headers: authHeader(), data: { userId, academyId, seasonId } }).then((response) => {
        return response.data;
    });
};

const deleteTeamsFromAcademy = (userId, academyId, seasonId, teamId) => {
    return axios
        .delete(API_URL + `user/academy_team/delete/${userId}/${academyId}/${seasonId}/${teamId}`, { headers: authHeader(), data: { userId, academyId, seasonId, teamId } })
        .then((response) => {
            return response.data;
        });
};

const addAcademyCoach = (userId, academyId) => {
    return axios.put(API_URL + `user/academy_coach/add/${userId}/${academyId}`, { userId, academyId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const updateSubscription = (subId, scriptId, start, end) => {
    return axios.put(API_URL + `user/subscription/update/${subId}/${scriptId}/${start}/${end}`, { subId, scriptId, start, end }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const addUserSubscription = (userId, subId, start, end) => {
    return axios.put(API_URL + `user/subscription/add/${userId}/${subId}/${start}/${end}`, { userId, subId, start, end }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllSubscriptions = () => {
    return axios.get(API_URL + `user/subscription/all`, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllCoachesByTeam = (seasonId, leagueId, teamId) => {
    return axios.get(API_URL + `user/coach/${seasonId}/${leagueId}/${teamId}`, { headers: authHeader(), data: { seasonId, leagueId, teamId } }).then((response) => {
        return response.data;
    });
};

const getAcademyCoach = (userId) => {
    return axios.get(API_URL + `user/academy_coach/get/${userId}`, { headers: authHeader(), data: { userId } }).then((response) => {
        return response.data;
    });
};

const getAllAcademyCoaches = () => {
    return axios.get(API_URL + `user/academy_coach/all`, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const deleteAcademyCoach = (userId, academyId) => {
    return axios.delete(API_URL + `user/academy_coach/delete/${userId}/${academyId}`, { headers: authHeader(), data: { userId, academyId } }).then((response) => {
        return response.data;
    });
};

const getAllAcademies = (userId) => {
    return axios.get(API_URL + `user/academy/get/all`, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const sendEmailToUser = (req) => {
    return axios.put(API_URL + `game/send_email/${req.id}`, req, { headers: authHeader(), data: { id: req.id } }).then((response) => {
        return response.data;
    });
};

const getAllPositions = () => {
    return axios.get(API_URL + 'player/position', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getPlayersByTeam = (teamId, seasonId) => {
    return axios.get(API_URL + `player/team/${teamId}/${seasonId}`, { headers: authHeader(), data: { teamId, seasonId } }).then((response) => {
        return response.data;
    });
};

const updatePlayerTag = (req) => {
    return axios.put(API_URL + `player_tag/${req.id}`, req, { headers: authHeader(), data: { id: req.id } }).then((response) => {
        return response.data;
    });
};

const updatePlayerTagByManual = (req) => {
    return axios.put(API_URL + `player_tag/update/${req.id}`, req, { headers: authHeader(), data: { id: req.id } }).then((response) => {
        return response.data;
    });
};

const updatePlayer = (req) => {
    return axios.put(API_URL + `player/${req.id}`, req, { headers: authHeader(), data: { id: req.id } }).then((response) => {
        return response.data;
    });
};

const updateTeamTag = (req) => {
    return axios.put(API_URL + `team_tag/${req.id}`, req, { headers: authHeader(), data: { id: req.id } }).then((response) => {
        return response.data;
    });
};

const updateJersey = (req) => {
    return axios.post(API_URL + 'team_player/updatejersey', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const updateTaggerConfig = (req) => {
    return axios.post(API_URL + 'user/updateConfig', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const addTeamTag = (req) => {
    return axios.post(API_URL + 'team_tag', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const addPlayerTag = (req) => {
    return axios.post(API_URL + 'player_tag', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const addHighlight = (req) => {
    return axios.post(API_URL + 'player/highlight', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const addUserEdits = (req) => {
    return axios.post(API_URL + 'user_edits', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllUserEdits = () => {
    return axios.get(API_URL + 'user_edits', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getEditClipsByUserEditId = (id) => {
    return axios.get(API_URL + `user_edits/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getAllTeamTagsByGame = (id) => {
    return axios.get(API_URL + `team_tag/getbygame/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getAllPlayerTagsByTeamTag = (id) => {
    return axios.get(API_URL + `player_tag/getbyteamtag/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getTeamById = (id) => {
    return axios.get(API_URL + `team/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getTeamsStatsAdvanced = (req) => {
    return axios.post(API_URL + `team/getteamsstats/advance`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getTeamsStatsGamebyGame = (req) => {
    return axios.post(API_URL + `team/getteamsstats/game`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getSeasonById = (id) => {
    return axios.get(API_URL + `season/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getLeagueById = (id) => {
    return axios.get(API_URL + `league/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getPlayerById = (id) => {
    return axios.get(API_URL + `player/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getAllHighlightByPlayerId = (id) => {
    return axios.get(API_URL + `player/highlight/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};
const getAllGamesByPlayer = (id) => {
    return axios.get(API_URL + `player/gameByPlayerId/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getGameDetailssByPlayer = (id) => {
    return axios.get(API_URL + `player/gameDetailsByPlayerId/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getPlayersStats = (seasonId, leagueId, gameId, teamId, playerId) => {
    return axios
        .get(API_URL + `player/getplayersstats/${seasonId}/${leagueId}/${gameId}/${teamId}/${playerId}`, { headers: authHeader(), data: { seasonId, leagueId, gameId, teamId, playerId } })
        .then((response) => {
            return response.data;
        });
};

const getPlayersDetection = (gameId, videoTime, minBefore, minAfter) => {
    return axios
        .get(API_URL + `player/player_detection/${gameId}/${videoTime}/${minBefore}/${minAfter}`, { headers: authHeader(), data: { gameId, videoTime, minBefore, minAfter } })
        .then((response) => {
            return response.data;
        });
};

const getPlayersGames = (season, teams, players) => {
    return axios.get(API_URL + `player/games/${season}/${teams}/${players}`, { headers: authHeader(), data: { season, teams, players } }).then((response) => {
        return response.data;
    });
};

const getPlayersTeams = (season, players) => {
    return axios.get(API_URL + `player/teams/${season}/${players}`, { headers: authHeader(), data: { season, players } }).then((response) => {
        return response.data;
    });
};

const getTeamsGames = (season, teams) => {
    return axios.get(API_URL + `team/games/${season}/${teams}`, { headers: authHeader(), data: { season, teams } }).then((response) => {
        return response.data;
    });
};

const getPlayersStatsAdvanced = (req) => {
    return axios.post(API_URL + `player/getplayersstats/advance`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getPlayersStatsAdvanceSummary = (req) => {
    return axios.post(API_URL + `player/getplayersstats/summary`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getPlayersStatsGamebyGame = (req) => {
    return axios.post(API_URL + `player/getplayersstats/game`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getGoalkeepersStatsAdvanced = (req) => {
    return axios.post(API_URL + `player/getgoalkeepersstats/advance`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getGoalkeepersStatsAdvanceSummary = (req) => {
    return axios.post(API_URL + `player/getgoalkeepersstats/summary`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getGoalkeepersStatsGamebyGame = (req) => {
    return axios.post(API_URL + `player/getgoalkeepersstats/game`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const addCorrectionRequest = (curPlayerId, newPlayerId, playerTagId) => {
    return axios.put(API_URL + `player/addcorrection/${curPlayerId}/${newPlayerId}/${playerTagId}`, { curPlayerId, newPlayerId, playerTagId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const doCorrection = (cId) => {
    return axios.put(API_URL + `player/docorrection/${cId}`, { cId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getCorrectionRequest = () => {
    return axios.get(API_URL + `player/request/getcorrection`, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllPlayerTagsByPlayer = (playerId, gameId) => {
    return axios.get(API_URL + `player_tag/getbyplayer/${playerId}/${gameId}`, { headers: authHeader(), data: { playerId, gameId } }).then((response) => {
        return response.data;
    });
};

const getPlayerTagsByActionName = (playerId, gameId, actionName) => {
    return axios.get(API_URL + `player_tag/getbyaction/${playerId}/${gameId}/${actionName}`, { headers: authHeader(), data: { playerId, gameId, actionName } }).then((response) => {
        return response.data;
    });
};

const getAllPlayerTagsByTeam = (teamId, gameId) => {
    return axios.post(API_URL + `player_tag/getbyteam`, { teamId, gameId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getGamePlayerTags = (userId, teamId, playerId, gameId, actionId, actionTypeId, actionResultId, gameTime, courtArea, inside, gameResult, homeAway) => {
    return axios
        .get(API_URL + `player/game_player_tags/${userId}/${teamId}/${playerId}/${gameId}/${actionId}/${actionTypeId}/${actionResultId}/${gameTime}/${courtArea}/${inside}/${gameResult}/${homeAway}`, {
            headers: authHeader(),
            data: { userId, teamId, playerId, gameId, actionId, actionTypeId, actionResultId, gameTime, courtArea, inside, gameResult, homeAway }
        })
        .then((response) => {
            return response.data;
        });
};

const getOpponentTags = (userId, teamId, playerId, gameId, actionId, actionTypeId, actionResultId, gameTime, courtArea, inside, gameResult, homeAway) => {
    return axios
        .get(API_URL + `player/opponent_tags/${userId}/${teamId}/${playerId}/${gameId}/${actionId}/${actionTypeId}/${actionResultId}/${gameTime}/${courtArea}/${inside}/${gameResult}/${homeAway}`, {
            headers: authHeader(),
            data: { userId, teamId, playerId, gameId, actionId, actionTypeId, actionResultId, gameTime, courtArea, inside, gameResult, homeAway }
        })
        .then((response) => {
            return response.data;
        });
};

const getGameScore = (gameId) => {
    return axios.get(API_URL + `player_tag/getgamescore/${gameId}`, { headers: authHeader(), data: { gameId } }).then((response) => {
        return response.data;
    });
};

const getScoreInGames = (gameIds, teamId) => {
    return axios.post(API_URL + `game/getscoreingames`, { gameIds, teamId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

// NEW STREAM URL
const getAsyncNewStreamURL = async (url) => {
    return (await axios.post(API_URL + 'game/getnewstream', { video_url: url }, { headers: authHeader() })).data;
};
const getNewStreamURL = (url) => {
    return axios.post(API_URL + 'game/getnewstream', { video_url: url }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};
const getPlayerActions = (gameIds, teamId) => {
    return axios.post(API_URL + 'game/getplayeractions', { gameIds, teamId }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getAllGamesByTeam = (season, league, team) => {
    return axios.get(API_URL + `game/getbyteam/${season}/${league}/${team}`, { headers: authHeader(), data: { season, league, team } }).then((response) => {
        return response.data;
    });
};

const getTeamByPlayerGame = (playerId, gameId) => {
    return axios.get(API_URL + `team_player/teambyplayergame/${playerId}/${gameId}`, { headers: authHeader(), data: { playerId, gameId } }).then((response) => {
        return response.data;
    });
};

const getBiggestSortNumber = (type, parentId) => {
    return axios.get(API_URL + `user_edits/big_sort/${type}/${parentId}`, { headers: authHeader(), data: { type, parentId } }).then((response) => {
        return response.data;
    });
};

const getVideoSourceFromEdit = (type, parentId) => {
    return axios.get(API_URL + `user_edits/video_source/${parentId}`, { headers: authHeader(), data: { parentId } }).then((response) => {
        return response.data;
    });
};

const getAllFolders = () => {
    return axios.get(API_URL + 'user_edits_folders_all', { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const sendShareEmail = (req) => {
    return axios.post(API_URL + `user_edits/share`, req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const getEditbyId = (id) => {
    return axios.get(API_URL + `user_edits/get/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const getShareURL = (id) => {
    return axios.get(API_URL + `user_edits/get_share/${id}`, { headers: authHeader(), data: { id } }).then((response) => {
        return response.data;
    });
};

const verifyShareId = (req) => {
    return axios.post(API_URL + 'user_edits_verify', req, { headers: { 'x-access-token': '' } }).then((response) => {
        return response.data;
    });
};

const createUserFolder = (req) => {
    return axios.post(API_URL + 'user_edits_folders', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const createUserEdit = (req) => {
    return axios.post(API_URL + 'user_edits_create', req, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const gameService = {
    addTeamPlayer,
    addTeam,
    addLeague,
    addGame,
    addPlayer,
    addTeamTag,
    addPlayerTag,
    addCoachTeam,
    addHighlight,
    addRepresentative,
    addAcademy,
    addAcademyToRepresentative,
    addTeamToAcademy,
    addHideGame,
    addAcademyCoach,
    addNewUser,
    addMultiple,
    addUserSubscription,

    addUserEdits,
    createUserFolder,
    createUserEdit,

    getGame,
    getAllUserEdits,
    getEditClipsByUserEditId,
    getTeamById,
    getTeamsStatsAdvanced,
    getTeamsStatsGamebyGame,
    getSeasonById,
    getLeagueById,
    getPlayerById,
    getHideGame,

    getGameTeamPlayers,
    getAllTeamPlayers,
    getAllTeams,
    getAllLeagues,
    getAllGames,
    getAllSeasons,
    getAllPlayers,
    getAllTeamTagsByGame,
    getAllPlayerTagsByTeamTag,
    getAllActions,
    getAllActionTypes,
    getAllActionResults,
    getAllPositions,
    getPlayersByTeam,
    getAllGamesByPlayer,
    getAllPlayerTagsByPlayer,
    getAllPlayerTagsByTeam,
    getGamePlayerTags,
    getOpponentTags,
    getAllCoach,
    getAllUsers,
    getAllUserSubscriptions,
    getAllRepresentatives,
    getAcademiesForRepresentative,
    getTeamsByAcademy,
    getAcademyCoach,
    getAllAcademyCoaches,
    getAllAcademies,
    getAllCoachTeam,
    getAllGamesByCoach,
    getAdditionalGames,
    getGameById,
    getCleanGame,
    getTeamGoals,
    getOpponentGoals,
    getTeamGoalOpportunity,
    getOpponentGoalOpportunity,
    getTeamOffensivePossession,
    getOpponentOffensivePossession,
    getTeamDefensivePossession,
    getOpponentDefensivePossession,
    getTeamBuildupGoalkeeper,
    getOpponentBuildupGoalkeeper,
    getTeamBuildupGoalkeeperKick,
    getOpponentBuildupGoalkeeperKick,
    getTeamBuildonDefensiveHalf,
    getOpponentBuildonDefensiveHalf,
    getTeamInterception,
    getOpponentInterception,
    getTeamTackle,
    getOpponentTackle,
    getTeamThrowIn,
    getOpponentThrowIn,
    getTeamFreekick,
    getOpponentFreekick,
    getTeamCorner,
    getOpponentCorner,
    getTeamCross,
    getOpponentCross,
    getTeamPenalty,
    getOpponentPenalty,
    getTeamDrawfoul,
    getOpponentDrawfoul,
    getTeamOffside,
    getOpponentOffside,
    getTeamShots,
    getOpponentShots,
    getGameHighlight,
    getTeamBuildOnOffensiveHalf,
    getOpponentBuildOnOffensiveHalf,
    getTeamCounterAttack,
    getOpponentCounterAttack,
    getTeamTurnover,
    getOpponentTurnover,
    getTeamSaved,
    getOpponentSaved,
    getTeamClearance,
    getOpponentClearance,
    getTeamBlocked,
    getOpponentBlocked,
    gameExportSportcode,
    gameExportSportcodeShort,
    getAllMyCoachTeam,
    getMyCoachTeamList,
    getMyCoachPlayerList,
    getAllMyCoachPlayer,
    getAllHighlightByPlayerId,
    getAllGamesByTeam,
    getGameTeamPlayersByTeam,
    getTeamByPlayerGame,
    getGameDetailssByPlayer,
    getPlayersStats,
    getPlayersStatsAdvanced,
    getPlayersStatsAdvanceSummary,
    getPlayersStatsGamebyGame,
    getGoalkeepersStatsAdvanced,
    getGoalkeepersStatsAdvanceSummary,
    getGoalkeepersStatsGamebyGame,
    getPlayersDetection,
    getPlayersGames,
    getPlayersTeams,
    getTeamsGames,
    addCorrectionRequest,
    getCorrectionRequest,
    doCorrection,
    getPlayerTagsByActionName,
    getGameScore,
    getScoreInGames,
    getAsyncNewStreamURL,
    getNewStreamURL,
    getPlayerActions,
    getAllPlayersByCoach,
    getAllLeaguesByCoach,
    getAllTeamsByCoach,
    getAllTeamsByLeagueSeason,
    getAllLeaguesOfAdditionalGamesByCoach,
    getAllTeamsOfAdditionalGamesByCoach,
    getNumberOfGamesOrdered,
    getCoachPlayerGames,
    getCoachTeamPlayers,
    getGameCoachTeamPlayers,
    getGameOpponentPlayers,
    getAllPlayerTagsByCoachPlayer,
    getAllGameTeamPlayers,
    getAllFolders,
    getBiggestSortNumber,
    getVideoSourceFromEdit,
    getTeamInitialStanding,
    getEditbyId,
    getShareURL,
    getAllSubscriptions,
    getAllCoachesByTeam,
    getAllMultipleData,
    getAllMultipleDataByIds,
    getGamesByIds,

    updateJersey,
    updateGame,
    updateTeam,
    updateLeague,
    updateTaggerConfig,
    updatePlayerTag,
    updatePlayerTagByManual,
    updateTeamTag,
    updatePlayer,
    updateCoachTeam,
    updateUserEdit,
    addNewEditClips,
    updateEditClipsSort,
    updateEditClip,
    sendShareEmail,
    verifyShareId,
    editAcademy,
    updateUser,
    updateSubscription,

    deletePlayersInTeam,

    deleteEditClip,
    deleteGame,
    deleteTeamTag,
    deletePlayerTag,
    deleteTeam,
    deleteLeague,
    deletePlayer,
    deleteCorrection,
    deleteCoachTeam,
    deleteUserEdit,
    deleteUserFolder,
    moveEditClips,
    copyEditClips,
    moveFolderNewPosition,
    deleteRepresentative,
    deleteAcademy,
    deleteAcademyFromRepresentative,
    deleteTeamsFromAcademy,
    deleteHideGame,
    deleteAcademyCoach,
    deleteUser,
    sendEmailToUser,
    deleteAllMultiple,
    deleteMultipleDataByIds
};

export default gameService;
