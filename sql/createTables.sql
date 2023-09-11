DROP TABLE IF EXISTS basic_saved_workouts;

CREATE TABLE  basic_saved_workouts (
    workout_id          serial PRIMARY KEY,
    title       varchar(20), 
    workout_data  text NOT NULL
);