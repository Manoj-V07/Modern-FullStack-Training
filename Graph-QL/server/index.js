import cors from "cors"
import { expressMiddleware } from "@as-integrations/express5"
import { ApolloServer } from "@apollo/server"
import express from "express"

const PORT = 4000

async function startServer() {
    
    const app = express()
    app.use(express.json())

    const server = new ApolloServer({
        typeDefs: `
        type User {
            id: ID!
            firstName: String!
            lastName: String!
        }
        type Todo {
            id: ID!
            todo: String!
            completed: Boolean!
            user: User
        }
        type Query {
            getTodos: [Todo]
        }
        `,
        resolvers: {
            Query: {
                getTodos: async () => {
                    const response = await fetch("https://dummyjson.com/todos")
                    const data = await response.json()
                    return data.todos
                }
            },
            Todo: {
                user: async (parent) => {
                    const response = await fetch(`https://dummyjson.com/users/${parent.userId}`)
                    const data = await response.json()
                    return data
                }
            }
        }
    })

    await server.start()

    app.use(cors())
    app.use('/graphql', expressMiddleware(server))

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/graphql`)
    })
}

startServer();