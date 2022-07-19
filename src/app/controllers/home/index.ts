import { Request, Response } from "express";

function HomeController(req: Request, res: Response) {
    res.json({ 
        msg: "hello world", 
        req: req.body, 
        params: req.params
    })
}

export default HomeController