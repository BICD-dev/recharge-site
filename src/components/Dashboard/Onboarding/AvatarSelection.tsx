import React, { useState } from 'react';

interface AvatarOption {
	id: number;
	src: string;
	alt: string;
}

const avatarOptions: AvatarOption[] = [
	{ id: 1, src: '/public/images/avatar1.png', alt: 'Avatar 1' },
	{ id: 2, src: '/public/images/avatar2.png', alt: 'Avatar 2' },
	{ id: 3, src: '/public/images/avatar3.png', alt: 'Avatar 3' },
	// Add more avatars as needed
];

const AvatarSelection: React.FC = () => {
	const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

	const handleAvatarClick = (id: number) => {
		setSelectedAvatar(id);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Submission logic to be implemented by user
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Select Your Avatar</h2>
			<div style={{ display: 'flex', gap: '1rem' }}>
				{avatarOptions.map((avatar) => (
					<img
						key={avatar.id}
						src={avatar.src}
						alt={avatar.alt}
						onClick={() => handleAvatarClick(avatar.id)}
						style={{
							border: selectedAvatar === avatar.id ? '2px solid #007bff' : '2px solid transparent',
							borderRadius: '50%',
							width: 64,
							height: 64,
							cursor: 'pointer',
							objectFit: 'cover',
						}}
					/>
				))}
			</div>
			<button type="submit" style={{ marginTop: '1rem' }} disabled={selectedAvatar === null}>
				Continue
			</button>
		</form>
	);
};

export default AvatarSelection;
