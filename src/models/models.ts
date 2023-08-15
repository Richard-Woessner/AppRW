export interface DeviceDimensions {
  height: number;
  width: number;
}

export interface GeneralState {
  page: string;
  deviceDimensions: {
    width: number;
    height: number;
  };
  menuOpen: boolean;
  getData: () => Promise<void> | undefined;
  user?: User;
  isKeyboardOpen: boolean;
}

export interface User {
  accessToken: string;
  email: string;
  displayName: string | null;
}

export interface Post {
  postId?: string;
  user: string;
  title: string;
  body: string;
  rating: number;
  game: string;
  date: Date | undefined;
  sortDate?: number;
}
