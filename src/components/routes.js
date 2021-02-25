import React from "react";
import '../css/bootstrap.min.css';

class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationInfo: [],
            pokemonImageURL: [],
            APIError: false,
            locationArray: [],
            locationEncounters0: [],
            locationEncounters1: [],
            locationEncounters2: [],
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
                this.setState({locationInfo: data})
                this.obtainEncounterData()
            })
            .catch(function() {
                console.log("API error")
            }.bind(this))
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
        for(var i=0; this.state.locationInfo.areas.length; i++) {
            const statee = "locationEncounters" + i
            fetch(this.state.locationInfo.areas[i].url)
                .then((response) => response.json())
                .then((data) => this.setState({[statee]: data}))
                .then(this.state.locationArray.push(statee)) 
        }
    }

    levelChecker = (min, max) => {
        if(min === max){
            return min
        }
        else if(min !== max){
            return min + " - " + max
        }
        else{
            return "Level calculating error!"
        }
    }

    encounterHandle = (condition, chance, method, minLev, maxLev) => {
        if(condition === "All Day" || condition === "time-day" || condition === "time-night" || condition === "time-morning"){
            return this.reformatString(condition) + ": " + chance + " [" + this.reformatString(method) + "] (Level: " + this.levelChecker(minLev, maxLev) + ")"
        }

        else if(condition === "swarm-no"){
            return "All Day: " + chance + " [" + this.reformatString(method) + "] (Level: " + this.levelChecker(minLev, maxLev) + ")"
        }

        else if(condition === "swarm-yes"){
            return "Swarm Encounter: " + chance + " [" + this.reformatString(method) + "] (Level: " + this.levelChecker(minLev, maxLev) + ")"
        }

        else {
            return "encounterHandle error..."
        }
    }

    reformatString(str) {
        let strDash = str.replaceAll("-", ' ');
        let strCapital = strDash.replace(/\b\w/g, l => l.toUpperCase())
        return strCapital
    }
    
    capitalize = (s) => {
        if (typeof s !== 'string') return 'error! not string!'
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    calculateDayEncounter = (encounters) => {                                                       //passing in        poke.version_details[1].encounter_details
        console.log("passed through: " + encounters)
        console.log("length of encounters: " + encounters.length)

        return (
            encounters.map((e, i) =>                                                    //goes through each encounter for each pokemon
                (e.condition_values.length === 0 ?
                <p>{this.encounterHandle("All Day", e.chance, e.method.name, e.min_level, e.max_level)}</p>
            :
                e.condition_values.map((c, j) =>
                    <p>{this.encounterHandle(c.name, e.chance, e.method.name, e.min_level, e.max_level)}</p>
                ))
            )
        )
    }

    versionChecker = (versions) => {
        for(var i=0; i < versions.length; i++) {
            if(versions[i].version.name === "silver") {
                console.log("trrruueee " + versions[i].version.name)
                return true
            }
        }
    }

    versionIndexChecker = (ver) => {
        for(var i=0; i < ver.length; i++) {
            if(ver[i].version.name === "silver") {
                return i
            }
        }
    }

    renderPokemon = (poke, index) => {
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

        return (
            <div style={flexContainer}>
                <ul key={index}>
                    <p style={boxStyle}> #{this.createPokemonNum(poke.pokemon.url)} <br/> {this.capitalize(poke.pokemon.name)} <br/>
                    <img alt={poke.pokemon.name} src={this.createPokemonImage(poke.pokemon.url)} style={imageStyle}></img> </p> <br/>
                    <hr/>
                    <p>{this.calculateDayEncounter(poke.version_details[this.versionIndexChecker(poke.version_details)].encounter_details)}</p>
                </ul>
            </div>
        ) 
    }

    locationEncounterList = () => {
        return (
            <div className="container">
                {this.state.locationArray.map((loc) => {
                    return (
                        <div>
                        {(this.state[loc]?.name) ? <h2>{this.locationReformat(this.state[loc].name)}</h2> : "Error: Location Not Found"}
                        <br/>
                            <div className="container d-flex flex-wrap">
                                    {this.state[loc]?.pokemon_encounters ? this.state[loc].pokemon_encounters.map((poke, index) => {
                                        return(this.versionChecker(poke.version_details) ? this.renderPokemon(poke, index) : <p></p>)
                                    })
                                    :
                                        "Error: Pokemon Encounters Undefined"
                                    }
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h1>{this.locationReformat(this.state.locationInfo.name)}</h1>
                <br/>
                {this.locationEncounterList()}
            </div>
        );
    }
}

export default Routes;