import React, { Component } from 'react';

export default class ErrorBoundary extends Component{
    state = {
        hasError: false,
    };

    componentDidCatch(error){
        this.setState({ hasError: true})
    };

    render(){
        if(this.state.hasError){
            return <h2>Error: Page could not load</h2>
        }
        return this.props.children;
    }
}