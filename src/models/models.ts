export interface DeviceDimensions {
    height: number,
    width: number,
}

export interface GeneralState {
    deviceDimensions: {
      width: number;
      height: number;
    };
    menuOpen: boolean;
  }