import React, { Component } from 'react';
import firebase from './config/Fire.js';
import '../resources/scss/style.scss';




class Workoutbank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const database = firebase.firestore().collection('trainingprogram');
    database.onSnapshot(this.getCollection);

  }

  getCollection = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { name, type, purpose, description, material } = doc.data();
      data.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        type,
        material,
        purpose,
        description
      });
    });
    this.setState({
      data
    });
  }

  render() {

    return (
      <section className="workoutPage">
        <div className="workoutPage-wrapper">
          <h2>ÖVNINGSBANK</h2>
          {this.state.data.map(each =>
            <ul className="workoutPage-list" key={each.id}>
              <li>{each.name}</li>
              <li>{each.type}</li>
              <li>{each.purpose}</li>
              <li>{each.material}</li>
              <li>{each.description}</li>
            </ul>
          )}
        </div>
      </section>
    );
  }
}


export default Workoutbank;