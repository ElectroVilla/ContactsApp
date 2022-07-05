import PropTypes from 'prop-types'
import React, {useState} from 'react'
import '../css/App.css';
import {Link} from 'react-router-dom'

const ListContacts = ({contacts, onDeleteContact}) => {
    const [query, setQuery] = useState('')
    const updateQuery = (query) => {
        setQuery(query.trim())
    }
    const clearQuery = () => {
        setQuery('')
    }
    const showingContacts = query === '' ? contacts : contacts.filter(contact => contact.name.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className='list-contacts'>
        <div className='list-contacts-top'>
            <input type="text" className='search-contacts' placeholder='Search Contacts' value={query} onChange={(e)=> updateQuery(e.target.value)}/>
            <Link to="/create" className='add-contact'>Add Contact</Link>
        </div>
        {
            showingContacts.length !== contacts.length && (
                <div className='showing-contacts'>
                    <span>Now Showing {showingContacts.length} of {contacts.length} total</span>
                    <button onClick={clearQuery} className='clear-contacts'>Show All</button>
                </div>
            )
        }
        <ol className='contact-list'>
            {showingContacts.map(contact => (
                <li key={contact.id} className='contact-list-item'>
                    <div className='contact-avatar' style={{ backgroundImage: `url(${contact.avatarURL})` }}></div>
                    <div className='contact-details'>
                        <p>{contact.name}</p>
                        <p>{contact.handle}</p>
                    </div>
                    <button className='contact-remove' onClick={()=>{onDeleteContact(contact)}}>Remove</button>
                </li>
            ))}
        </ol>
    </div>
  )
}
ListContacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts