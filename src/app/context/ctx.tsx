import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  type User,
} from "firebase/auth";
import { auth } from "root/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: User | null;
  loading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  loading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        setSession(JSON.parse(user));
      }
      setLoading(false);
    };

    checkUser();

    GoogleSignin.configure({
      // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId:
        "231047231945-abo7frualdouof3f5nunnpablvs9v29l.apps.googleusercontent.com",
    });

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setSession(user);
        await AsyncStorage.setItem("@user", JSON.stringify(user));
      } else {
        setSession(null);
      }
    });

    return () => unsub();
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
      router.replace("/(main)");
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem("@user");
      await auth.signOut();
      setSession(null);
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
