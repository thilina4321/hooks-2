import React, { useCallback, useReducer, useState } from "react";
import IngredientList from "../Ingredients/IngredientList";
import IngredientForm from "./IngredientForm";
import LoadingIndicator from '../UI/LoadingIndicator'
import Search from "./Search";

const ingsReducer = (curState, action)=>{
  switch(action.type){
    case 'SET':return action.ings
    case 'ADD':return [...curState, action.ing]
    case 'DELETE':return curState.filter(ing=> ing.id !== action.id)
      default: throw new Error('Some unhanddle error')
  }
}

function Ingredients() {
  // const [ingredients, setIngredients] = useState([]);
  const [ingredients, dispatch] = useReducer(ingsReducer, [])
  const [isLoading, setIsLoading] = useState(false)
  console.log("change state");

  const ingredientsHandler = useCallback(async (ingredients) => {
    const { title, amount } = ingredients;
    setIsLoading(true)
    const response = await fetch(
      "https://simple-1db1e-default-rtdb.firebaseio.com/ings.json",
      {
        method: "POST",
        body: JSON.stringify({ title, amount }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const responseData = await response.json();
    setIsLoading(false)
    console.log(responseData);

    dispatch({type:'ADD', ing:{id:responseData.name, title,amount}})

    // setIngredients((preState) => [
    //   ...preState,
    //   { id: responseData.name, title, amount },
    // ]);
  }, []);

  const onLoadHandler = useCallback((ings) => {
    console.log(ings);
    const loadedData = [];
    for (let ing in ings) {
      loadedData.push({
        id: ing,
        title: ings[ing].title,
        amount: ings[ing].amount,
      });
    }
    // setIngredients(loadedData);
    dispatch({type:'SET', ings:loadedData})

  }, []);

  const onRemoveItem = useCallback( async(id) => {
    setIsLoading(true)
    await fetch(`https://simple-1db1e-default-rtdb.firebaseio.com/ings/${id}.json`, {
      method:'DELETE',
      headers:{'Content-Type' : 'application/json'}
    })
    setIsLoading(false)


    // setIngredients(pre=>pre.filter(ing=> ing.id !== id))
    dispatch({type:'DELETE', id})
  }, []);

  return (
    <div className="App">
      <IngredientForm ingredients={ingredientsHandler} />

      <section>

        <Search onLoadHandler={onLoadHandler} />
        {isLoading && <div style={{textAlign:'center'}}> <LoadingIndicator /> </div> }
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
