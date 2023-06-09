import { configureStore } from "@reduxjs/toolkit"

import activity_log_reducer from "./activity_log"
import config_reducer from "./config"
import people_reducer from "./people"
import view_reducer from "./view"


export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware(
    {
        serializableCheck: false,
    }),
    reducer: {
        activity_log: activity_log_reducer,
        config: config_reducer,
        people: people_reducer,
        view: view_reducer,
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
