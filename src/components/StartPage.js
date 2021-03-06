
import React, { Component } from 'react';
import fire from './config/Fire';
import '../resources/scss/style.scss';


class StartPage extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      email: '',
      password: '',
      user: { user: false }
    }
  }


  componentDidMount() {
    this.authListener();
  }


  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user: true });
        console.log('inloggad');

      } else {
        /*this.setState({ user : false});*/
        /*alert('fel fel fel, fel email eller lösen')*/
        console.log('ej loggad');
      }
    });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      window.location.href = "/profile";
    }).catch((error) => {
      console.log(error);
    });

  }

  logout() {
    fire.auth().signOut().then((u) => {
      window.location.href = "/";
    }).catch((error) => {
      console.log(error);
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {


    return (

      <div className="App">
        {/*{this.state.user ? (<Profile />) : (<StartPage />)}*/}
        <div id="headerWrapper">
          <h1>WOFFOUT</h1>
        </div>
        <header className="App-header">
          <div className="inputWrapper">
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" id="username" placeholder="Användarnamn"></input>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" id="password" placeholder="Lösenord"></input>
            <button onClick={this.login} className="button" id="login">Log in</button>
            <button className="button" id="gotosignUp"><a href="/Registration">Skapa konto</a></button>
            <button onClick={this.logout} className="button" id="logout">Log out</button>
          </div>
        </header>
      </div>
    );


  }
}


export default StartPage;
