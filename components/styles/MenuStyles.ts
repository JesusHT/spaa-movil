import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    modalContent: {
      position: 'absolute',
      top: 40,
      right: 10,
      width: 200,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 10,
      elevation: 5,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 }
        },
        web: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)"
        }
      })
    },
    modalText: {
      fontSize: 16,
      paddingVertical: 5,
      borderBottomWidth:1,
      borderColor: '#cfcfcf'
    },
    modalTextLogout: {
        marginTop: 10,
        marginBottom: 0,
        color: '#ff0000',
        fontSize: 16,
        paddingVertical: 5,
    }
});

export default styles;