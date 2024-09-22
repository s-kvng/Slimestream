import { db } from "../name";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createVoteCollection from "./vote.collection";
import createCommentCollection from "./comment.collection";
import { databases } from "./config";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log(`Database ${db} connected.`);
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log(`Database ${db} created.`);

      // create all collections
      Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createVoteCollection(),
        createCommentCollection(),
      ]);
      console.log(`All collections created`);
      console.log("Database connected");
    } catch (error) {
      console.error("Error connecting to the database", error);
    }
  }

  return databases;
}
