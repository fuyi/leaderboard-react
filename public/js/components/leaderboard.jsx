var React = require("react");
var _ = require("lodash");
// var ReactFireMixin = require("reactfire");
var Firebase = require("firebase");
var MemberList = require("./competition_member_list.jsx");
var AddMember = require("./add_member.jsx");
var AddScore = require("./add_score.jsx");
var firebaseRef = new Firebase("https://resplendent-inferno-6893.firebaseio.com/cms2");

var Leaderboard = React.createClass({

    // mixins: [ReactFireMixin],
    //initialize state
    getInitialState: function() {
      // sorted_cms =  _.sortBy(this.props.cms, 'score').reverse();
      return {cms: []};
    },

    componentWillMount: function() {
      // set up data sync to firebase
      firebaseRef.on("value", function(cmsSnapshot) {
        // construct cm options for select dropdown
        var cm_options = [];
        cmsSnapshot.forEach(function(cmSnap){
          cm_options.push({key:cmSnap.key(), value: cmSnap.val()});
        });

        this.setState({
          cms: (_.sortBy(_.values(cmsSnapshot.val()), 'score')).reverse(),
          cm_options: cm_options
        });
        // console.log(this.state);
      }.bind(this));
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
    }
});


module.exports = Leaderboard
