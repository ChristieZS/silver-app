import React from 'react';
import '../css/bootstrap.min.css';

class Pokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: [],
            routes: []
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
        const capString = s.charAt(0).toUpperCase() + s.slice(1)
        const dashString = capString.replace("-"," ")
        return dashString
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
    
    const pagePadding = {
        paddingTop: '50px',
        paddingLeft: '50px',
        paddingRight: '50px',
    }
    
        return (
            <div className="container" style={pagePadding}>
                <div className="d-flex flex-wrap">
                    {this.state.pokemon.map((pokemon, index) => (
                        <div style={flexContainer}>
                            <p key={index} style={boxStyle}> #{index+1} <br/> {this.capitalize(pokemon.name)} <br/> <img src={this.singlePokemonImg(index)} alt='logo' style={imageStyle} /> </p> 
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Pokedex;