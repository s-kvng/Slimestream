import { ID, IndexType, Permission } from "node-appwrite";

import { db, answerCollection } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
  // create collections
  const collection = await databases.createCollection(
    db,
    ID.unique(),
    answerCollection,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );

  console.log("Question collection created successfully");
  console.log(collection);

  //   Add attribute
  await Promise.all([
    databases.createStringAttribute(db, collection.$id, "content", 10000, true),
    databases.createStringAttribute(db, collection.$id, "questionId", 50, true),
    databases.createStringAttribute(db, collection.$id, "authorId", 50, true),
  ]);

  console.log("Answers Attributes added successfully");
}
