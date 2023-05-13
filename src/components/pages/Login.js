import React from 'react';
import { SocialIcon, Button } from '@rneui/themed'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { View } from 'react-native';
import Bottom from './Bottom';
import HeaderSignedIn from '../header/HeaderSignedIn';
import HeaderSignedOut from '../header/HeaderSignedOut';
import { Provider } from 'react-native-paper';

GoogleSignin.configure({
  webClientId: '804973163973-o2fkl9cojfilghpjumfqb0k4bi99tgfp.apps.googleusercontent.com',
  prompt: 'select_account',
});

const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // processar o login bem-sucedido
  } catch (error) {
    // lidar com o erro de login
  }
};

export default function Login() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Provider>
        <HeaderSignedOut />
        <View style={{ alignItems: 'center', paddingVertical: '50%' }}>
          <SocialIcon
            title={'Entrar com Google'}
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
            type='google'
            button={true}
            style={{ width: 200 }}
          />
          <SocialIcon
            title={'Entrar com Facebook'}
            type='facebook'
            button={true}
            style={{ width: 200 }}
          />
        </View>
      </Provider>
    );
  }

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      console.log("Credential: " + googleCredential)

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);

    } catch (error) {
      throw (error);
    }
    // Check if your device supports Google Play

  }

  return (
    <Provider>
      <HeaderSignedIn/>
      <Bottom />
    </Provider>
  );
}