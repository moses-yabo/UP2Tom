import "../App.css";
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { API_ENDPOINT, API_KEY, MODEL_ID } from "../config";


 function DrinkForms() {
    const [decision, setDecision] = useState('');
    const [submitting, setSubmit] = useState(false);
    const [formInput, setFormInput] = useState(false);
    const [success, setSuccess] = useState(false);
   const [modelMetaData, setModelMetaData] = useState(null);
   const InputRef = useRef([]);

  async function getModelMetaData() {
    try {
      const response = await axios.get(`${API_ENDPOINT}models/58d3bcf97c6b1644db73ad12`, {
        headers: {
          'Authorization': `Token ${API_KEY}`,
          'Content-Type': `application/vnd.api+json`
        }
      });
      console.log("ishu",response)
      setModelMetaData(response.data.data.attributes);

    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getModelMetaData();
    handleSubmit();

  }, []);
  console.log("modelMetaData updated:", modelMetaData);

  const handleInputChange = (event) => {
    const { name, value } = event?.target  ?? undefined;
    setFormInput({ ...formInput, [name]: value });
  }

  const handleSubmit = async (event) => {
    event?.preventDefault();
    setSubmit(true);
    try {
        let data= {};
       const {name} = modelMetaData?.metadata?.attributes;
     InputRef.current.map((input)=>{
       return data.assign({
            "data": {
              "type": "model",
              "attributes": {
                "input": {
                  [name]: input.current.value,
                  
                }
              }
            }
          })
     })
     
      const response = await axios.post(`${API_ENDPOINT}decision/58d3bcf97c6b1644db73ad12`, 
      data
      , {
        headers: {
          'Authorization': `Barier ${API_KEY}`,
          'Content-Type': "application/vnd.api+json",
        }
      });

      setDecision(response.data);
      console.log("tsiki",response)
      setSuccess(true);


    } catch (error) {
        throw Error(error)
    }
  }


const buttonStyles = {
    bgColor:"#fff",
    color:"#40c3ff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    transition:"all 0.3s ease-in-out",
    width: "100%",
    fontSize:"17px",
    marginTop:"34px"

  };
const buttonWrapper = {
        "max-width":"100%",
        display:"flex",
         "justify-content":"flex-end",
        "align-item":"center",
        "margin-left":"230px",
        "margin-top":"-120px",
        "max-height":"5rem",
        position:"relative",
        bottom: "-6rem",
        left: "-0.7rem"



  };
const header = {
    bgColor:"#fff",
    border: "none",
    "border-radius": "5px",
    padding: "10px 20px",
    transition:"all 0.3s ease-in-out",
    width: "100%",
    "font-size":"17px",
    "margin-top":"34px"

  };


  return (
    <div className="card  card-flex">
      <div className="card-body">
        <h3 className="card-title" style={header}>{modelMetaData?.name ?? "Click to Load Model.... 😊 "}</h3>
        <div className="form-row">
            {
            !!modelMetaData ?
          (<form className="form-group col-md-6"  onSubmit={handleInputChange}>
            {modelMetaData?.metadata?.attributes.map((attr,index)=>{
                    return <>
                    <label htmlFor={attr?.name ?? ""}>{attr?.name ?? ""}</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="inputName"
                    ref={InputRef} 
                    placeholder={attr?.question ?? ""} 
                    key={index}/>
                    </>
            })}

       
        <button type="submit" style={buttonStyles} onClick={handleSubmit}>Query model</button>
        
            </form>)
            :(
                <div style={buttonWrapper}>
            <button style={buttonStyles} className="get__Model__btn">Load Model</button>
            </div>
             )
          }
        </div>
            
        {success && !!modelMetaData? 
    `DECISION :.... ${decision?? "siso babas"}`
    :""
    }
    
    
      </div>
      
    </div>
  );
}


export default DrinkForms;





  