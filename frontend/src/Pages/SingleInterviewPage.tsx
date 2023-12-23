import React, { FormEvent, useEffect, useState, useRef } from 'react'
import { useReactMediaRecorder } from "react-media-recorder";
import { AddHistory, GetSingleCourseData, OpenApiChat } from '../Utilis/api'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "../index.css"
import { useParams } from 'react-router-dom';



const SingleInterviewPage = () => {

  const { id } = useParams();
  let [data, setData] = useState<any>("")
  const [loading, setLoading] = useState<any>(false);

  const [text, setText] = useState<any>("")
  const [mode, setMode] = useState<any>(false)
  const [conversation, setConversation] = useState<any>([])

  const handleSpeak = (dat: any) => {

    
    const message = new SpeechSynthesisUtterance(dat);

    window.speechSynthesis.speak(message);
  
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
   
  };
 

  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ screen: true });

  const HandleSubmit = async () => {
   
    let a = text.length > transcript.length ? text : transcript;


    if (a.length !== 0) {
      setLoading((prev: any) => !prev);

      let obj = { role: "user", content: a.trim() };
      setConversation((prev: any) => [...prev, obj]);
      let newObj = [...conversation, obj];

      try {
        OpenApiChat(newObj).then((res: any) => {
          setConversation((prev: any) => [...prev, res.data])


          setLoading((prev: any) => !prev);
          handleSpeak(res.data.content);
        })
      } catch (error) {
        console.error("API call error:", error);
      } finally {

        setText("");
        SpeechRecognition.stopListening();
        resetTranscript();

      }


    } else {
      alert("Type Anything...");
    }
  };
 

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();




  const startListen = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  let [date_time, setDate_Time] = useState("");

  const StartInterview = () => {
    let d = new Date();
    setDate_Time(d.toUTCString());
 
    setMode(!mode);
    startListen();
    startRecording();
  }
  const EndInterview = () => {
    resetTranscript();
    stopRecording();
alert("Your Interview Has Ended... Please Wait For Some Time To Get FeedBack On The Chat... If You Want To Download Video, You Have To Wait For Some Times To Get It Uploaded... ")



    setLoading((prev: any) => !prev);
    setMode(!mode);
    let obj = { role: "user", content: `stop the interview. And return the feedback based on the your evaluation of the questions answered by me. You should only return the feedback. the feedback  should contain
      strengths,improvementAreas,overallScore`
    }

    setConversation((prev: any) => [...prev, obj]);
    let newObj = [...conversation, obj];

    try {
      OpenApiChat(newObj).then((res: any) => {
        setConversation((prev: any) => [...prev, res.data])

        let obj = {
          interview_name: data.name,
          interviewee_name: data.interviewee,
          VideoLink: mediaBlobUrl,
          score: res.data.content,
          conversation: conversation,
          Interrview_Duration: 0,
          Interview_Time: date_time
        }

        AddHistory(obj);
        setLoading((prev: any) => !prev);

      })
    } catch (error) {
      console.error("API call error:", error);
    } finally {

    }

  }

  useEffect(() => {
    GetSingleCourseData(id).then(res => {
      setData(res.data)

      let a = res.data.prompt;


      setConversation( a);
          handleSpeak(a[1].content);
    }

    )
  }, [])

  useEffect(() => {

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.style.transform = "scaleX(-1)";
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

  }, []);

  console.log(mediaBlobUrl)

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div> <header className="bg-black text-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className='flex justify-between items-center px-4'>
          <div>
            <h1 className="text-20 font-bold tracking-widest uppercase md:text-2xl">{data?.name} <span className='uppercase'>•    {status == "idle" ? "Ready to record" : status}</span></h1>
          </div>
          <div>
            {!mode ? <a onClick={StartInterview} className="inline-flex  justify-center  border items-center  py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gray-800 hover:bg-purple-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              START INTERVIEW

            </a> :
              <a onClick={EndInterview} className="inline-flex  justify-center  border items-center  py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gray-800 hover:bg-purple-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                END INTERVIEW

              </a>}
          </div>
        </div>


      </div>
    </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-8 sm:px-6 lg:px-8">
          <div className='flex w-full flex-col  justify-between md:flex-row'>
          <div className='mx-auto md:mx-3    md:w-[71%]   '>
              <div className='flex flex-col justify-between items-center w-full '>


  
              <div className=' my-2  border rounded-[10px] p-[20px]  bg-gray-400 border-gray-300 w-full  md:w-[100%] '>
  <img className='rounded-[50%] m-auto w-[50%] md:w-[30%]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmJ5WXSil0Qt-aRXeQy8TS6E7ftLnfNlkRl6gGo9zy87LqSVA0oDYhxPvJTg&s" alt="" />
