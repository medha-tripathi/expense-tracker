import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";

const typeDefs = [userTypeDef, transactionTypeDef];
const mergedTypeDefs = mergeTypeDefs(typeDefs);

export default mergedTypeDefs;