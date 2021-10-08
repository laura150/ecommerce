import mongoose from 'mongoose';
const connection ={}//will be used to determine if we are connected to the database or not

async function connect (){ // this function will be used to connect to database
    if(connection.IsConnected){
        console.log('already connected')
        return
    } //if not connected we need to check connections array. it is an array of all previous connections to the database
    if(mongoose.connections.length > 0){
       //if its greater than 0 there is no need to connect, what to do is to assign connection.isconnected to the status of current connection and
       connection.IsConnected = mongoose.connections[0].readyState
    if(connection.IsConnected === 1){
        console.log('previouse connection')
        return
        } // if connection.IsConnected is not equal to one the you need to call disconnect() cus the state is not ready
    await mongoose.disconnect() 
    }

    //after checking for previous connection, at this point we are not connected atall so we need to connect for the first time, hence we will call the mongodb so we need to call mongoose function here
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true, //when i left it i got an error, not supported.
    })
    console.log('new connection')
   connection.IsConnected = db.connections[0].readyState
}

async function disconnect(){
    if(connection.IsConnected){
        if(process.env.NODE_ENV === 'production'){
            await mongoose.disconnect()
            connection.IsConnected = false
        }
        else{
            console.log('not disconnected')
        }
    }
    //reason for checking for production is to prevent connecting and disconnecting in developement mose because this can occupy processor and memory and it wont be possibel to develop
    //but in production mode, for each access to the database we make a connection and then disconnect afterwards to release the resources on the server
}


 function convertDocToObj(doc){
    doc._id = doc._id.toString();//all datatypes inside doc should be either a string, number or booleans all other dataypes will cause an error
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    return doc
 }
const db = {connect, disconnect, convertDocToObj}
export default db