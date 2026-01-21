import sanitizeHtml from 'sanitize-html';

export function sanitizeHTML(html: string): string {
    return sanitizeHtml(html, {
        allowedTags: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'a', 'span', 'strong', 'em', 'b', 'i',
            'ul', 'ol', 'li', 'br', 'code', 'pre',
            'blockquote', 'u', 's', 'sub', 'sup'
        ],
        allowedAttributes: {
            'a': ['href', 'title', 'target', 'rel', 'class', 'id'],
            '*': ['class', 'id']
        },
        allowedSchemes: ['http', 'https', 'mailto'],
        allowedSchemesByTag: {
            'a': ['http', 'https', 'mailto']
        }
    });
}