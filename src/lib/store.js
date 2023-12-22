import { writable } from 'svelte/store';

export const user = writable({
	id: 0,
	username: 'GreatUser',
	password: '12345678',
	email: 'greatuser@gmail.com',
	first_name: 'Great',
	last_name: 'User',
	date_of_birth: Date.now(),
	created_at: Date.now(),
	updated_at: null,
	memories: []
});

export const memory = {
	id: 0,
	location: 'London',
	time: Date.now(),
	description: 'This trip to london was real fun and i enjoyed it a lot',
	title: 'Trip To London',
	created_at: Date.now(),
	updated_at: null,
	images: [],
	videos: [],
	user: user
};

export const image = {
	id: 0,
	url: '/london-pic.jpg',
	description: 'A pic i took in london',
	memory: null,
	memoryId: 0,
	created_at: Date.now(),
	updated_at: null
};

export const video = {
	id: 0,
	url: '/london-video.mp4',
	description: 'A video i took in london',
	memory: null,
	memoryId: 0,
	created_at: Date.now,
	updated_at: null
};
