import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactItem = ({ contact, onDelete }) => {
    // Generate random pastel color for avatar based on name
    const getAvatarColor = (name) => {
        const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'];
        const index = name.length % colors.length;
        return colors[index];
    };

    const initials = contact.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-4 mb-2 hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer"
        >
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className={`w-12 h-12 ${getAvatarColor(contact.name)} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm border-2 border-white`}>
                    {initials}
                </div>

                {/* Info */}
                <div>
                    <h3 className="font-bold text-slate-800 text-base leading-tight">{contact.name}</h3>
                    <p className="text-slate-400 text-sm font-medium mt-0.5">{contact.phone}</p>
                </div>
            </div>

            {/* Actions */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(contact._id);
                }}
                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 p-2 transition-all"
            >
                <FaTrash />
            </button>
        </motion.div>
    );
};

export default ContactItem;
