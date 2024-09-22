import { ID, IndexType, Permission } from "node-appwrite";

import { db, commentCollection } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
  // create collections
  const collection = await databases.createCollection(
    db,
    ID.unique(),
    commentCollection,
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
    databases.createEnumAttribute(
      db,
      collection.$id,
      "type",
      ["answer", "question"],
      true
    ),
    databases.createStringAttribute(db, collection.$id, "typeId", 50, true),
    databases.createStringAttribute(db, collection.$id, "authorId", 50, true),
  ]);

  console.log("Comment Attributes added successfully");
}
