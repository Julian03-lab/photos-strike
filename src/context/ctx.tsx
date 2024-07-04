import React, { useEffect, useState } from "react";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  type User,
} from "firebase/auth";
import { auth, db } from "root/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { IUser } from "@/utils/types";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: IUser | null;
  loading: boolean;
  setSession: (user: IUser) => void;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  loading: false,
  setSession: () => null,
});

export function useSession() {
  const value = React.useContext(AuthContext);

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        // console.log("Hay usuario, es: ", user);
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
        // console.log("Hay usuario en firebase: ", user);
        const id = user.uid;
        const userDoc = await getDoc(doc(db, "users", id));

        if (!userDoc.exists()) {
          setSession(null);
          return;
        }

        const finalUser = { ...userDoc.data(), uid: id } as IUser;
        // console.log("Usuario en firebase: ", finalUser);
        setSession(finalUser);
        await AsyncStorage.setItem("@user", JSON.stringify(finalUser));

        console.log(finalUser);

        if (finalUser.birthday) {
          router.replace("/(main)/home");
        } else {
          router.replace("/(auth)/data-extra");
        }
      } else {
        setSession(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, googleCredential);
      const user = result.user;

      const info = getAdditionalUserInfo(result);

      if (info?.isNewUser) {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      setLoading(false);
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
        setSession,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
