import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { form_id, form_data } = body;

        const WP_BASE_URL = process.env.WORDPRESS_URL;

        if (!WP_BASE_URL) {
            return NextResponse.json(
                { success: false, message: 'WordPress URL not configured' },
                { status: 500 }
            );
        }

        const response = await fetch(`${WP_BASE_URL}/wp-json/mediamind/v1/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                form_id,
                form_data
            })
        });

        let data: any;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            data = { message: text };
        }

        if (!response.ok) {
            // Extract error info - handle both WP_Error and direct error formats
            const errorMessage = data.message || data.data?.message || 'Σφάλμα κατά την αποστολή';

            // **FIX: Handle invalid_fields from WP_Error data property**
            let invalidFields = {};

            // Check data.data.invalid_fields (WP_Error format)
            if (data.data?.invalid_fields) {
                invalidFields = data.data.invalid_fields;
            }
            // Check data.invalid_fields (direct format)
            else if (data.invalid_fields) {
                invalidFields = data.invalid_fields;
            }
            // Check data.response.invalid_fields (nested format)
            else if (data.response?.invalid_fields) {
                // If it's an array, convert to object
                if (Array.isArray(data.response.invalid_fields)) {
                    data.response.invalid_fields.forEach((fieldError: any) => {
                        if (fieldError.field) {
                            (invalidFields as Record<string, any>)[fieldError.field] = {
                                message: fieldError.message || 'Validation error',
                                reason: fieldError.message || 'Validation error'
                            };
                        }
                    });
                } else {
                    invalidFields = data.response.invalid_fields;
                }
            }

            console.log('Invalid fields:', invalidFields);

            return NextResponse.json(
                {
                    success: false,
                    message: errorMessage,
                    invalidFields
                },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error in send-email API route:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Σφάλμα σύνδεσης. Παρακαλώ δοκιμάστε ξανά.'
            },
            { status: 500 }
        );
    }
}