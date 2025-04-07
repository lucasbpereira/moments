import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      content: {
        padding: 20,
        paddingBottom: 80,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
      },
      detailRow: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
      },
      detailLabel: {
        fontWeight: 'bold',
        width: 100,
        color: '#555',
      },
      detailValue: {
        flex: 1,
        color: '#333',
      },
      descriptionContainer: {
        marginTop: 20,
        marginBottom: 30,
      },
      descriptionLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#555',
      },
      description: {
        color: '#333',
        lineHeight: 22,
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
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 8,
        borderColor: "#d9abab",
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    modeSwitchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        position: "absolute",
        top: 40,
        width: "100%",
    },
    modeButton: {
        marginHorizontal: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#ccc",
    },
    activeMode: { backgroundColor: "#d9abab" },
    modeText: { color: "#000" },
    videoContainer: { flex: 1, width: "100%", height: "100%" },
    buttonContainer: { position: "absolute", flexDirection: "row", gap: 14, bottom: 40, alignSelf: "center" },
    modalButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 4,
    },
    buttonText: { fontSize: 16, fontWeight: "bold" },
    buttonOutCamera: {
        position: "absolute",
        bottom: 50,
        left: 20,
        padding: 10,
        borderRadius: 5,
        transform: [
            { scaleX: -1 }
          ]
    },
    toggleCameraType: {
        width: 42,
        height: 42,
        position: "absolute",
        top: 40,
        left: 20
    },
    toggleFlash: {
        width: 42,
        height: 42,
        position: "absolute",
        top: 40,
        right:20
    }  
})