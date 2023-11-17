'uses client';
import React from "react";
import "styles/navbar-footer.css";
import FullscreenPopup from "../PopUp/popup";

const Card = () => {
  return (
    <div className="card" style={{width: '60%'}}>
    <img src="https://static.timesofisrael.com/www/uploads/2020/12/1L.jpg" className="card-img-top" alt="House"/>
     <div className="card-body">
      <h5 className="card-title">Kanye Mansion</h5>
      <p className="card-text"># of rooms # of bathrooms</p>
      <FullscreenPopup/>
    </div>
  </div>
  );
};

export default Card;
