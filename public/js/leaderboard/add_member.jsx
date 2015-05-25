var React = require("react");
var _ = require("lodash");
var Firebase = require("firebase");


var AddMember = React.createClass({

  addMember: function(e){
    e.preventDefault();
    var cm_name = React.findDOMNode(this.refs.cm_name).value.trim();
    if (!cm_name) {
      return;
    }
    React.findDOMNode(this.refs.cm_name).value = '';
    // create new cm
    this.firebaseRef = new Firebase("https://resplendent-inferno-6893.firebaseio.com/cms2");
    this.firebaseRef.push({
      name: cm_name,
      profile: "/public/images/thumb_default.jpg",
      score: 0
    }, function(){
      console.log("new cm created!");
    });

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