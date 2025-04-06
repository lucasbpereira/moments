import { useContext } from "react";
import { EventFormContext } from "../context/EventFormContext";



export function useEventForm() {
    const context = useContext(EventFormContext);

    return context;
}