import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import EditRow from './components/EditRow';
import ViewRow from './components/ViewRow';
import data from './data/data.json';

export default function App() {

  const [contacts, setContacts] = useState(data);
  const [editContactId, setEditContactId] = useState(null);

  // ADD ROW

  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const handleAddFormChange = (e) => {
    // e.preventDefault();
    const newFormData = { ...addFormData };
    newFormData[e.target.name] = e.target.value;
    setAddFormData(newFormData);
  }

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    const newContacts = [ ...contacts, newContact ];
    setContacts(newContacts);
  }

  // EDIT ROW

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const handleEditFormChange = (e) => {
    // e.preventDefault();
    const newFormData = { ...editFormData };
    newFormData[e.target.name] = e.target.value;
    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };
    const newContacts = [ ...contacts ];
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    // console.log(index);
    newContacts[index] = editedContact;
    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (contact) => {
    // e.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  }

  // DELETE ROW

  const handleDeleteClick = (contactId) => {
    const newContacts = [ ...contacts ];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  }

  return (
    <>
      <form
        onSubmit={handleEditFormSubmit}
      >
        <table>
          <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                {editContactId === contact.id ? (
                  <EditRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    
                  />
                ) : (
                  <ViewRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      
      <hr />
      <form 
        onSubmit={handleAddFormSubmit}
      >
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an address..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  )
}
