import {createClient} from 'redis'

export const  client = createClient()

export const redisServer = () =>{
    client.connect().then(()=>{
        console.log('Redis Connected')
    } ).catch((err) =>{
        console.error(err)
    })
}

export default client 