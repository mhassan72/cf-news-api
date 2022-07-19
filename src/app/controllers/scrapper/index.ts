import { Request, Response } from "express";
// import addArticle from "./addArticle";
import Sites  from "./sites";

function ScrapperController(req: Request, res: Response) {
    // addArticle({ title: "external Function Called"})
    Sites()
    res.json({ 
        msg: "Adding article", 
        req: req.body, 
    })
}

export default ScrapperController