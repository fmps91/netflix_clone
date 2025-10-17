import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom'

const Player = ({video}) => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at: "",
    type:""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjBmNmI2MGRjMzIwZWJiZmVlM2YwMWM1MmQ0MWIzZCIsIm5iZiI6MTc1ODkzMTIxMS40NjU5OTk4LCJzdWIiOiI2OGQ3MjkwYjMyZmUxNDdlZTdlMWJhYTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lpykoh67PVeNis2PJWEhb_XImmbgYZvG4_Ez_RdU_GQ'
  }
};

//1267319

  useEffect(()=>{
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
  },[])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe 
      src={`https://www.youtube.com/embed/${apiData.key}`} 
      title='trailer'
      width="90%" height="90%"  allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player