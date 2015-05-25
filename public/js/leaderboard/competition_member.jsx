var React = require("react");
var NumberEasing = require('react-number-easing');


var CompetitionMember = React.createClass({

    render: function() {

        return (
            <tr className="hero-row">
                <td className="hero-position">{this.props.position}</td>
                <td className="hero-image">
                    <img src="images/thumb_default.jpg" className="img-circle img-responsive" width="50" height="50" />
                </td>
                <td className="hero-name">{this.props.cm.name}</td>
                <td className="hero-score">
                  <NumberEasing
                    value={this.props.cm.score}
                    speed={1500}
                    ease='quintInOut'/>
                </td>
            </tr>
        );
    }
});

module.exports = CompetitionMember