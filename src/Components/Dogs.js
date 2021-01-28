import React from 'react';
import Context from './Context';
import { Link } from 'react-router-dom';

export default function Dogs(props){
    const clickAdopt = (e, context) => {
        const dogUp = context.dogs[0];
        const name = context.name;
        console.log(dogUp);
        context.adoptDog(dogUp);
        context.deletePeople(name);
        context.setError('Congratulations you have successfully adopted your pet');
        context.setName('');
        context.setDogNode(context.dogs[1]); 
    };

    const clearError = (e, context) => {
        context.setError('');
    };

    return(
        <Context.Consumer>
            {(context) => {
                console.log(context);
                if(context.dogs.length < 1){
                    return (
                        <div>
                            <h3>No dogs available</h3>
                        </div>
                    );
                }
                return (
                    <div className='petful-content'>
                        <Link onClick={(e) => clearError(e,context)} to='/'>
                            <h1>Dogs</h1>
                        </Link>
                        <h2>{context.dogNode.name}</h2>
                        <img src={context.dogNode.imageURL} alt={context.dogNode.imageDescription}/>
                        <h3>About your pet</h3>
                        <p>Story: {context.dogNode.story}</p>
                        <p>Gender: {context.dogNode.gender}</p>
                        <p>Age: {context.dogNode.age}</p>
                        <p>Breed: {context.dogNode.breed}</p>
                            <button className='button' onClick={(e) => clickAdopt(e, context)}>
                                Adopt
                            </button>
                        <p className='error'>{context.error}</p>
                        <button className='button'><Link onClick={(e) => clearError(e,context)} to='/'>Go Home</Link></button>
                    </div>
                );
            }}
        </Context.Consumer>
    );
}