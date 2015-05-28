var AppDispatcher = require('../dispatcher/AppDispatcher');
var LBConstants = require('../constants/LeaderboardConstants');

var LBActions = {

  /**
   * @param  {string} name
   */
  add_member: function(name) {
    AppDispatcher.dispatch({
      actionType: LBConstants.LB_ADD_MEMBER,
      name: name
    });
  },

  /**
   * @param  {float} score
   * @param  {string} cm_key
   */
  add_score: function(cm_key, score) {
    AppDispatcher.dispatch({
      actionType: LBConstants.LB_ADD_SCORE,
      cm_key: cm_key,
      score: score
    });
  },

  /**
   */
  data_change: function() {
    AppDispatcher.dispatch({
      actionType: LBConstants.LB_DATA_CHANGE
    });
  },

};

module.exports = LBActions;
