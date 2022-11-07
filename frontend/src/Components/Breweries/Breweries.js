import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';

function Breweries(props) {
    const [breweries, setBreweries] = useState([]);
    const token = useSelector(state=>state.token.token);
    useEffect(()=>{
        setAuthHeader(token);
        getData();
    },[token]);

    async function getData() {
        // call axios here
        try {
            //save to server
            let response = await axios.get(baseUrl + "/breweries"+window.location.search);
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