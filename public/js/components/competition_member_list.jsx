var React = require("react");
var CompetitionMember = require("./competition_member.jsx");

var MemberList = React.createClass({

    render: function() {
        var rows = [];
        this.props.cms.forEach(function(cm, index) {
            rows.push(<CompetitionMember cm={cm} key={index} position={index+1}/>);
        });
        return (
            <table className="table mbn">
                {rows}
            </table>
        );
    }
});


module.exports = MemberList
