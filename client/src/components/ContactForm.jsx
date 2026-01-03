import React, { useState } from 'react';
import { createContact } from '../api';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

const ContactForm = ({ onContactAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) {
            toast.error("Name and Phone are required");
            return;
        }

        setIsSubmitting(true);
        try {
            await createContact(formData);
            toast.success("Contact Added");
            setFormData({ name: '', email: '', phone: '', message: '' });
            onContactAdded();
        } catch (error) {
            toast.error("Failed to add");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                />
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
                >
                    {isSubmitting ? 'Saving...' : <><FaPlus className="text-sm" /> Add New</>}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
