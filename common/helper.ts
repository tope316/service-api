import { ResponseData } from "../data/model/ResponseData"
export class Helper { 
    private static readonly RESPONSE_SUCCESS = "SUCCESS"
    private static readonly RESPONSE_FAILED = "FAILED"
    
    static response():ResponseData { 
       const response = new ResponseData()
       response.data = "<no data>"
       response.description = Helper.RESPONSE_SUCCESS
       return response 
    } 
 } 