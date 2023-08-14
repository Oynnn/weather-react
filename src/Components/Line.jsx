import React from "react";

function Line({width}) {
   return (
      <div style={{
         width: `${width}%`,
         height: '1px',
         border: '1px solid rgb(199, 195, 195)',
         borderRadius: '5px',
         margin: '0 10px 0 10px'
      }}></div>
   )
}

export default Line;