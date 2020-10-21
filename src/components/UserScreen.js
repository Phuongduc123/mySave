import { Affix } from "antd";
import React, { useState } from "react";
import MenuLeft from "./MenuLeft";
import MenuRight from "./MenuRight"
import File from "./File"
const UserScreen = (props) => {
  
  return (
    
      <div style={{display:"flex"}}>
        <div style={{flex:1}}>
        <MenuLeft/>
        </div>
         
        <div style={{flex:6,display:"block"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <File/>
          <File/>
          <File/>
          <File/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <File/>
          <File/>
          <File/>
          <File/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <File/>
          <File/>
          <File/>
          <File/>
          </div>

        </div>
        <div style={{flex:1}}><MenuRight/></div>
        
    </div>
    
    
  );
};
export default UserScreen;
