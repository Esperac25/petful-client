import React from 'react';
import { Link } from 'react-router-dom';

export default function AdoptionPage(){
    return(
        <div className='petful-content'>
            <h1>Choose your pet</h1>
            <button className='button'><Link to='/dog'>Dogs</Link></button>
            <br></br>
            <br></br>
            <button className='button'><Link to='/cat'>Cats</Link></button>
        </div>
    );
}