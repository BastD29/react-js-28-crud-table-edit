export default function ViewRow({ contact, handleEditClick, handleDeleteClick }) {
  return (
    <>
        <td>{contact.fullName}</td>
        <td>{contact.address}</td>
        <td>{contact.phoneNumber}</td>
        <td>{contact.email}</td>
        <td>
            <button
                type='button'
                // onClick={(e) => handleEditClick(e, contact)}
                onClick={() => handleEditClick(contact)}
            >
                Edit
            </button>
            <button
                type='button'
                onClick={() => handleDeleteClick(contact.id)}
            >
                Delete
            </button>
        </td>
    </>
  )
}
