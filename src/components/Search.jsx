import { useState } from "react";

const Search = () => {
    const [state,setState] = useState({obj:"",str:""});
    const handleChange = e=>{
        setState({...state,[e.target.name]: e.target.value});
    }
    const handleSubmit =e=>{
      e.preventDefault();
      const newObj = JSON.stringify(state.obj);
      console.log(newObj);
    }
    function find(obj, item) {
      for(let key in obj) {                                   // for each key in obj (obj is either an object or an array)
          if(obj[key] && typeof obj[key] === "object") {      // if the current property (value of obj[key]) is also an object/array
              let result = find(obj[key], item);              // try finding item in that object
              if(result) {                                    // if we find it
                  result.unshift(key);                        // we shift the current key to the path array (result will be an array of keys)
                  return result;                              // and we return it to our caller
              }
          } else if(obj[key] === item) {                      // otherwise (if obj[key] is not an object or array) we check if it is the item we're looking for
              return [key];                                   // if it is then we return the path array (this is where the path array get constructed)
          }
      }
  };
  function getPath(obj,item){
  const arr = find(obj,item);
  if(!arr){
    return "Not in object";
  }
  const letToString = letObj => Object.keys(letObj)[0];
  return arr.join(".");
  }
  const a = {
     user: {
       id: 1,
       name: {
         firstName: "James",
         lastName: "Ibori"
       },
       location: {
         city: "Ikoyi",
         state: "Lagos",
         address: "One expensive house like that"
       }
     }
  }
  
  console.log(getPath(a, 'One expensive house like that'));
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Query
          <input type="search" onChange = {handleChange} name="str"/>
        </label>
        <label>
          Array
          <textarea name="obj" onChange = {handleChange}></textarea>
        </label>
        <input type="submit"/>
      </form>
    </div>
  );
};

export default Search;
