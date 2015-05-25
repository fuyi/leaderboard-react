var React = require("react");
var _ = require("lodash");
var Firebase = require("firebase");
var firebaseRef = new Firebase("https://resplendent-inferno-6893.firebaseio.com/cms2");


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
    // console.log(old_score);
    cmRef = firebaseRef.child(cm_key);
    cmRef.update({
      score: old_score+score
    });
  },

  render: function() {
    var options = [];

    if (this.props.cm_options) {
      this.props.cm_options.forEach(function(cm_option) {
          options.push(<option value={cm_option.key}>{cm_option.value.name}</option>);
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