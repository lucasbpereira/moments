import { StyleSheet } from "react-native";
import {colors} from '@/constants/Colors';
const styles = StyleSheet.create({
    // ... (mantenha os estilos existentes)
    
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    participantsInfo: {
      marginBottom: 15,
    },
    participantsList: {
      gap: 12,
    },
    noParticipants: {
      color: '#666',
      fontStyle: 'italic',
      textAlign: 'center',
      marginVertical: 10,
    },
    participantContainer: {
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: '#eee',
    },
    participantHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    participantName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    participantDetails: {
      gap: 4,
    },
    participantDetail: {
      fontSize: 14,
      color: '#555',
    },
    confirmationStatus: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    confirmed: {
      backgroundColor: '#e6f7e6',
      borderColor: '#2ecc71',
      borderWidth: 1,
    },
    notConfirmed: {
      backgroundColor: '#fff3e6',
      borderColor: '#e67e22',
      borderWidth: 1,
    },
    confirmationText: {
      fontSize: 12,
      fontWeight: '500',
    },
  });

  export default styles;