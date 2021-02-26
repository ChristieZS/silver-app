import React from "react";
import {Link, Route, Switch } from "react-router-dom";
import './css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Pokedex from "./components/pokedex";
import Catchable from "./components/catchable";
import silverLogo from './images/silverlogo.jpg';
import goldLogo from './images/goldlogo.jpg';
import Kanto from "./components/kanto";
import Johto from "./components/johto";
import Routes from "./components/routes";

export default function App() {

    const navbarSilver = {backgroundColor: '#6AADD7'};
    const navbarGold = {backgroundColor: '#A28F61'};
    const linkStyle = {color: 'black', fontSize: '25px', borderStyle: 'inset', borderColor: 'black', borderRadius: '25px', borderWidth: 'thin', padding: '20px'};
    const versionLinkStyle = {color: 'black', backgroundColor: 'white', fontSize: '20px', borderStyle: 'inset', borderColor: 'black', borderRadius: '25px', borderWidth: 'thin', padding: '10px', height: '50px', width: '100px'}
    const titleStyle = {color: 'white', fontSize: '25px'};
  
    function versionHandler(e) {
        var verid = e.target.id
        document.cookie = "version=" + verid;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function navbarColour() {
        return ((getCookie("version") === "silver") ? navbarSilver : navbarGold)
    }

    function navbarLogo() {
        return ((getCookie("version") === "silver") ? silverLogo : goldLogo)
    }

    function versionText() {
        return ((getCookie("version") === "silver") ? "Silver" : "Gold")
    }

  	return (
		<div>
			<Navbar style={navbarColour()} expand="lg" className="navbar">
				<Navbar.Brand>
                    <img src={navbarLogo()} width="200" height="100" className="d-inline-block" alt=""></img>
                    <span style={titleStyle}> &nbsp; {versionText()} </span>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav"/>

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
                        <Link to="/" className="nav-link" style={linkStyle}>Pokédex</Link>
                        &nbsp; &nbsp; &nbsp;
                        <Link to="/catchable" className="nav-link" style={linkStyle}>Route Catchables</Link>
                        &nbsp; &nbsp; &nbsp;
					</Nav>
				</Navbar.Collapse>

				<Navbar.Collapse id="basic-navbar-nav">
                    <Button href={window.location.href} style={versionLinkStyle} id="silver" onClick={((e) => versionHandler(e))}>Silver</Button>
                    &nbsp;
                    <Button href={window.location.href} style={versionLinkStyle} id="gold" onClick={((e) => versionHandler(e))}>Gold</Button>
				</Navbar.Collapse>

			</Navbar>

			<Switch>
				<Route exact path="/"><Pokedex /></Route>
				<Route path="/catchable"><Catchable /></Route>
				<Route path="/johto"><Johto /></Route>
				<Route path="/kanto"><Kanto /></Route>
				<Route path="/routes"><Routes /></Route>
			</Switch>
		</div>
  	);
}
