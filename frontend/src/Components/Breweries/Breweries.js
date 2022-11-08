import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';

function Breweries(props) {
    // store list of breweries in state
    const [breweries, setBreweries] = useState([]);
    // get token from redux store
    const token = useSelector(state=>state.token.token);

    // set auth token in axios header before loading list of breweries
    useEffect(()=>{
        setAuthHeader(token);
        getData();
    },[token]);

    async function getData() {
        try {
            // get list of breweries 
            let response = await axios.get(baseUrl + "/breweries"+window.location.search);
            // and save to state
            setBreweries(response.data);
        } catch (ex) {
            alert(ex);
        }
    }

    return (
        <div>
            <MainMenu />
            <div>Breweries component</div>
            <ul>
                {
                    breweries.map(brewery=>{
                        let link = "/brewery-info?" + brewery.breweryId;
                        return(
                            <li key={brewery.breweryId}>
                                <div><Link to={link}>{brewery.name}</Link></div>
                            </li>
                        );
                    })
                }
            </ul>

        </div>
    )
}

export default Breweries;