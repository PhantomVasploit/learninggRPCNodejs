const grpc = require('grpc')

const sums = require('../server/protos/sum_pb')
const service = require('../server/protos/sum_grpc_pb')

function main(){
    const client = new service.SumServiceClient(
        '127.0.0.1:50051',
        grpc.credentials.createInsecure()
    )
    const request = new sums.SumRequest()
    const sum = new sums.Sum()
    sum.setX(6)
    sum.setY(7)

    request.setSum(sum)
    client.summation(request, (error, response)=>{
        if(!error){
            console.log(`Sum response: ${response.getZ()}`)
        }else{
            console.error(error)
        }
    })
}

main()