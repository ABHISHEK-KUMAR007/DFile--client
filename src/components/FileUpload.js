import {useState} from 'react';
import axios from 'axios';
//import "./FileUpload.css";
//var express = require('express');
//var cors = require('cors');
//app.use(cors());
const FormData = require("form-data");
const FileUpload = ({ contract , account , provider})=>{
    const[file,setFile]=useState(null);
    const[fileName,setFileName]=useState("No Image Selected");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(file){
           // try{
              const formData = new FormData();
              formData.append("file", file);
              
              console.log("hii_1");
              const resFile = await axios({
                
                
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",         
                method: "post",
                data: formData,
                headers: {
                  pinata_api_key: "45e535f9a674b780cedb",
                  pinata_secret_api_key: 
                  "02042e38aa6bdadb3231f7d6ff59cd9d17af013a7b83e6fbc6ad1ef737964035",
                  "Content-Type": "multipart/form-data",
                  //"Content-Type": `multipart/form-data: boundary=${formData.getBoundary()}`,
                    Accept: "text/plain",
                  
                },
                
              });
              console.log(resFile.data.IpfsHash);             
              
              const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
              
              console.log("hii3");
              // const signer= await contract.connect(provider.getSigner);
              // signer.add(account,ImgHash);
               await contract.add(account,ImgHash);
              console.log("hii4");
              alert("Successfully Image Uploaded");
              setFileName("No Image Selected");
              setFile(null);
              console.log("hii5");
            //} 
            //catch (e) {
              //alert("Unable to upload image to Pinata");
            //}
          }
          console.log("hii_6");
        };
        const retrieveFile =(e)=>{
        const data=e.target.files[0];// data=> it give all imformation abount file like name,modification date etc
        console.log(data);
        const reader =new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend=()=>{
            setFile(e.target.files[0]);
        }
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };

    return <div class="top">
        <form class="form" onSubmit={handleSubmit}>
            <lable htmlfor="file-upload " style={{color:"white" ,padding:"2px"}}  class="choose">choose file</lable>
            <lable > 
                <input disabled={!account} type="file" id="file-upload" name="data"style={{color:"white" ,padding:"2px"}} onChange={retrieveFile}></input>
            </lable>
            <spam class="textArea" style={{color:"white" ,padding:"2px"}}>Image:{fileName}</spam>
            <button type="submit" class="upload" disabled={!file}>upload file </button>
        </form>
    </div>
};
export default FileUpload;