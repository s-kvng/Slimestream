import { ID, IndexType, Permission } from "node-appwrite";

import { db, questionCollection } from "../name";
import { databases } from "./config";

export default async function createQuestionCollection() {
  // create collections
  const collection = await databases.createCollection(
    db,
    ID.unique(),
    questionCollection,
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
    databases.createStringAttribute(db, collection.$id, "title", 100, true),
    databases.createStringAttribute(db, collection.$id, "content", 10000, true),
    databases.createStringAttribute(db, collection.$id, "authorId", 50, true),
    databases.createStringAttribute(
      db,
      collection.$id,
      "tags",
      50,
      false,
      undefined,
      true
    ),
    databases.createStringAttribute(
      db,
      collection.$id,
      "attachmentId",
      100,
      true
    ),
  ]);

  console.log("Attributes added successfully");

  //   create indexes
  await Promise.all([
    databases.createIndex(db, collection.$id, "title", IndexType.Fulltext, [
      "title",
    ]),
    databases.createIndex(db, collection.$id, "content", IndexType.Fulltext, [
      "content",
    ]),
  ]);

  console.log("Indexes created successfully");
}
