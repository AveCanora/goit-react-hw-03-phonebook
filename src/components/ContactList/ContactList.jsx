import React, { Component } from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import styles from './ContactList.module.css';

class ContactList extends Component {
  static defaultProps = { options: { contacts: [], filter: '' } };
  static propTypes = {
    handlers: PropTypes.shape({ onClick: PropTypes.func }).isRequired,
    options: PropTypes.shape({
      contacts: arrayOf(PropTypes.object).isRequired,
      filter: PropTypes.string.isRequired,
    }),
  };

  findContact = (list, filter) => {
    const search = filter.trim().toLowerCase();
    if (filter) {
      return list.filter(({ name }) => name.toLowerCase().indexOf(search) >= 0);
    }
    return [...list];
  };

  render() {
    const {
      handlers: { onClick },
      options: { contacts, filter },
    } = this.props;
    const filtered = this.findContact(contacts, filter);

    return (
      <ul className={styles.ContactsList}>
        {filtered.map(({ id, name, number }) => {
          return (
            <li className={styles.item} key={id}>
              <span>
                {name}: {number}
              </span>
              <button
                className={styles.button}
                onClick={() => onClick(id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ContactList;