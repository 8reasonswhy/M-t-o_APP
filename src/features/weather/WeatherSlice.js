import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    clouds: undefined,
    main: {
        feels_like: undefined
    },
    name: undefined,
    sys: {
        country: undefined
    },
    weather: undefined,
    wind: {
        speed: undefined
    },
    isLoaded: false,
}

export const WeatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        set: (state, action) => {
            const {clouds, main, name, sys, weather, wind} = action.payload
            state.clouds = clouds
            state.main = main
            state.name = name
            state.sys = sys
            state.weather = weather[0]
            state.wind = wind
            state.isLoaded = true
        },
        reset: (state) => {
            state.isLoaded = false
        }
    }
})
export const {set, reset} = WeatherSlice.actions
export default WeatherSlice.reducer