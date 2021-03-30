exports.requestHandler = (res, statusCode = 500, msg = "Success!",data={})=>{
    res.status(statusCode).json({msg,data});
}