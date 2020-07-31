import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import Perceptron from '../../components/popUpNNW/perceptron/Perceptron';
export default class Home extends React.Component {

    render() {
        return <div className="home-container">
            <h2>Home</h2>
            <Link to="/nnw" >nnw</Link> 
        </div>
    }


}

