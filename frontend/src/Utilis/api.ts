import axios from "axios"
let URL = "https://weak-rose-foal-coat.cyclic.app"

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