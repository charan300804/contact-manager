import React, { useEffect, useState } from 'react';
import { fetchContacts, deleteContact } from '../api';
import ContactItem from './ContactItem';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ContactList = ({ refreshTrigger, setTotalCount }) => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Load Contacts
    useEffect(() => {
        const loadContacts = async () => {
            try {
                setLoading(true);
                const { data } = await fetchContacts();
                // Sort alphabetically by name
                const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
                setContacts(sorted);
                if (setTotalCount) setTotalCount(data.length);
            } catch (error) {
                toast.error("Failed to load contacts");
            } finally {
                setLoading(false);
            }
        };
        loadContacts();
    }, [refreshTrigger, setTotalCount]);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this contact?')) return;
        try {
            await deleteContact(id);
            const updated = contacts.filter(c => c._id !== id);
            setContacts(updated);
            if (setTotalCount) setTotalCount(updated.length);
            toast.success("Contact deleted");
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    // Filter Logic
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
    );

    // Group by First Letter
    const groupedContacts = filteredContacts.reduce((acc, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(contact);
        return acc;
    }, {});

    const sortedKeys = Object.keys(groupedContacts).sort();

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800">My patients</h2>

                {/* Search Bar */}
                <div className="relative w-1/2">
                    <FaSearch className="absolute left-4 top-3.5 text-slate-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-full pl-10 pr-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <FaSpinner className="animate-spin text-blue-500 text-2xl" />
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {filteredContacts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-400">No contacts found</p>
                        </div>
                    ) : (
                        // Grouped List
                        <div className="space-y-6">
                            {sortedKeys.map(letter => (
                                <motion.div
                                    key={letter}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="relative"
                                >
                                    <h3 className="text-blue-500 font-bold mb-2 ml-4 text-sm">{letter}</h3>
                                    {groupedContacts[letter].map(contact => (
                                        <ContactItem key={contact._id} contact={contact} onDelete={handleDelete} />
                                    ))}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ContactList;
