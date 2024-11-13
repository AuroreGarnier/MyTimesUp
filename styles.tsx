import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    // container: { // ne centre pas tout au centre de l'écran
    //     flex: 1,
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     backgroundColor: '#f0f8ff', 
    //     paddingHorizontal: 20,
    //     paddingTop: 30,
    // },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff', 
        padding: 20,
        position: 'relative', 
      },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 5,
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    roundTitle: {
        fontSize: 32, 
        fontWeight: 'bold', 
        color: '#4CAF50', 
        margin: 40 
      },
    roundText: {
        fontSize: 18,
        color: '#333', 
        textAlign: 'center',
        marginVertical: 20, 
        lineHeight: 24,
        marginBottom: 40,
    },
});
