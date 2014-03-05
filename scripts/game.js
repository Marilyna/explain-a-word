/** @jsx React.DOM */

var MainContent = React.createClass({
    getInitialState: function() {
        return {index: 0, count: 0, finished: false};
    },

    nextClick: function () {
        this.setState({index: this.state.index+1});
    },

    correctClick: function () {
        this.setState({count: this.state.count+1});
        this.nextClick();
    },

    finishGame: function () {
        this.setState({finished: true});
    },

    submitPlayers: function (data) {
        console.log(data.playerA);
        console.log(data.playerB);
    },

    render: function () {
        if (!this.state.finished) {
            return (
                <div>
                    <Timer finish={this.finishGame}/>
                    <CorrectAnswers count={this.state.count} />
                    <Word text={this.props.words[this.state.index]} />
                    <Button text="Yes" onclick={this.correctClick}/>
                    <Button text="Next" onclick={this.nextClick} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Players onPlayersSubmit={this.submitPlayers}/>
                </div>
            );
        }
    }
});


var Timer = React.createClass({
    getInitialState: function () {
        return {secondsRemain: 5};
    },

    tick: function () {
        this.setState({secondsRemain: this.state.secondsRemain - 1});
    },

    componentDidMount: function () {
        this.interval = setInterval(this.tick, 1000);
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextState.secondsRemain < 0) {
            clearInterval(this.interval);
            this.props.finish();
        }
        return nextState.secondsRemain >= 0
    },

    componentWillUnmount: function () {
        clearInterval(this.interval);
    },

    render: function () {
        return (
            <div>
                Time: {this.state.secondsRemain}
            </div>
        );
    }
});


var CorrectAnswers = React.createClass({
    render: function () {
        return (
            <div>
                Correct: {this.props.count}
            </div>
        );
    }
});


var Word = React.createClass({
    render: function () {
        return (
            <h3>{this.props.text}</h3>
        );
    }
});


var Button = React.createClass({
    render: function () {
        return <input type='button' value={this.props.text} onClick={this.props.onclick} />
    }
});

var Players = React.createClass({
    handleSubmit: function () {
        var p1 = this.refs.playerA.getDOMNode().value.trim();
        var p2 = this.refs.playerB.getDOMNode().value.trim();

        this.props.onPlayersSubmit({playerA: p1, playerB: p2});

        this.refs.playerA.getDOMNode().value = '';
        this.refs.playerB.getDOMNode().value = '';

        return false;
    },

    render: function () {
        return (
            <form className="playersForm" onSubmit={this.handleSubmit}>
                <span>Enter the players: </span>
                <input type="text" placeholder="Player A" ref="playerA" />
                <input type="text" placeholder="Player B" ref="playerB" />
                <input type="submit" value="Done!" />
            </form>
        );
    }
});


var words = ["hello", "world", "this", "is", "my", "first", "react", "application", "oh", "so", "many",
"words", "I", "should", "write", "here"];


React.renderComponent(
    <MainContent words={_.sample(words, 10)} />,
    document.getElementById('content')
);
