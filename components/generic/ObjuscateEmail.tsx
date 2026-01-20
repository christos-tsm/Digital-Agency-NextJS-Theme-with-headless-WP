'use client';

import Obfuscate from 'react-obfuscate';

export default function ObfuscatedEmail({ email }: { email: string }) {
    return <Obfuscate email={email} />;
}