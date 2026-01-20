import { useState } from 'react';

interface UseContactFormReturn {
    submitForm: (formData: Record<string, string>) => Promise<{ success: boolean; message: string }>;
    loading: boolean;
    error: string | null;
}

export function useContactForm(formId: string | number): UseContactFormReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitForm = async (formData: Record<string, string>) => {
        setLoading(true);
        setError(null);

        try {
            const wpApiUrl = process.env.NEXT_PUBLIC_WP_API_URL || '';

            const response = await fetch(`${wpApiUrl}/wp-json/mediamind/v1/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    form_id: formId,
                    form_data: formData,
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                return { success: true, message: result.message };
            } else {
                const errorMsg = result.message || 'Σφάλμα κατά την αποστολή';
                setError(errorMsg);
                return { success: false, message: errorMsg };
            }
        } catch (err) {
            const errorMsg = 'Σφάλμα σύνδεσης';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    return { submitForm, loading, error };
}