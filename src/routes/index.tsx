import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";
// import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
// import { Loading } from "@components/Loading";
import { Box, Spinner } from '@gluestack-ui/react';


export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  // if (isLoadingUserStorageData) {
  //   return <Spinner />;
  // }
  return (
    <Box flex={1} backgroundColor="">
      <NavigationContainer >
      <AuthRoutes />
        {/* {user.id ? <AppRoutes /> : <AuthRoutes />} */}
      </NavigationContainer>
    </Box>
  );
}
