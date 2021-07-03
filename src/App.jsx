import React, { Component } from "react";
import shortid from "shortid";

import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";

import styles from "./App.module.css";

class Contact {
  constructor(name, number) {
    this.id = shortid.generate();
    this.name = name;
    this.number = number;
  }
}
class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  onChangeInput = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  findContact = (nameContact) =>
    this.state.contacts.find(({ name }) => name === nameContact);

  addContactHandler = ({ name, number }) => {
    if (this.findContact(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(({ contacts }) => {
      return { contacts: [...contacts, new Contact(name, number)] };
    });
  };

  deleteContactHandler = (idContact) => {
    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts].filter(({ id }) => id !== idContact),
      };
    });
  };
  componentDidMount() {

    const contacts = localStorage.getItem('contacts');
    const parselContacts = JSON.parse(contacts);
    if (parselContacts) { this.setState({ contacts: parselContacts }); }


  };
  componentDidUpdate(prevProps, prevState) {

    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновилось поле contacts');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm
          handlers={{
            onSubmit: this.addContactHandler,
          }}
        />
        <h2>Contacts</h2>
        <Filter
          handlers={{
            onChange: this.onChangeInput,
          }}
          options={{ filter }}
        />
        <ContactList
          handlers={{ onClick: this.deleteContactHandler }}
          options={{ contacts, filter }}
        />
      </div>
    );
  }
}
export default App;
