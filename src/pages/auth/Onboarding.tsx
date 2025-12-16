
import React, { useState } from 'react';
import TransactionPinSetup from '@/components/Dashboard/TransactionPin/TransactionPinSetup';
import AvatarSelection from '@/components/Dashboard/Onboarding/AvatarSelection';


const TransactionPinStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
    // Simulate hasPinSet as false for onboarding
    const handlePinSet = async () => {
        // Simulate backend call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onNext();
    };
    return <TransactionPinSetup onPinSet={handlePinSet} hasPinSet={false} />;
};

const AvatarStep: React.FC<{ onNext: (avatarUrl: string) => void }> = ({ onNext }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AvatarSelection onSelectAvatar={onNext} />
    </div>
);

const UsernameStep: React.FC<{ onNext: (username: string) => void }> = ({ onNext }) => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!username.trim()) {
            setError('Username is required');
            return;
        }
        setLoading(true);
        // Simulate backend call
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setLoading(false);
        onNext(username);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Choose a Username</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter a unique username"
                style={{ padding: '0.5rem', margin: '1rem 0', borderRadius: 4, border: '1px solid #ccc', width: 220 }}
                disabled={loading}
            />
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <button type="submit" disabled={loading} style={{ padding: '0.5rem 1.5rem' }}>
                {loading ? 'Saving...' : 'Continue'}
            </button>
        </form>
    );
};

const Onboarding: React.FC = () => {
    const [step, setStep] = useState(1);
    // const [pin, setPin] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePinNext = () => {
        setStep(2);
    };

    const handleAvatarNext = (avatar: string) => {
        setAvatarUrl(avatar);
        setStep(3);
    };

    const handleUsernameNext = async (uname: string) => {
        setUsername(uname);
        setSubmitting(true);
        // Simulate sending all onboarding info to backend
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitting(false);
        setSuccess(true);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ marginBottom: 24 }}>Onboarding</h1>
            {success ? (
                <div style={{ textAlign: 'center' }}>
                    <h2>Welcome, {username}!</h2>
                    <p>Your onboarding is complete.</p>
                    {avatarUrl && <img src={avatarUrl} alt="Avatar" style={{ width: 80, height: 80, borderRadius: '50%', margin: '1rem auto' }} />}
                </div>
            ) : (
                <>
                      {step === 1 && <TransactionPinStep onNext={handlePinNext} />}
                    {step === 2 && <AvatarStep onNext={handleAvatarNext} />}
                    {step === 3 && <UsernameStep onNext={handleUsernameNext} />}
                    {submitting && <div style={{ marginTop: 24 }}>Submitting your info...</div>}
                </>
            )}
        </div>
    );
};

export default Onboarding;