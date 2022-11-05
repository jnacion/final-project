import axios from 'axios'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            role: ''
        }

    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async () => {
        const data = { username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword, role: this.state.role }
        if (this.state.password === this.state.confirmPassword) {
            try {
                let response = await axios.post(baseUrl + "/register", data);
                window.location = "/login";
            } catch (ex) {
                alert(ex);
            }

        } else {
            alert("Password and Confirm Password must match!!!")
        }
    }

    render() {
        return (
            <div>
                <div className='register-container'>
                    <div className='register-box'>
                        <h1>Create Account</h1>
                        <div>
                            <div className="buttonContainer">
                                <div>
                                    <input className="radio-button" type="radio" name="role" value="ROLE_USER" id="role-beer-lover" checked onChange={this.handleInputChange} />Beer Lover
                                </div>
                                <div>
                                    <input className="radio-button" type="radio" name="role" value="ROLE_BREWER" id="role-brewer" onChange={this.handleInputChange} />Brewer
                                </div>
                                <div>
                                    <input className="radio-button" type="radio" name="role" value="ROLE_ADMIN" id="role-admin" onChange={this.handleInputChange} />Admin
                                </div>
                            </div>
                        </div>

                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            class="form-control"
                            placeholder="Username"
                            v-model="user.username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            required
                        />
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="form-control"
                            placeholder="Password"
                            v-model="user.password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                        />
                        <input
                            type="password"
                            id="password-confirm"
                            name="confirmPassword"
                            class="form-control"
                            placeholder="Confirm Password"
                            v-model="user.password"
                            value={this.state.confirmPassword}
                            onChange={this.handleInputChange}
                            required
                        />
                        <div className="buttonContainer">
                            <div>
                                <button className="button" type="submit" onClick={this.handleSubmit}>Submit</button>
                            </div>
                            <div>
                                <Link to="/login"><button className="button" type="cancel">Cancel</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;