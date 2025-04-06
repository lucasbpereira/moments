import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { globalStyles } from '@/src/styles';
import { useRouter } from 'expo-router';
import { EventData } from '@/src/@types/event';

interface Event {
  title: string;
  description: string;
  location: string;
  eventDate: string;
  eventTime: string;
  minParticipants: number;
  maxParticipants: number;
  eventId: string;
}

interface EventCardProps {
  event: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const router = useRouter();
  
  // Formata a data para exibição (ex: 31/03/2025)
  const formattedDate = new Date(event.eventDate).toLocaleDateString('pt-BR');
  
  // Formata a hora para exibição (ex: 15:00)
  const formattedTime = event.eventTime.substring(0, 5);

  // Formata informações de participantes
  const participantsInfo = event.maxParticipants > 0 
    ? `${event.minParticipants}-${event.maxParticipants} participantes`
    : 'Sem limite de participantes';

  const handlePress = () => {
    router.push(`/events/${event.eventId}`);
  };

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTime}>{formattedDate}</Text>
          <Text style={styles.dateTime}>{formattedTime}</Text>
        </View>
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {event.description}
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.participants}>{participantsInfo}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  participants: {
    fontSize: 14,
    color: '#555',
  },
});

export default EventCard;