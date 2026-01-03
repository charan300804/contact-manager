import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/contacts',
});

export const fetchContacts = () => API.get('/');
export const createContact = (newContact) => API.post('/', newContact);
export const deleteContact = (id) => API.delete(`/${id}`);
