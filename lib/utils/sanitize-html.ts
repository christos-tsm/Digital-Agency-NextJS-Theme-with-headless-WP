import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHTML(html: string): string {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'a', 'span', 'strong', 'em', 'b', 'i',
            'ul', 'ol', 'li', 'br', 'code', 'pre',
            'blockquote', 'u', 's', 'sub', 'sup'
        ],
        ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class', 'id']
    });
}