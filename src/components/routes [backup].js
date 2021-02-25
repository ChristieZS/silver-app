import React from "react";
import '../css/bootstrap.min.css';

class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationInfo: [],
            locationEncounters: [],
            pokemonImageURL: [],
        };
    }

    componentDidMount() {
        let locationURL = window.location.href;
        let locationIndex = locationURL.indexOf("#") + 1;
        let locationHash = locationURL.substring(locationIndex)
        
        const apiUrl = locationHash;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                this.setState({locationInfo: data.areas[0]})
                this.obtainEncounterData()
            })
        }

    locationReformat = (loc) => {
        if(!loc) return
        let locationFormat = loc.replace(/\b\w/g, l => l.toUpperCase())
        return locationFormat.replaceAll("-", ' ');
    }

    createPokemonImage = (url) => {
        const pokeIndex = url.indexOf("mon");
        const pokeSlice = url.slice(pokeIndex + 4);
        const pokeLIndex = pokeSlice.lastIndexOf("/");
        const pokeNum = pokeSlice.slice(0, pokeLIndex)

        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/"+pokeNum+".png";
    }

    createPokemonNum = (url) => {
        const pokeIndex = url.indexOf("mon");
        const pokeSlice = url.slice(pokeIndex + 4);
        const pokeLIndex = pokeSlice.lastIndexOf("/");
        const pokeNum = pokeSlice.slice(0, pokeLIndex);
        
        return pokeNum;
    }

    obtainEncounterData() {
        const apiUrl2 = this.state.locationInfo.url;
        fetch(apiUrl2)
            .then((response) => response.json())
            .then((data) => this.setState({locationEncounters: data.pokemon_encounters})) 
    }

    morePokemonInfo = (poke) => {
        console.log("pokemon info.... ") 
        
    }

    encounterHandle(condition, chance) {
        if(condition === undefined) {
            return "All Day"
        }
        else {
            return this.reformatString(condition) + ": " + chance
        }
    }

    reformatString(str) {
        let strDash = str.replaceAll("-", ' ');
        let strCapital = strDash.replace(/\b\w/g, l => l.toUpperCase())
        return strCapital
    }

    calculateDayEncounter = (encounters) => {                                                       //passing in        poke.version_details[1].encounter_details
        console.log("passed through: " + encounters)
        console.log("length of encounters: " + encounters.length)

        return (
            encounters.map((e, i) =>                                                    //goes through each encounter for each pokemon
                e.condition_values.map((c, j) =>
                    <p>{this.encounterHandle(c.name, e.chance)}</p>
                )
            )
        )

    }


    locationEncounterList = () => {
        const boxStyle = {
            width: "120px",
            height: "120px",
            border: "groove",
            margin: "auto",
            textAlign: "center",
        }

        const flexContainer = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
        }

        const imageStyle = {
            width: "50px",
            height: "50px",
        }
        
        const info = this.state.locationEncounters;

        const items = info.map((poke, index) =>

        {if(this.createPokemonNum(poke.pokemon.url) < 252){                     //only shows pokemon whose number is 251 or lower

        return (
            <div style={flexContainer}>
                <ul key={index} id={poke.version_details} onClick={this.morePokemonInfo}>
                    <p style={boxStyle}> #{this.createPokemonNum(poke.pokemon.url)} <br/> {this.capitalize(poke.pokemon.name)} <br/>
                    <img alt={poke.pokemon.name} src={this.createPokemonImage(poke.pokemon.url)} style={imageStyle}></img> </p> <br/>
                    <hr/>

                        {(poke.version_details[1] != undefined ?
                            (<p>{this.calculateDayEncounter(poke.version_details[1].encounter_details)}</p>)
                            : (<p>No data available</p>)
                        )}
                                
                </ul>
            </div>  
        )  

        }}

        //    : <p>into else</p>
       // )}
        )

        return items;
    }

    capitalize = (s) => {
        if (typeof s !== 'string') return 'error! not string!'
        return s.charAt(0).toUpperCase() + s.slice(1)
    }


    render() {
        return (
            <div className="container">
                <h1>{this.locationReformat(this.state.locationInfo.name)}</h1>
                <div className="container d-flex flex-wrap">
                    {this.locationEncounterList()}
                </div>
            </div>
        );
    }
}

export default Routes;