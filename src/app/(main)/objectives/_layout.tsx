import { Stack } from "expo-router";

const ObjectivesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Objetivos",
        }}
      />
      <Stack.Screen
        name="new-objective"
        options={{
          title: "Nuevo Objetivo",
        }}
      />
    </Stack>
  );
};
export default ObjectivesLayout;
