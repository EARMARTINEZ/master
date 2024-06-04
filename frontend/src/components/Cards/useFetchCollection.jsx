import { useState , useEffect, useCallback } from 'react';
import { useTasks } from "utils/ProviderContext";

const useFetchCollection = (IdCollection) => {

    const {
        dogetCollectionReference,      
        doGetLastCollection,
        dofetchIDCollection,
      } = useTasks()

      const [controlFetchData, setControlfetchData] = useState(true);
 
      const fetchData = useCallback(async () => {
        try {
        // Obtener el ID de la colección del localStorage
        let idCollectionInLocalStorage = localStorage.getItem('IdCollection');

        // Si no hay ID de colección en el localStorage
        if (idCollectionInLocalStorage === null) {
            // Obtener la última colección
            const lastCol = await doGetLastCollection();

            // Determinar la referencia de la colección a obtener
            const collectionId = (lastCol && lastCol.length > 0) ? lastCol[0].id : '29';
            dogetCollectionReference(collectionId);
            dofetchIDCollection(collectionId)
        } else {
            // Usar el ID de colección del localStorage
            dogetCollectionReference(idCollectionInLocalStorage);
            dofetchIDCollection(idCollectionInLocalStorage);
        }
        } catch (error) {
        console.error('Error al obtener datos de la colección:', error);
        }
  }, [dogetCollectionReference, doGetLastCollection]);

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
