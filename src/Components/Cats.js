import React from 'react';
import Context from './Context';
import { Link } from 'react-router-dom';

export default function Cats(props){
    const clickAdopt = (e, context) => {
        const catUp = context.cats[0];
        const name = context.name;
        console.log(catUp);
        context.adoptCat(catUp);
        context.deletePeople(name);
        context.setError('Congratulations you have successfully adopted your pet');
        context.setName('');
        context.setCatNode(context.cats[1]); 
    };

    const clearError = (e, context) => {
        context.setError('');
    };

    return(
        <Context.Consumer>
            {(context) => {
                console.log(context);
                if(context.cats.length < 1){
                    return (
                        <div>
                            <h3>No cats available</h3>
                        </div>
                    );
                }
                return (
                    <div className='petful-content'>
                        <Link onClick={(e) => clearError(e,context)} to='/'>
                            <h1>Cats</h1>
                        </Link>
                        <h2>{context.catNode.name}</h2>
                        <img src={context.catNode.imageURL} alt={context.catNode.imageDescription}/>
                        <h3>About your pet</h3>
                        <p>Story: {context.catNode.story}</p>
                        <p>Gender: {context.catNode.gender}</p>
                        <p>Age: {context.catNode.age}</p>
                        <p>Breed: {context.catNode.breed}</p>
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