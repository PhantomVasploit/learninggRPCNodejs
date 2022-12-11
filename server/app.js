const grpc = require('grpc')

const sums = require('./protos/sum_pb')
const service = require('./protos/sum_grpc_pb')

function summation(call, callback){
    let summations = new sums.SumResponse()
    let result = call.request.getSum().getX() + call.request.getSum().getY()
    summations.setZ(result)
    callback(null, summations)
}

function main(){
    const server = new grpc.Server()
    server.addService(service.SumServiceService, {summation: summation})
    server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
    server.start()
    console.log('Server initiated on: 127.0.0.1:50051')
}

main()