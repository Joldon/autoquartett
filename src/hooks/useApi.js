import { useState, useEffect } from 'react'
import client from '../client'

// This just puts our API call to contenful in its own hook which makes our code cleaner 

function useApi() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      client.getEntries() //works like fetch method
      .then(response => response.items)
      .then((json) => {
        setCharacters(json);
        // setIsLoading(false);
      })
      .catch(console.log('request failed'));
    }, [])
 
    return characters
}
export default useApi