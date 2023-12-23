import axios from "axios"
// let URL = "http://localhost:8080"
// let URL = "https://synth-ai-backend-7kv6-229sc0vcp-khelsai01.vercel.app/"  //VERCEL
let URL = "https://synth-ai-backend-7kv6-229sc0vcp-khelsai01.vercel.app"

let InterviewURL=URL+"/interview";

let HistoryURL=URL+"/history";

export const GetCourseData=()=>{
   return axios.get(InterviewURL+"/data")
}

export const GetSingleCourseData=(id:any)=>{
   return axios.get(InterviewURL+"/data/"+id)

}


export const AddHistory=(obj:any)=>{
   return axios.post(HistoryURL+"/add",obj)
}

export const GetHistoryDataOfUser=(id:any)=>{
   return axios.get(HistoryURL+"/"+id)
}

export const GetSingleHistoryData=(id:any)=>{
   return axios.get(HistoryURL+"/singleData/"+id)
}


export const OpenApiChat=(data:any)=>{
   return axios.post(URL+"/openai",data)
}