import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FirebaseCurrentUserType } from '../../common/types';

GoogleSignin.configure({
    webClientId: '1064310901179-31s1fp5ha4nesu037u4hoi1qm87lkv9p.apps.googleusercontent.com',
});

export const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}
export const firebaseCurrentUser: FirebaseCurrentUserType = auth().currentUser;