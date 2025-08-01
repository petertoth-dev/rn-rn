export type RootNavigationStackParamList = {
  'App.HomeScreen': undefined;
  'App.TypographyScreen': undefined;
  'App.GridSystemScreen': undefined;
  'App.ComponentsScreen': undefined;
  'App.LoginScreen': { email: string } | undefined;
};

// https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootNavigationStackParamList {}
    }
}
