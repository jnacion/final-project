import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';

function BreweryInfo(props) {
    const [brewery, setBrewery] = useState({
        "id": "",
        "name": "",
        "history": "",
        "address": "",
        "phone": "",
        "email": "",
        "imgUrl": "",
        "hours": "",
        "petFriendly": true
    });
    useEffect(() => {
        setAuthHeader();
        getData();
    }, []);

    async function getData() {
        // call axios here
        try {
            //save to server
            let response = await axios.get(baseUrl + "/breweries" + window.location.search);
            setBrewery(response.data[0]);
        } catch (ex) {
            alert(ex);
        }
    }

    function handleInputChange(event) {
        event.preventDefault()
        setBrewery({
            ...brewery,
            [event.target.name]: event.target.value
        })
    }
    async function handleSubmit() {
        // TO DO: validate brewery information before sending to server
        try {
            //save to server
            let response = await axios.put(baseUrl + "/breweries/" + brewery.breweryId, brewery);
            window.location = "/breweries";
        } catch (ex) {
            alert(ex);
        }
    }
    return (
        <div>
            <MainMenu />
            <div>BreweryInfo component</div>
            <label className="label">Brewery Name</label>
            <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                placeholder="Brewery Name"
                v-model="brewery.name"
                onChange={handleInputChange}
                value={brewery.name}
                required
            />
            <label className="label">History</label>
            <input
                type="text"
                id="history"
                name="history"
                class="form-control"
                placeholder="History"
                v-model="brewery.history"
                onChange={handleInputChange}
                value={brewery.history}
                required
            />
            <div className="buttonContainer">
                <div>
                    <button className="button" type="submit" onClick={handleSubmit}>Submit</button>
                </div>
                <div>
                    <Link to="/breweries"><button className="button" type="cancel">Cancel</button></Link>
                </div>
            </div>
        </div>
    )
}

export default BreweryInfo;