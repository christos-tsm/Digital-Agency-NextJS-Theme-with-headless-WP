'use client';

import { sendEmail } from "@/lib/wordpress/api";
import { useState, FormEvent } from 'react';

interface ContactFormData extends Record<string, string> {
    'interested-for': string;
    'your-name': string;
    'your-email': string;
    'your-tel': string;
    'your-message': string;
    'your-acceptance': string;
}

interface ContactFormProps {
    locale?: 'el' | 'en';
}

export default function ContactForm({ locale = 'el' }: ContactFormProps) {
    const [formData, setFormData] = useState<ContactFormData>({
        'interested-for': '',
        'your-name': '',
        'your-email': '',
        'your-tel': '',
        'your-message': '',
        'your-acceptance': '0',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Form IDs - μπορείς να χρησιμοποιήσεις το title ή το numeric ID
    const formId = locale === 'el' ? 'Contact Form EL' : 'Contact form EN';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setFieldErrors({});


        try {
            const result = await sendEmail(formId, formData);


            if (result.success) {
                setMessage({
                    type: 'success',
                    text: result.message || 'Το μήνυμά σας στάλθηκε επιτυχώς!',
                });

                // Reset form
                setFormData({
                    'interested-for': '',
                    'your-name': '',
                    'your-email': '',
                    'your-tel': '',
                    'your-message': '',
                    'your-acceptance': '0',
                });
            } else {
                // Handle validation errors

                if (result.invalidFields && Object.keys(result.invalidFields).length > 0) {
                    const errors: Record<string, string> = {};
                    Object.entries(result.invalidFields).forEach(([field, error]: [string, any]) => {
                        errors[field] = error.reason || error.message || 'Σφάλμα επικύρωσης';
                    });
                    setFieldErrors(errors);
                }

                setMessage({
                    type: 'error',
                    text: result.message || 'Σφάλμα κατά την αποστολή.',
                });
            }
        } catch (error) {
            console.error('Submit error:', error); // Debug log
            setMessage({
                type: 'error',
                text: 'Σφάλμα σύνδεσης. Παρακαλώ δοκιμάστε ξανά.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked ? '1' : '0',
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white p-5 rounded">
            {/* Interested For */}
            <div className="flex flex-col gap-2">
                <label htmlFor="interested-for" className="text-sm font-medium">
                    Ενδιαφέρομαι για: *
                </label>
                <div className={`px-3 py-2 border rounded ${fieldErrors['interested-for'] ? 'border-red-400' : 'border-gray-200'}`}>
                    <select
                        id="interested-for"
                        name="interested-for"
                        value={formData['interested-for']}
                        onChange={handleChange}
                        required
                        className={`w-full text-sm font-medium cursor-pointer outline-0! border-none`}
                    >
                        <option value="">Επιλέξτε...</option>
                        <option value="Εταιρική Ιστοσελίδα">Εταιρική Ιστοσελίδα</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Custom Web Εφαρμογή">Custom Web Εφαρμογή</option>
                        <option value="Συντήρηση & Υποστήρηξη">Συντήρηση & Υποστήρηξη</option>
                    </select>
                </div>

                {fieldErrors['interested-for'] && (
                    <p className="text-red-500 text-xs font-medium">{fieldErrors['interested-for']}</p>
                )}
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
                <label htmlFor="your-name" className="text-sm font-medium">
                    Όνομα *
                </label>
                <input
                    type="text"
                    id="your-name"
                    name="your-name"
                    value={formData['your-name']}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 text-sm font-medium border outline-0! rounded ${fieldErrors['your-name'] ? 'border-red-400' : 'border-gray-200'
                        }`}
                />
                {fieldErrors['your-name'] && (
                    <p className="text-red-500 text-xs font-medium">{fieldErrors['your-name']}</p>
                )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
                <label htmlFor="your-email" className="text-sm font-medium">
                    Email *
                </label>
                <input
                    type="email"
                    id="your-email"
                    name="your-email"
                    value={formData['your-email']}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 text-sm font-medium border outline-0! rounded ${fieldErrors['your-email'] ? 'border-red-400' : 'border-gray-200'
                        }`}
                />
                {fieldErrors['your-email'] && (
                    <p className="text-red-500 text-xs font-medium">{fieldErrors['your-email']}</p>
                )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
                <label htmlFor="your-tel" className="text-sm font-medium">
                    Τηλέφωνο
                </label>
                <input
                    type="tel"
                    id="your-tel"
                    name="your-tel"
                    value={formData['your-tel']}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 text-sm font-medium border outline-0! rounded ${fieldErrors['your-tel'] ? 'border-red-400' : 'border-gray-200'
                        }`}
                />
                {fieldErrors['your-tel'] && (
                    <p className="text-red-500 text-xs font-medium">{fieldErrors['your-tel']}</p>
                )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
                <label htmlFor="your-message" className="text-sm font-medium">
                    Μήνυμα *
                </label>
                <textarea
                    id="your-message"
                    name="your-message"
                    value={formData['your-message']}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-2 text-sm font-medium border outline-0! rounded ${fieldErrors['your-message'] ? 'border-red-400' : 'border-gray-200'
                        }`}
                />
                {fieldErrors['your-message'] && (
                    <p className="text-red-500 text-xs font-medium">{fieldErrors['your-message']}</p>
                )}
            </div>

            {/* Acceptance */}
            <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1 leading-1 text-sm font-medium cursor-pointer">
                    <input
                        type="checkbox"
                        name="your-acceptance"
                        checked={formData['your-acceptance'] === '1'}
                        onChange={handleChange}
                        required
                        className="accent-primary outline-0!"
                    />
                    <span>Αποδέχομαι τους όρους χρήσης *</span>
                </label>
                {fieldErrors['your-acceptance'] && (
                    <p className="text-red-500 text-xs font-medium">{fieldErrors['your-acceptance']}</p>
                )}
            </div>

            {/* Message Display */}
            {message && (
                <div
                    className={`p-2 text-sm font-medium text-center rounded ${message.type === 'success'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary-darken disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {loading ? 'Αποστολή...' : 'Αποστολή'}
            </button>
        </form>
    );
}