</div>
<div className='  my-2   border rounded-[10px]   bg-gray-900 border-gray-300 w-full md:w-[100%]'>
<div>
          
         
              <video width="100%" height="180" className='rounded-[10px]'
                  ref={videoRef}
                  autoPlay
                  muted
              />
      </div>
     
</div>
              </div>

            </div>

            <div className='w-full mx-auto md:ml-[5px]   '>

            <div className='w-full h-[80vh] flex flex-col justify-between my-2 border rounded-[10px] p-[20px] md:h-[81vh] bg-gray-400 border-gray-300'>
                <div className='overflow-auto example' >
                  {conversation.length > 1 &&

                    conversation.map((el: any, ind: any) => ind != 0 ? <>{el.role == "assistant" ? <><div className="chat chat-start">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img alt="Tailwind CSS chat bubble component" src={data.interviewerImage} />
                        </div>
                      </div>
                      <div className="chat-header" >
                        {data.interviewee}
                      </div>
                      <div className="chat-bubble">{el.content}
  
                      </div>
   
                    </div></> :
                      <><div className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                          </div>
                        </div>
                        <div className="chat-header">
                        </div>
                        <div className="chat-bubble">{el.content}</div>
                        <div className="chat-footer opacity-50">
    Seen at 12:46
  </div>
                      </div></>}</> : null)}
                  {loading ? <><div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src={data.interviewerImage} />
                      </div>
                    </div>
                    <div className="chat-header">
                      {data.interviewee}
                    </div>
                    <div className="chat-bubble"><span className="loading loading-dots loading-md"></span></div>
                    <div className="chat-footer opacity-50">
    Delivered
  </div>
                  </div></> : null}
                </div>

                <div>

                  <label className="sr-only">Your message</label>

                  <div className="flex items-center w-full  py-2 rounded-lg  dark:bg-gray-700">

                    <textarea id="chat" rows={4} value={text.length > transcript.length ? text : transcript} onChange={(e: any) => e.target.value.length > transcript.length ? setText(e.target.value) : setText(transcript)} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Message..."></textarea>
                    {listening ?
                      <button onClick={SpeechRecognition.stopListening} className=" w-[53px] mr-3 inline-flex justify-center p-3 border text-blue-600 rounded-full cursor-pointer hover:bg-black dark:text-blue-500 dark:hover:bg-gray-600">
                        <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zhxr7ttbfoza4jhsw8mi.png" alt="" />
                      </button> : <button onClick={startListen} disabled={mode ? false : true} className=" w-[53px] mr-3 inline-flex justify-center p-3 border text-blue-600 rounded-full cursor-pointer hover:bg-black dark:text-blue-500 dark:hover:bg-gray-600"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gt7ew3aheyrpwxxz0cj5.png" alt="" /></button>}

                    <button type="submit" onClick={HandleSubmit} disabled={mode ? false : true} className="inline-flex justify-center p-3 border text-blue-600 rounded-full cursor-pointer hover:bg-black dark:text-blue-500 dark:hover:bg-gray-600">
                      <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                      </svg>

                      <span className="sr-only">Send message</span>
                    </button>
                  </div>

                </div>


              </div>
            </div>
          </div>
          
                    { mediaBlobUrl && (
              <div>
                  <p>Recorded Video (Download If You Want):</p>
                  <video
                      src={mediaBlobUrl}
                      controls
                     
                      loop
                  />
              </div>
          )} 
        </div>
      </main></div>
  )
}
export default SingleInterviewPage