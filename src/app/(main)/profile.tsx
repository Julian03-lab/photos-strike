import { View, Text, Button, Image } from "react-native";
import { useSession } from "../../context/ctx";
const Profile = () => {
  const { session, signOut } = useSession();

  if (!session) {
    return (
      <View>
        <Text>Not logged in</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Profile:</Text>
      <Image
        style={{ width: 64, height: 64, borderRadius: 75 }}
        source={{
          uri: session.photoURL || "https://via.placeholder.com/150",
        }}
      />
      <Text>Nombre: {session.displayName}</Text>
      <Text>{session.email}</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};
export default Profile;
