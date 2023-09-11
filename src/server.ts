import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Client } from "pg";
import { getEnvVarOrFail } from "./support/envVarUtils";
import { setupDBClientConfig } from "./support/setupDBClientConfig";

dotenv.config(); //Read .env file lines as though they were env vars.

const dbClientConfig = setupDBClientConfig();
const client = new Client(dbClientConfig);

//Configure express routes
const app = express();

app.use(express.json()); //add JSON body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

//get save delete basic saved workouts
app.get("/", async (_req, res) => {
    try {
        const savedWorkouts = await client.query(
            "select workout_id, title, workout_data FROM basic_saved_workouts"
        );
        res.status(200).json(savedWorkouts.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred. Check server logs.");
    }
});

app.post("/", async (req, res) => {
    try {
        const insertNewWorkout = await client.query(
            "INSERT INTO basic_saved_workouts (title, workout_data) VALUES ($1, $2) RETURNING *",
            [req.body.title, req.body.workout_data]
        );
        res.status(201).json(insertNewWorkout.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred. Check server logs.");
    }
});

app.delete("/:id", async (req, res) => {
    try {
        const deleteThisWorkout = await client.query(
            "DELETE FROM basic_saved_workouts WHERE workout_id = $1 RETURNING *",
            [req.params.id]
        );
        res.status(200).json(deleteThisWorkout.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred. Check server logs.");
    }
});

//get data from more complex backend
app.get("/savedworkouts/metadata", async (_req, res) => {
    try {
        const savedWorkoutsMetaData = await client.query(
            "SELECT * FROM saved_workout_metadata"
        );
        res.status(200).json(savedWorkoutsMetaData.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred. Check server logs.");
    }
});

app.get("/savedworkouts/exercises", async (_req, res) => {
    try {
        const savedWorkoutsExercises = await client.query(
            "SELECT saved.workout_id, saved.exercise_id, e.exercise_name FROM saved_workout_exercises AS saved JOIN exercises AS e ON saved.exercise_id = e.exercise_id"
        );
        res.status(200).json(savedWorkoutsExercises.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred. Check server logs.");
    }
});

connectToDBAndStartListening();

async function connectToDBAndStartListening() {
    console.log("Attempting to connect to db");
    await client.connect();
    console.log("Connected to db!");

    const port = getEnvVarOrFail("PORT");
    app.listen(port, () => {
        console.log(
            `Server started listening for HTTP requests on port ${port}.  Let's go!`
        );
    });
}
