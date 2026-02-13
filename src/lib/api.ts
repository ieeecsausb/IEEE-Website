import galleryData from '@/data/gallery.json';
import eventsData from '@/data/events.json';
import membersData from '@/data/members.json';

// --- Types ---

export interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    category: string;
}

// ... existing types ...

// --- API Functions (Mock) ---

// ... existing functions ...

export async function getGalleryImages(): Promise<GalleryImage[]> {
    return galleryData as GalleryImage[];
}

// --- Types ---

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
    description: string;
    imageGradient: string;
    registrationLink: string;
    featured: boolean;
}

export interface Member {
    id: string;
    name: string;
    role: string;
    bio: string;
    socials: {
        linkedin?: string;
        github?: string;
        instagram?: string;
        email?: string;
    };
}

// --- API Functions (Mock) ---

export async function getEvents(): Promise<Event[]> {
    // Simulate network delay
    // await new Promise(resolve => setTimeout(resolve, 500));
    return eventsData as Event[];
}

export async function getUpcomingEvents(): Promise<Event[]> {
    const events = await getEvents();
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export async function getPastEvents(): Promise<Event[]> {
    const events = await getEvents();
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date < today).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getEventById(id: string): Promise<Event | undefined> {
    const events = await getEvents();
    return events.find(event => event.id === id);
}

export async function getMembers(): Promise<Member[]> {
    // Simulate network delay
    return membersData as Member[];
}
