/*
 * Copyright (c) 2015, minus1.se
 * All rights reserved.
 *
 *
 * AddMember Component
 */

var React = require("react");
var LBConstants = require('../constants/LeaderboardConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AddMember = React.createClass({

  addMember: function(e){
    e.preventDefault();
    var cm_name = React.findDOMNode(this.refs.cm_name).value.trim();
    if (!cm_name) {
      return;
    }
    React.findDOMNode(this.refs.cm_name).value = '';

    // dispatch LB_ADD_MEMBER Action
    var action = {
      actionType: LBConstants.LB_ADD_MEMBER,
      cm: {
        name: cm_name,
        profile: "/public/images/thumb_default.jpg",
        score: 0
      }
    };
    AppDispatcher.dispatch(action);

  },

  render: function() {
    return(
      <form className="memberForm" onSubmit={this.addMember}>
        <h3>Add member:</h3>
        <input type="text" placeholder="Participant name" ref="cm_name"/>
        <input type="submit" value="Add"/>
      </form>
    );
  }

});

module.exports = AddMember