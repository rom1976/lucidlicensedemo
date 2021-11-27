import React, { useState, useEffect } from "react";
import axios from "axios";

	const UploadImg = (props) => {
	
	const [id, setId] = useState();
	const [file, setFile] = useState([]);
	const [image, setImage] = useState('');
	const [preview, setPreview] = useState("https://via.placeholder.com/150");
	const [message, setMessage] = useState("");
	const [uploadStatus, setUploadStatus] = useState('');
	//const [baseImage, setBaseImage] = useState("");
	const [Img,setImg ] = useState();
  
	const update = (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/)) {
     setUploadStatus('Please select valid image.');
     setImg(false);
      
      return false;
    }
    if (imageFile){
    const reader = new FileReader();
    setFile(e.target.files[0]);
	setId(props.candid);
	alert(props.candid);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  };
  
  


	


  const send = () => {
	
    const formData = new FormData();
    formData.append("image", file);
	formData.append("candidate",id);
	alert(id)
    //Axios.post("http://localhost:3002/api/image",formData,{
    fetch("http://localhost:3002/api/image",{
      method: "POST",
      body: formData,
      headers: {
        'Accept': "multipart/form-data",
      },
      credentials: "include",
	  
    },)
	.then(res => res.json())
		.then(res=> {
			setUploadStatus(res.msg);
		})
		.catch(error =>{
		console.error(error)
      });
  };




//useEffect(() =>{
//
	//fetch(`http://localhost:3002/api/image`, {
		//method:"GET",
		//headers:{
			//"Content-Type": 'application/json, charset=UTF-8',
			//'Accept': 'application/json, text/html',
		//},
		//credentials: "include",
	//})
	//.then(data => data.json())
	//.then(data => {
		//console.log(data)
			//setImage('http://localhost:3002/'+data.image);
			//setMessage(image)
			
	//});
//})

//const get = () => {
  //};

  return (
    <div>
      
	  <input
        type="file"
        accept="image/*"
        className="form-control"
        name="image"
        onChange={update}
      />
      <button className="btn" onClick={send}>
        Upload
      </button>
      <button className="btn">
        Dowload
      </button>
      <h2> {uploadStatus}</h2>
      <div className="image-fluid " style={{width:'100px', height:'100px'}}>
	  { image && <img src= {image} alt="msql_image" className="img-thumbnail" />}
       
        --
        <br />
        
         <img src={preview} alt="" className="img-thumbnail" />
      </div>
    </div>
  );
};

export default UploadImg;
