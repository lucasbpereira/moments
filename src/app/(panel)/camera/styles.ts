import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1 },
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
    mediaContainer: { flex: 1, width: "100%", height: "100%" },
    buttonContainer: { position: "absolute", flexDirection: "row", gap: 14, bottom: 40, alignSelf: "center" },
    modalButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 4,
    },
    modalButtonText: { fontSize: 16, fontWeight: "bold" },
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
    },
    eventSelectionContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      eventSelectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      eventItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      eventName: {
        fontSize: 16,
      },
      noEventsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
      },
      cancelButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f44336',
        borderRadius: 5,
        alignItems: 'center',
      },
      cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
})