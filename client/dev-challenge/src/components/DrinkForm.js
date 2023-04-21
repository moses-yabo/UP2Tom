import "../App.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_ENDPOINT, API_KEY, MODEL_ID } from "../config";


export function DrinkForms() {

  const [modelMetaData, setModelMetaData] = useState(null);
  const [formInput, setFormInput] = useState([{
    data: {
      type: "scenario",
      attributes: {
        input: [1.0, "Yes", "Green", 4.0]
        }
    }
  }]);
  const [decision, setDecision] = useState('');
  const [submitting, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);

  async function getModelMetaData() {
    try {
      const response = await axios.get(`${API_ENDPOINT}models/58d3bcf97c6b1644db73ad12`, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
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
  }, []);
  console.log("modelMetaData updated:", modelMetaData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    try {
      const response = await axios.post(`${API_ENDPOINT}decision/58d3bcf97c6b1644db73ad12`, modelMetaData, {
        headers: {
          'Authorization': `Barier ${API_KEY}`,
          'Content-Type': "application/vnd.api+json",
        }
      });

      setDecision(response.data);
      console.log("tsiki",response)
      setSuccess(true);


    } catch (error) {
      console.log(error);
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
const header = {
    bgColor:"#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    transition:"all 0.3s ease-in-out",
    width: "100%",
    fontSize:"17px",
    marginTop:"34px"

  };







  return (
    <div className="card  card-flex">
      <div className="card-body">
        <h3 className="card-title" style={header}>{modelMetaData?.name ?? "execrise"}</h3>
        <div className="form-row">
            {
            !!modelMetaData ?
          (<form className="form-group col-md-6" >
            {modelMetaData?.metadata?.attributes.map((attr,index)=>{
                    return <>
                    <label htmlFor={attr?.name ?? ""}>{attr?.name ?? ""}</label>
                    <input type="text" className="form-control" id="inputName" placeholder={attr?.question ?? ""} key={index}/>
                    </>
            })}

       
        <button type="submit" style={buttonStyles} onClick={handleSubmit}>Query model</button>
        
            </form>)
            :(
            <button onClick={() => getModelMetaData()} style={buttonStyles} className="get__Model__btn">Load Model</button>
             )
          }
        </div>
            
        {!success ? 
    `DECISION :.... ${decision?? "siso babas"}`
    :""
    }
    
    
      </div>
      
    </div>
  );
}








  