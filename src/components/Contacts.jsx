import CONTACTS from '../js/contactsList';

const contacts = CONTACTS;

const ContactCard = ({ contact }) => (
<div className="col-lg-6 col-md-6 col-sm-12 mb-4">
    <div className="card h-100" style={{ backgroundColor: '#f8f9fa', borderColor: '#007bff' }}>
     <div className="card-body text-center">
        <img
         src={contact.image}
         alt={`${contact.firstName} ${contact.lastName}`}
         className="rounded-circle mb-3"
         style={{ width: '100px', height: '100px' }}
        />
        <h5 className="card-title">{contact.title}</h5>
        <h6>{`${contact.firstName} ${contact.lastName}`}</h6>
        <p className="card-text text-muted">{contact.email}</p>
        <p className="card-text text-muted">{contact.phone}</p>
     </div>
    </div>
</div>
);

const ContactList = () => (
<div className="container">
    <div className="row justify-content-center mb-4">
     {/* Первая карточка, центрированная на всех размерах экрана */}
     {/* <div className="col-12 col-md-8"> */}
        <ContactCard contact={contacts[0]} />
     {/* </div> */}
    </div>
    <div className="row">
     {/* Остальные карточки */}
     {contacts.slice(1).map((contact, index) => (
        // <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4">
         <ContactCard contact={contact} />
        // </div>
     ))}
    </div>
</div>
);

export default ContactList;
