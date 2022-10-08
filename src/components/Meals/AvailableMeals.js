import React, { useEffect , useState } from 'react'
import Card from '../UI/Card';
import classes from './css/AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import { ClipLoader } from 'react-spinners'

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];




const AvailableMeals = () => {

  const[meals, setMeals] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const[httpError, setHttpError] = useState();


  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);


  //fetching meals
  const fetchMeals = async () => {
    const response =  await fetch('https://foodorderapp-a2b94-default-rtdb.firebaseio.com/meals.json')

    //error handling
    if(!response.ok){
      throw new Error("Something went wrong")
    }

    const data = await response.json();

    const loadedMeals = [];

    for(const key in data){
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });

    }

    setMeals(loadedMeals);
    setIsLoading(false);
  }

  //loading
  if(isLoading) {
    return (
    <section className={classes.mealsLoading}>
      <ClipLoader color="#d92e45" size={50}/>
    </section>
    )
    
  }

  if(httpError){
    return (
      <section className={classes.HttpError}>
        <h1>{httpError}</h1>
      </section>
    )
  }
   

  const mealsList = meals.map(meal => 
    <MealItem
        key={meal.id}
        id={meal.id} 
        name={meal.name}
        description={meal.description}
        price={meal.price}
    />
  );

  

  return (
    <section className={classes.meals}>
      <Card>
          {mealsList}
      </Card>
    </section>
  );
}

export default AvailableMeals