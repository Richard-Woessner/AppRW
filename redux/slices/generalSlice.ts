import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DeviceDimensions } from '../../src/models/models'

export interface GeneralState {
    deviceDimensions: DeviceDimensions
}

const initialState: GeneralState = {
    deviceDimensions:{
        height: 0,
        width: 0,
    }
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setDeviceDimensions: (state, action: PayloadAction<DeviceDimensions>) => {
      state.deviceDimensions = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDeviceDimensions } = generalSlice.actions

export default generalSlice.reducer