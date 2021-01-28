import React, { Component } from 'react';
import Context from './Context';

export default class Line extends Component{
    static contextType = Context;

    timeout = 0;

    componentDidMount(){
        this.timeout = setInterval(() => {
            if(this.context.people.length < 5){
                this.context.addPeople({name: 'JJ Banks'});
                return;
            }
            if(this.context.people[0] !== this.context.name){
                const name = this.context.people[0];
                this.context.deletePeople(name);
                return;
            }
            if(this.context.error === 'You are next in line'){
                this.context.setError(null);
                this.props.history.push('/adopt');
                return;
            }
            if(this.context.name === this.context.people[0] &&
                this.context.people.length === 5){
                    this.context.setError('You are next in line');
                    return;
                }
        }, 2500);
    }

    componentWillUnmount(){
        clearInterval(this.timeout);
    }

    render(){
        return(
            <Context.Consumer>
                {(context) => {
                    console.log(context);
                    return(
                        <div className='petful-content'>
                            <h1>You have been added to the queue</h1>
                            <h3>The adoption page will load when your name is up</h3>
                            <p className='error-2'>{context.error}</p>
                            <ol className='line'>
                                {this.context.people.map((person, idx) => {
                                    return <li key={idx}>{person}</li>;
                                })}
                            </ol>
                        </div>
                    );
                }}
            </Context.Consumer>
        )
    }
}