import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from './api.js';
/**
 * {
  user: {
    id: 'u1',
    name: 'Neha',
    meteres: [
      {
        id: 'm1',
        name: 'Main Meter',
        readings: [
          { id: 'r1', value: 120, timestamp: '2026-04-09T09:00:00Z' },
          { id: 'r2', value: 125, timestamp: '2026-04-09T10:00:00Z' }
        ]
      }
    ]
  },
  loading: false,
  error: null
}

 */

// getting user by sinup ,required username and password
export const fetchByNameAndPassword = createAsyncThunk(
  'user/fetchByNameAndPassword',
  async ({ userName, userPassword }, thunkAPI) => {
    try {
      const response = await userApi.auth.getUser(userName, userPassword);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

//creating user
const createUser = createAsyncThunk(
  'user/createUser',
  async ({ username, userPassword }, thunkAPI) => {
    try {
      const responce = await userApi.create.addUser(username, userPassword);
      return responce.data;
    }
    catch (err) {
      return thunkAPI.rejectWithValue(err.responce.data);

    }
  }
)

//getting meter user have by user id
const getById = createAsyncThunk("meters/getById",
  async (id, thunkAPI) => {
    try {
      const responce = await userApi.getById.userMeter(id);
      return responce.data;

    }
    catch (err) {
      return thunkAPI.rejectWithValue(err.responce.data);

    }

  });

//adding reading to  meter by id
export const addReading = createAsyncThunk(
  'meters/addReading',
  async ({ id, date, time, kwh, pf }, { rejectWithValue }) => {
    try {
      const response = await userApi.create.addReading({ id, date, time, kwh, pf });
      return response.data; // backend should return the new reading or updated meter
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
//creating meter for selected user by userId
//MeterDTO(String meterName,String meterNumber,String meterMacAddress) 
// creating meter for selected user by userId
export const createMeter = createAsyncThunk(
  'meter/createMeter',
  async ({ userId, meter }, { rejectWithValue }) => {
    try {

      const response = await userApi.create.addMeter(userId, meter);
      return response.data;
    } catch (err) {

      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getting user by userName and password
      .addCase(fetchByNameAndPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByNameAndPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchByNameAndPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // creating a new user entity
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getting meter
      .addCase(getById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        // keep existing user id and name
        state.user = {
          ...state.user,
          metres: action.payload.metres.map(m => ({
            id: m.id,
            name: m.name,
            readings: m.readings || [] // ensure readings array exists
          }))
        };
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReading.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReading.fulfilled, (state, action) => {
        state.loading = false;
        const { id, readings } = action.payload; // ReadingByIdDTO
        const meter = state.user?.metres.find(m => m.id === id);
        if (meter) {
          meter.readings = readings; // replace with updated list
        }
      })
      .addCase(addReading.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })
      
      .addCase(createMeter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMeter.fulfilled, (state, action) => {
        state.loading = false;
        
        // checking  state.user exists
        if (state.user) {
         // checking meters exists or not
          if (!state.user.meteres) {
            state.user.meteres = [];
          }
          
          state.user.metres.push(action.payload);
        }
      })
      .addCase(createMeter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

  },
});
export default  userSlice.reducer;
