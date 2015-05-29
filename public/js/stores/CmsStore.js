/*
 * Copyright (c) 2015, minus1.se
 * All rights reserved.
 *
 *
 * CmsStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var LBConstants = require('../constants/LeaderboardConstants');
var assign = require('object-assign');
var _ = require("lodash");
var Firebase = require('Firebase');
var firebaseRef = new Firebase("https://resplendent-inferno-6893.firebaseio.com/cms2");

var CHANGE_EVENT = 'change';


var _cms = {};


var CmsStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of Cms.
   * @return {object}
   */
  getAll: function() {
    return _cms;
  },

  /**
   * Add score to Firebase
   */
  addScore: function(cm_key, score) {
    var cmRef = firebaseRef.child(cm_key);
    cmRef.update({
      score: score
    });
  },

  /**
   * Add member to Firebase
   */
  addMember: function(cm) {
    firebaseRef.push(cm, function(){
      console.log("new cm created!");
    });
  },


  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// listen to firebase data change
firebaseRef.on("value", function(cmsSnapshot) {
  // construct cm options for select dropdown
  var cm_options = [];
  cmsSnapshot.forEach(function(cmSnap){
    cm_options.push({key:cmSnap.key(), value: cmSnap.val()});
  });

  _cms = {
    cms: (_.sortBy(_.values(cmsSnapshot.val()), 'score')).reverse(),
    cm_options: cm_options
  };

  // In this case, Action is dispatched from Store, not user interaction
  // Uncaught Error: Invariant Violation: Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.
  // so need to dispatch action async.
  var asyncDispatchFunc = function(){
    AppDispatcher.dispatch({
    actionType: LBConstants.LB_DATA_CHANGE
  });    
  };
  window.setTimeout(asyncDispatchFunc, 0);


}.bind(this));

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case LBConstants.LB_DATA_CHANGE:
      CmsStore.emitChange();
      break;

    case LBConstants.LB_ADD_MEMBER:
      CmsStore.addMember(action.cm);
      break;

    case LBConstants.LB_ADD_SCORE:
      CmsStore.addScore(action.cm_key, action.score);
      break;

    default:
      // no op
  }
});

module.exports = CmsStore;