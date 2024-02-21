
const {MongoClient} = require("mongodb")

function createUserdb(client,user){
    const username = user.username
    const UsersDB = client.db("users")
    UsersDB.createCollection(username)

}
async function checkIfUserExist(client,user){
    
    const username = user.username
    const UsersDB = client.db("users")
    const collectionsCursor = UsersDB.listCollections()

    const  collections = await collectionsCursor.toArray()

    for (let i = 0; i < collections.length; i++){
        const currentCollection = collections[i]
        if(currentCollection.name === username){
            console.log(currentCollection.name, username)
            return true
           

        }
    }
    return false

}

module.exports = {createUserdb,checkIfUserExist}