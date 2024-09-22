import { ID, IndexType, Permission } from "node-appwrite";

import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
  // create collections
  const collection = await databases.createCollection(
    db,
    ID.unique(),
    voteCollection,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );

  console.log("Vote collection created successfully");
  console.log(collection);

  //   Add attribute
  await Promise.all([
    databases.createEnumAttribute(
      db,
      collection.$id,
      "type",
      ["question", "answer"],
      true
    ),
    databases.createStringAttribute(db, collection.$id, "typeId", 50, true),
    databases.createEnumAttribute(
      db,
      collection.$id,
      "voteStatus",
      ["upvoted", "downvoted"],
      true
    ),
    databases.createStringAttribute(db, collection.$id, "votedById", 50, true),
  ]);

  console.log("Vote Attributes added successfully");
}
