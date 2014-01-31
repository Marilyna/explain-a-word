/** @jsx React.DOM */

var MainContent = React.createClass({
    getInitialState: function() {
        return {index: 0, count: 0};
    },

    nextClick: function () {
        this.setState({index: this.state.index+1});
    },

    correctClick: function () {
        this.setState({count: this.state.count+1});
        this.nextClick();
    },

    render: function () {
        return (
            <div>
                <CorrectAnswers count={this.state.count} />
                <Word text={this.props.words[this.state.index]} />
                <Button text="Yes" onclick={this.correctClick}/>
                <Button text="Next" onclick={this.nextClick} />
            </div>
        );
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


var words = ["hello", "world", "this", "is", "my", "first", "react", "application"];


React.renderComponent(
    <MainContent words={_.sample(words, 4)} />,
    document.getElementById('content')
);
