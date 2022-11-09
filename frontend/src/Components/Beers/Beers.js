import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';

function Beers(props) {
    // store list of beers in state
    const [beers, setBeers] = useState([]);
    // get token and user from redux store
    const token = useSelector(state=>state.token.token);
    const user = useSelector(state=>state.user);

    // set auth token in axios header before loading list of beers
    useEffect(()=>{
        setAuthHeader(token);
        getData();
    },[token]);

    async function getData() {
        try {
            // get list of beers 
            let response = await axios.get(baseUrl + "/beers");
            // and save to state
            setBeers(response.data);
        } catch (ex) {
            alert(ex);
        }
    }
    // check if current user is brewer
    let isBrewer = false;
    let role = user.authorities[0]
    if (role) {
        if (role.name === "ROLE_ADMIN" ||
            (role.name === "ROLE_BREWER" && user.breweryId && user.breweryId !== 0)) {
            isBrewer = true;
        }
    }
    return (
        <div>
            <MainMenu />
            <div>Beers component</div>
            <div className="buttonContainer">
                {isBrewer?
                    (
                        <div>
                            <Link to="/beer-info"><button className="button" type="button">Add</button></Link>
                        </div>
                    ):null
                }
            </div>
            <ul>
                {
                    beers.map(beer=>{
                        let link = "/beer-info?" + beer.beerId;
                        return(
                            <li key={beer.beerId}>
                                <div><Link to={link}>{beer.name}</Link></div>
                            </li>
                        );
                    })
                }
            </ul>

        </div>
    )
}
export default Beers;