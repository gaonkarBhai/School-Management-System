const advancedResult = (model,populate)=>{
    return async (req,res,next)=>{
        const { limit, page, name } = req.query;
        const skip = (Number(page || 1) - 1) * Number(limit || 2);
        let teachersQuery = model.find();
        if(populate){
            teachersQuery = teachersQuery.populate(populate)
        }
        if (name) {
          teachersQuery.find({
            name: { $regex: req.query?.name, $options: "i" },
          });
        }
        const teachers = await teachersQuery.skip(skip).limit(limit);
        res.result = {
          status: "success",
          message: "All Data fetched successfully",
          data: teachers,
        };
        next()
    }
}
module.exports=(advancedResult)