class API{
    constructor(query, req){
        this.query = query,
        this.req = req
        // this.res = res
    }

    create(){
        
        this.query =this.req.body.length > 1 ? this.query.insertMany(this.req.body) :
                    this.query.create(this.req.body)
        // try{
        //         const user = await this.query.create(this.req.body)
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