import React from 'react';
import './css/bootstrap.min.css';
import { Link, Route, withRouter } from "react-router-dom";

class a extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: []
        };
    }

    componentDidMount() {
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=251';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => this.setState({pokemon: data.results}))
    }


    singlePokemonImg= (i) => {
        i++;
        return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/' +i+ '.png';
    }


    capitalize = (s) => {
        if (typeof s !== 'string') return 'error! not string!'
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
      

    render() {

    const imageStyle = {
        width: "50px",
        height: "50px",
    }

    const flexContainer = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }


    const boxStyle = {
        width: "120px",
        height: "120px",
        border: "groove",
        margin: "auto",
        textAlign: "center",
	}


        return (
            <div className="container">
        
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand">Silver</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link active" aria-current="page" href="/catchable">Catchable</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/pokedex">Pokedex</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="d-flex flex-wrap">
                    {this.state.pokemon.map((pokemon, index) => (
                        <div style={flexContainer}>
                            <p key={index} style={boxStyle}> {index+1} <br/> {this.capitalize(pokemon.name)} <br/> <img src={this.singlePokemonImg(index)} style={imageStyle} /> </p> 
                        </div>
                    ))}
            </div>

            </div>
        );
    }
}

export default a;