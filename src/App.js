import React, { Component } from 'react';
import LandingPage from './Components/LandingPage';
import AdoptionPage from './Components/AdoptionPage';
import Cats from './Components/Cats';
import Dogs from './Components/Dogs';
import Context from './Components/Context';
import Line from './Components/Line';
import { Route } from 'react-router-dom';
import { API_ENDPOINT } from './config';
import ErrorBoundary from './Components/ErrorBoundary';
import './App.css';

class App extends Component {
    state={
        cats: [],
        dogs: [],
        people: [],
        error: '',
        name: '',
        dogNode: null,
        catNode: null,
        peopleNode: null,
        getCats: () => {
            fetch(`${API_ENDPOINT}/cat`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    cats: data,
                    catNode: data[0],
                });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        getDogs: () => {
            fetch(`${API_ENDPOINT}/dog`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    dogs: data,
                    dogNode: data[0],
                });
            })
            .catch((e) => {
                console.log(e)
            });
        },
        getPeople: () => {
            fetch(`${API_ENDPOINT}/people`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    people: data,
                })
            })
        },
        addPeople: (name) => {
            fetch(`${API_ENDPOINT}/people`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(name),
            })
            .then((res) => res.json())
            .then(() => {
                this.setState({
                    people: [...this.state.people, name.name],
                });
            });
        },
        deletePeople: () => {
            fetch(`${API_ENDPOINT}/people`, {
                method: 'DELETE',
                headers: {'content-type': 'application/json'},
            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    people: this.state.people.slice(1),
                });
            })
            .catch((e) => {
                throw new Error('could not delete person');
            });
        },
        adoptCat: () => {
            fetch(`${API_ENDPOINT}/cat`, {
                method: 'DELETE',
                headers: {'content-type': 'application/json'},
            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({cats: data})
            })
            .catch((e) => {
                throw new Error('cat was not adopted')
            })
        },
        adoptDog: () => {
            fetch(`${API_ENDPOINT}/dog`, {
                method: 'DELETE',
                headers: {'content-type': 'application/json'},
            })
            .then((data) => {
                this.setState({dogs: this.state.dogs.slice(1)})
            })
            .catch((e) => {
                throw new Error('dog was not adopted')
            })
        },
        setCatNode: (nextCat) => this.setState({ catNode: nextCat}),
        setDogNode: (nextDog) => this.setState({ dogNode: nextDog}),
        setPeopleNode: (nextPerson) => this.setState({peopleNode: nextPerson}),
        setError: (error) => this.setState({error: error}),
        setName: (name) => this.setState({ name: name}),
    };

    componentDidMount(){
        this.state.getCats();
        this.state.getDogs();
        this.state.getPeople();
    }

    render(){
        return(
            <Context.Provider value={this.state}>
                <ErrorBoundary>
                    <div>
                        <Route exact path='/' component={LandingPage}/>
                        <Route path='/adopt' component={AdoptionPage}/>
                        <Route path='/dog' component={Dogs}/>
                        <Route path='/cat' component={Cats}/>
                        <Route path='/line' render={(props) => <Line {...props}/>}/>
                    </div>
                </ErrorBoundary>
            </Context.Provider>
        )
    }
}

export default App;