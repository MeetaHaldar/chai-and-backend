const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// const asyncHandler = () => {};
// const asyncHandler = (fumc) => () => {};
// const asyncHandler = (func) => async () => {};

// const asyncHandler = (fn)=> async (removeEventListener,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }catch (error){
//         res.status(err.code || 500).json({
//             sucess: falses,
//             message: err.message
//         })
//     }
// }
