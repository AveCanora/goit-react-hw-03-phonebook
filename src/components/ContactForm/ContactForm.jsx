import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css";

class ContactForm extends Component {
  static defaultProps = {};
  static propTypes = {
    handlers: PropTypes.shape({ onClick: PropTypes.func }).isRequired,
    options: PropTypes.shape({}),
  };
  state = {
    name: "",
    number: "",
  };

  onChangeInput = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const {
      handlers: { onSubmit },
    } = this.props;
    onSubmit(this.state);
    this.onResetInputsHandler();
  };

  onResetInputsHandler = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form
        className={styles.ContactsForm}
        onSubmit={this.onSubmitHandler}
        onReset={this.onResetInputsHandler}
      >
        <div className={styles.field}>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              onChange={this.onChangeInput}
              value={name}
              required
            />
          </label>

          <label className={styles.label}>
            Number
            <input
              className={styles.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              onChange={this.onChangeInput}
              value={number}
              required
            />
          </label>
        </div>
        <div className={styles.field}>
          <button className={styles.button} type="submit">
            Add contact
          </button>
        </div>
      </form>
    );
  }
}

export default ContactForm;
