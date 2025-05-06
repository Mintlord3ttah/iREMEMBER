class API{
    constructor(model, req){
        this.model = model,
        this.req = req
        // this.res = res
    }

    create(){
        this.model.create(this.req.body)
        // try{
        //         const user = await this.model.create(this.req.body)
        //         this.res.status(201).json({
        //             status: "success",
        //             data: {user}
        //         })
        //     }catch(err){
        //         this.res.status(400).json({
        //             status: "fail",
        //             message: err.message
        //         })
        //     }
        return this
    }
    
}

export {API}