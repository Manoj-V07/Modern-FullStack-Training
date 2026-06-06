import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

const PORT = 5000;
const app = express();

// In-memory data store (changed to let so mutations can modify it)
let users = [
    { id: "1", name: "Manoj V", email: "manoj@gmail.com", phone: "8925189521" },
    { id: "2", name: "Krishnavarun K", email: "varun@gmail.com", phone: "9894458756" },
    { id: "3", name: "Kavinprakash T", email: "kavin@gmail.com", phone: "7843257894" }
];

async function startServer() {
    const server = new ApolloServer({
        typeDefs: `
            type User {
                id: ID!
                name: String!
                email: String!
                phone: String!
            }
                
            type Query {
                getUsers: [User]!
            }
                
            type Mutation {
                createUser(name: String!, email: String!, phone: String!): User!
                deleteUser(id: ID!): User
                updateUser(id: ID!, name: String, email: String, phone: String): User
            }
        `,
        resolvers: {
            Query: {
                getUsers: () => users
            },
            Mutation: {
                createUser: (parent, { name, email, phone }) => {
                    const newUser = {
                        id: String(users.length + 1), 
                        name,
                        email,
                        phone
                    };
                    users.push(newUser);
                    return newUser;
                },
                deleteUser: (_, { id }) => {
                    const userIndex = users.findIndex(user => user.id === id);
                    if (userIndex === -1) return null;
                    
                    const [deletedUser] = users.splice(userIndex, 1);
                    return deletedUser;
                },
                updateUser: (_, { id, name, email, phone }) => {
                    const user = users.find(user => user.id === id);
                    if (!user) return null;

                    // Update fields dynamically if they are provided
                    if (name !== undefined) user.name = name;
                    if (email !== undefined) user.email = email;
                    if (phone !== undefined) user.phone = phone;

                    return user;
                }
            }
        }
    });

    // Essential startup cycle for Apollo
    await server.start();

    // Middleware stack
    app.use(cors());
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server));

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
}

startServer();
