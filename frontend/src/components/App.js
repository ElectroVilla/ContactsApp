import {useState, useEffect} from 'react';
import '../css/App.css';
import ListContacts from './ListContacts';
import * as ContactsAPI from '../utils/ContactsAPI';
import CreateContact from './CreateContact';
import {Routes, Route, useNavigate} from 'react-router-dom';

const App = () => {
  let navigate = useNavigate();
  const removeContact = (contact) => {
    ContactsAPI.remove(contact)
    setContacts(contacts.filter(c => c.id !== contact.id));
  }
  const [contacts, setContacts] = useState([]);
  const createContact = (contact) => {
    // ContactsAPI.create(contact)
    const create = async () => {
      const res = await ContactsAPI.create(contact);
    setContacts(contacts.concat(res));
    // setContacts([...contacts, contact]);
    }
    create()
    navigate('/');
  }
  // const [screen, setScreen] = useState('show');
  useEffect(() => {
    ContactsAPI.getAll().then(setContacts); // --> CoPilot: One Line of Code
    // const getContacts = async () => {    // --> UDACITY: Four Lines of Code
    //   const contacts = await ContactsAPI.getAll();
    //   setContacts(contacts);
    // }
    // getContacts();
  }, [])
  return (
    <Routes>
      <Route exact path="/" element={<ListContacts contacts={contacts} onDeleteContact={removeContact} />} />
      <Route path="/create" element={<CreateContact onCreateContact={(contact)=>{createContact(contact)}}/>} />
    </Routes>
    /*
    <div>
      {
        screen === 'show' && (<ListContacts  contacts={contacts} onDeleteContact={removeContact} 
        onNavigate={() => {
          setScreen('create');
        }}/>)
      }
      {
        screen === 'create' && (<CreateContact />)
      }
      
    </div>
    */
  );
}

export default App;
// const [contacts, setContacts] = useState([
//     {
//       id: "karen",
//       name: "Karen Isgrigg",
//       handle: "karen_isgrigg",
//       avatarURL: "http://localhost:5001/karen.jpg",
//     },
//     {
//       id: "richard",
//       name: "Richard Kalehoff",
//       handle: "richardkalehoff",
//       avatarURL: "http://localhost:5001/richard.jpg",
//     },
//     {
//       id: "tyler",
//       name: "Tyler McGinnis",
//       handle: "tylermcginnis",
//       avatarURL: "http://localhost:5001/tyler.jpg",
//     },
//     ]);