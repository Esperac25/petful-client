import React, { useState } from 'react';
import Context from './Context';
import petful from '../petful.png'


export default function LandingPage(props){
    const [ start, setStart] = useState(false);

    const handleSubmit = (e, context) => {
        e.preventDefault();
        const name = e.target.name.value;
        console.log(name);
        const nameVal = {name: name};
        if(!name){
            context.setError('Name is required');
            return;
        } else {
            context.setName(name);
            context.addPeople(nameVal);
            context.setError('');
            console.log(context.name);
            props.history.push('/line');
        }
    };

    return(
        <Context.Consumer>
            {(context) => {
                return (
                    <div className='petful-content'>
                        {!start ? <><h1>Welcome to Petful</h1>
                        <img className='petful-img' src={petful} alt='petful img'/>
                        <p>We are an animal shelter located in Seattle WA.</p>
                        <p>We have a selection of sweet cats and dogs to choose from</p>
                        <p>Adoptions are on a first come first server basis, to begin press start</p>
                        <br></br>
                        </> : null }
                        {!start ? (
                            <button className='button' onClick={() => setStart(true)}>
                                Start
                            </button>
                        ) : (
                            <form onSubmit={(e) => {handleSubmit(e, context)}}>
                            <h1>Please enter your name</h1>
                            <br></br>
                                <label className='form'>Name:</label>
                                <input className='form' name='name' type='text' required/>
                                <p>{context.error}</p>
                                <br></br>
                                <button className='button' type='submit'>
                                    Enter the adoption line
                                </button>
                            </form>
                        )}
                    </div>
                )
            }}
        </Context.Consumer>
    )
}