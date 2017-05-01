import React, { Component } from 'react';
import io from 'socket.io-client'
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newMessage: '',
            messages: [],
            socket: io('http://localhost:8080')
        }

        console.log('Running socket.io on the client...')
    }

    componentDidMount() {
        // const self = this;
        this.state.socket.on('message_received', (message) => {
            this.setState({
                messages: [message, ...this.state.messages]
            })
            console.log(this.state.messages);
        })
    }

    sendMessage(e) {
        this.state.socket.emit('new_message', this.state.newMessage);

        this.setState({
            newMessage: ''
        })
        e.preventDefault();
    }

    updateNewMessage(e) {
        this.setState({
            newMessage: e.target.value
        })
        console.log('NEW MESSAGE UPDATED: ', this.state.newMessage);
    }

    render() {
        const displayConversation = () => {
            console.log(this.state.messages);
            return this.state.messages.map((eachMessage, index) => {
                return (
                    <p key={index}> {eachMessage} </p>
                )
            })
        }

        return (
            <div className="App">
                <h1> Talkie </h1>

                <form onSubmit={(e) => {this.sendMessage(e)}}>
                    <input
                        type="text"
                        value={this.state.newMessage}
                        onChange={(e) => {this.updateNewMessage(e)}} />
                    <button
                        type="submit">
                        Send
                    </button>
                </form>

                {displayConversation()}

            </div>
        );
    }

}

export default App;
