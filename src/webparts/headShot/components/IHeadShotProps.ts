export interface IHeadShotProps {
  listName: string;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  backgrounds: Array<{link: string; caption: string; title: string, default: boolean}>;
}
