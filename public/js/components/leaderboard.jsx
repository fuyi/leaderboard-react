/*
 * Copyright (c) 2015, minus1.se
 * All rights reserved.
 *
 *
 * Leaderboard Component
 */

var React = require("react");
var _ = require("lodash");
var CmsStore = require("../stores/CmsStore");
var MemberList = require("./competition_member_list.jsx");
var AddMember = require("./add_member.jsx");
var AddScore = require("./add_score.jsx");

var Leaderboard = React.createClass({

    // mixins: [ReactFireMixin],
    getInitialState: function() {
      return {cms: []};
    },

    componentWillMount: function() {
      CmsStore.addChangeListener(this._setNewData);
    },

    componentWillUnmount: function() {
      CmsStore.removeChangeListener(this._setNewData);
    },

    render: function() {
        return (
          <div>
            <div className="col-md-8">
              <MemberList cms={this.state.cms}/>
            </div>
            <div className="col-md-4">
              <div className="row">
                <AddMember />
              </div>
              <br /><br />
              <div className="row">
                <AddScore cm_options={this.state.cm_options}/>
              </div>
            </div>
          </div>
        );
    },

    _setNewData: function() {
      this.setState(CmsStore.getAll());
    }
});


module.exports = Leaderboard
