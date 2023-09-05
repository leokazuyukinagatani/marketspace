// import { Platform } from "react-native";
// import {
//   BottomTabNavigationProp,
//   createBottomTabNavigator,
// } from "@react-navigation/bottom-tabs";



// // import { Home } from "@screens/Home";
// // import { Profile } from "@screens/Profile";
// // import { History } from "@screens/History";
// // import { Exercise } from "@screens/Exercise";

// // import { styled } from "@gluestack-ui/react";

// type AppRoutes = {
//   home: undefined;
//   exercise: { exerciseId: string };
//   profile: undefined;
//   history: undefined;
// };

// export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

// const Tab = createBottomTabNavigator<AppRoutes>();

// export function AppRoutes() {
//   const { sizes, colors } = useTheme();
//   // const iconSize = sizes[6];
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarActiveTintColor: colors.green[500],
//         tabBarInactiveTintColor: colors.gray[200],
//         tabBarStyle: {
//           backgroundColor: colors.gray[600],
//           borderTopWidth: 0,
//           height: Platform.OS === "android" ? "auto" : 96,
//           paddingBottom: sizes[10],
//           paddingTop: sizes[6],
//         },
//       }}
//     >
//       <Tab.Screen
//         name="home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color }) => (
//             // <HomeSvg fill={color} width={iconSize} height={iconSize} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="history"
//         component={History}
//         options={{
//           tabBarIcon: ({ color }) => (
//             // <HistorySvg fill={color} width={iconSize} height={iconSize} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ color }) => (
//             // <ProfileSvg fill={color} width={iconSize} height={iconSize} />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="exercise"
//         component={Exercise}
//         options={{
//           tabBarButton: () => null,
//         }}
//       />
//     </Tab.Navigator>
//   );
// }