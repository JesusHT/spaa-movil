// components/styles/LoginStyles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6F2',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginBox: {
    width: '100%',
    height: 460,
    backgroundColor: '#017C50',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center', 
    zIndex: 1,
    paddingTop: 85,
  },
  logo: {
    width: 120,
    height: 120,
    position: 'absolute', 
    top: -60,
    zIndex: 2,
  },
  loginTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30, 
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#017C50',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    color: '#ede3d7',
    borderWidth: 1,
    borderColor: '#FFF',
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#017C50',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    width: '100%',
  },
  inputPassword: {
    flex: 1,
    padding: 10,
    color: '#ede3d7',
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPasswordText: {
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#0C4631',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,

    elevation: 5,
    width: '100%', 
  },

  
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  helpText: {
    color: '#FFF',
    textAlign: 'center',
  },
  helpLink: {
    textDecorationLine: 'underline',
  },
  errorText: {
    backgroundColor: '#ff0000',
    color: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%'
  }
});

export default styles;