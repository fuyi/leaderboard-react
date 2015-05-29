/*
 * Copyright (c) 2015, minus1.se
 * All rights reserved.
 *
 *
 * AddScore Component
 */
var React = require("react");
var _ = require("lodash");
var LBConstants = require('../constants/LeaderboardConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AddScore = React.createClass({

  addScore: function(e) {
    e.preventDefault();
    var score = parseFloat(React.findDOMNode(this.refs.score).value.trim());
    // console.log(score);
    var cm_key = React.findDOMNode(this.refs.cm_id).value.trim();
    var cm = _.find(this.props.cm_options, function(c){
      return c.key == cm_key;
    });
    if (!score) {
      return;
    }
    React.findDOMNode(this.refs.score).value = '';

    var old_score = parseFloat(cm.value.score);
    var new_score = old_score + score;

    var action = {
      actionType: LBConstants.LB_ADD_SCORE,
      cm_key: cm_key,
      score: new_score
    };
    AppDispatcher.dispatch(action);

  },

  render: function() {
    var options = [];

    if (this.props.cm_options) {
      this.props.cm_options.forEach(function(cm_option) {
          options.push(<option value={cm_option.key} key={cm_option.key}>{cm_option.value.name}</option>);
      });
    }

    return(
      <form className="scoreForm" onSubmit={this.addScore}>
        <h3>Add Score:</h3>
        <select ref="cm_id">
          {options}
        </select>
        <input type="text" placeholder="score" ref="score"/>
        <input type="submit" value="Add"/>
      </form>
    );
  }

});

module.exports = AddScore