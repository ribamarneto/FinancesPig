import React from 'react';
import { Button, Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { View } from 'react-native';
import Home from './Home';

GoogleSignin.configure({
  webClientId: '804973163973-o2fkl9cojfilghpjumfqb0k4bi99tgfp.apps.googleusercontent.com',
});

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
      <View>
          <Button
            title="Google Sign-In"
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
          />
      </View>
      
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
      <Home/>
  );
}