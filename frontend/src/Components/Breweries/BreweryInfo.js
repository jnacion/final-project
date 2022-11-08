import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';

function BreweryInfo(props) {
    // store currently selected brewery in state
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
    // get token and current user from redux store
    const token = useSelector(state=>state.token.token);
    const user = useSelector(state=>state.user);

    // set auth token in axios header before loading list of breweries
    useEffect(() => {
        setAuthHeader(token);
        getData();
    }, [token]);

    async function getData() {
        try {
            // get brewery from web api using the query string passed to the page
            let response = await axios.get(baseUrl + "/breweries" + window.location.search);
            setBrewery(response.data[0]);
        } catch (ex) {
            alert(ex);
        }
    }

    // update brewery in state for each change in every form element
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
            await axios.put(baseUrl + "/breweries/" + brewery.breweryId, brewery);
            // then redirect to list of breweries
            window.location = "/breweries";
        } catch (ex) {
            alert(ex);
        }
    }
    // check if current user can edit the form
    let isEditable = false;
    let role = user.authorities[0]
    if(role) {
        if(role.name==="ROLE_ADMIN" ||
        (role.name==="ROLE_BREWER" && user.breweryId===brewery.breweryId)) {
            isEditable = true;
        } 
    }
    // change display based on access
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
            <label className="label">Address</label>
            <input
                type="text"
                id="address"
                name="address"
                class="form-control"
                placeholder="Address"
                v-model="brewery.address"
                onChange={handleInputChange}
                value={brewery.address}
                required
            />
            <label className="label">Phone</label>
            <input
                type="text"
                id="phone"
                name="phone"
                class="form-control"
                placeholder="Phone"
                v-model="brewery.phone"
                onChange={handleInputChange}
                value={brewery.phone}
                required
            />
            <label className="label">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                placeholder="Email"
                v-model="brewery.email"
                onChange={handleInputChange}
                value={brewery.email}
                required
            />
            <label className="label">Image</label>
            <input
                type="text"
                id="imgUrl"
                name="imgUrl"
                class="form-control"
                placeholder="Image Url"
                v-model="brewery.imgUrl"
                onChange={handleInputChange}
                value={brewery.imgUrl}
                required
            />
            <label className="label">Hours</label>
            <input
                type="text"
                id="hours"
                name="hours"
                class="form-control"
                placeholder="Hours"
                v-model="brewery.hours"
                onChange={handleInputChange}
                value={brewery.hours}
                required
            />
            <label className="label">Pet Friendly</label>
            <input
                type="checkBox"
                id="petFriendly"
                name="petFriendly"
                class="form-control"
                v-model="brewery.petFriendly"
                onChange={handleInputChange}
            />
            <div className="buttonContainer">
                {isEditable?
                    (
                        <div>
                            <button className="button" type="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                    ):null
                }
                <div>
                    <Link to="/breweries"><button className="button" type="cancel">Cancel</button></Link>
                </div>
            </div>
        </div>
    )
}

export default BreweryInfo;