class API{
    constructor(query, req){
        this.query = query,
        this.req = req
        // this.res = res
    }

    create(){
        
        this.query =this.req.body.length > 1 ? this.query.insertMany(this.req.body) :
                    this.query.create(this.req.body)
        return this
    }
    
}

export {API}