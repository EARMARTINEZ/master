import { useState , useEffect, useCallback } from 'react';
import { useTasks } from "utils/ProviderContext";

const useFetchCollection = (IdCollection) => {

    const {       
        fetchData
      } = useTasks()
      const [controlFetchData, setControlfetchData] = useState(true);    

  useEffect(() => {
     if (controlFetchData){        
        fetchData();
        setControlfetchData(false);
    }
    
  }, [IdCollection, fetchData, controlFetchData]);
};

export default useFetchCollection;

// Asegúrate de que las funciones doGetLastCollection y dogetCollectionReference estén definidas en otro lugar de tu código
// Usa este hook en un componente de la siguiente manera:
// useFetchCollection(IdCollection);
