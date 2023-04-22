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
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  }



  //handle  from  Input Submit 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    try {
        const response = await axios.post(
            `https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12`,
          JSON.stringify({
            data: {
                type:"scenario",
              input: [
                { name: "INPUTVAR1", value: "45.0" },
                { name: "INPUTVAR2", value: "Male" },
                { name: "INPUTVAR3", value: "45" },
                { name: "INPUTVAR4", value: "No" },
                { name: "INPUTVAR5", value: "Morning" },
                { name: "INPUTVAR6", value: "No" },
                { name: "INPUTVAR7", value: "Yes" },
                { name: "INPUTVAR8", value: "3" },
                { name: "INPUTVAR9", value: "2" },
              ],
            },
          }),
          {
            headers: {
              "Authorization": `Token 9307bfd5fa011428ff198bb37547f979`,
              "Content-Type": "application/vnd.api+json",
            },
          }
        );
      
        setDecision(response.data);
        console.log("response data:", response.data);
        setSuccess(true);
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
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








  