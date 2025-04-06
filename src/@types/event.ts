interface EventData {
    title: string;
    description: string;
    location: string;
    eventDate: string;
    eventTime: string;
    creator_id: string;
    participant: boolean;
    minParticipants?: number;
    maxParticipants?: number;
    eventId?: string;
    participantsList: ParticipantsData[]
}

interface ParticipantsData {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthDate: string;
    confirmed: boolean;
}

export { EventData, ParticipantsData };
