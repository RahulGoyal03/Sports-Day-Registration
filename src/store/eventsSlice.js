import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllEvents = createAsyncThunk(
  "events/fetchAllEvents",
  async () => {
    const response = await fetch(
      "https://run.mocky.io/v3/d00d1301-a433-49e2-b971-ca50ee47208b"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    return response.json();
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    allEvents: [],
    selectedEvents: JSON.parse(localStorage.getItem("selectedEvents")) || [],
    status: "idle",
    error: null,
  },
  reducers: {
    addSelectedEvent: (state, action) => {
      if (
        state.selectedEvents.length < 3 &&
        !state.selectedEvents.some((event) => event.id === action.payload.id)
      ) {
        state.selectedEvents.push(action.payload);
        localStorage.setItem(
          "selectedEvents",
          JSON.stringify(state.selectedEvents)
        );
      }
    },
    removeSelectedEvent: (state, action) => {
      state.selectedEvents = state.selectedEvents.filter(
        (event) => event.id !== action.payload
      );
      localStorage.setItem(
        "selectedEvents",
        JSON.stringify(state.selectedEvents)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allEvents = action.payload;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addSelectedEvent, removeSelectedEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
