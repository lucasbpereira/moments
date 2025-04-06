import { Text, View } from "react-native";
import styles from './styles';
import { ParticipantsData } from "@/src/@types/event";

const ParticipantItem = ({ participant }: { participant: ParticipantsData }) => {
    // Formata a data de nascimento
    const formattedBirthDate = new Date(participant.birthDate).toLocaleDateString('pt-BR');
    
    return (
      <View style={styles.participantContainer}>
        <View style={styles.participantHeader}>
          <Text style={styles.participantName}>
            {participant.firstName} {participant.lastName}
          </Text>
          <View style={[
            styles.confirmationStatus,
            participant.confirmed ? styles.confirmed : styles.notConfirmed
          ]}>
            <Text style={styles.confirmationText}>
              {participant.confirmed ? 'Confirmado' : 'Pendente'}
            </Text>
          </View>
        </View>
        
        <View style={styles.participantDetails}>
          <Text style={styles.participantDetail}>Email: {participant.email}</Text>
          <Text style={styles.participantDetail}>Telefone: {participant.phone}</Text>
          <Text style={styles.participantDetail}>Nascimento: {formattedBirthDate}</Text>
        </View>
      </View>
    );
  };

  export default ParticipantItem 