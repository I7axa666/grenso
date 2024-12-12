import CONTACTS from '../js/contactsList';
import PropTypes from 'prop-types';

const contacts = CONTACTS;

const ContactCard = ({ contacts }) => (
<div className="col-lg-6 col-md-6 col-sm-12 mb-4">
    <div className="card h-100" style={{ backgroundColor: '#f8f9fa', borderColor: '#007bff' }}>
     <div className="card-body text-center">
        <img
         src={contacts.image}
         alt={`${contacts.firstName} ${contacts.lastName}`}
         className="rounded-circle mb-3"
         style={{ width: '100px', height: '100px' }}
        />
        <h5 className="card-title">{contacts.title}</h5>
        <h6>{`${contacts.firstName} ${contacts.lastName}`}</h6>
        <p className="card-text text-muted">{contacts.email}</p>
        <p className="card-text text-muted">{contacts.phone}</p>
     </div>
    </div>
</div>
);

const ContactList = () => (
<div className="container">
    <div className="row justify-content-center mb-4">
     {/* Первая карточка, центрированная на всех размерах экрана */}
     {/* <div className="col-12 col-md-8"> */}
        <ContactCard contacts={contacts[0]} />
     {/* </div> */}
    </div>
    <div className="row">
     {/* Остальные карточки */}
     {contacts.slice(1).map((contacts, index) => (
        // <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-4">
         <ContactCard key={index} contacts={contacts} />
        // </div>
     ))}
    </div>
</div>
);

ContactCard.propTypes = {
   contacts: PropTypes.shape({
     image: PropTypes.string.isRequired,
     firstName: PropTypes.string.isRequired,
     lastName: PropTypes.string.isRequired,
     title: PropTypes.string.isRequired,
     email: PropTypes.string.isRequired,
     phone: PropTypes.string.isRequired,
   }).isRequired,
 };

export default ContactList;
