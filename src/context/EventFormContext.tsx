import { createContext, ReactNode, useState } from "react";

export type EventProps = {
    title?: string;
    description?: string;
    location?: string;
    eventDate?: string;
    eventTime?: string;
    minParticipants?: number;
    maxParticipants?: number;
}

type EventFormContextDataProps = {
    eventFormData: EventProps;
    updateFormData: (value: EventProps) => void;
}

type EventFormContextProviderProps = {
    children: ReactNode;
}

const EventFormContext = createContext<EventFormContextDataProps>({} as EventFormContextDataProps);

function EventProvider({ children }: EventFormContextProviderProps) {
    const [eventFormData, setEventFormData] = useState<EventProps>({} as EventProps);

    function updateFormData(data: EventProps) {
        setEventFormData((prevState) => ({...prevState, ...data}))
    }

    return (
        <EventFormContext.Provider value={{
            eventFormData,
            updateFormData
        }}>
            {children}
        </EventFormContext.Provider>
    );
}

export { EventProvider, EventFormContext }