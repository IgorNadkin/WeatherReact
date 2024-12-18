export const saveToLocalStorage = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('cities', serializedState);
    } catch (e) {
      console.error('Не удалось сохранить города в localStorage:', e);
    }
  };
  export const saveToLocalStorageMeasurement = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('measurement', serializedState);
    } catch (e) {
      console.error('Не удалось сохранить города в localStorage:', e);
    }
  };
  
  
  export const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('cities');
      if (serializedState === null) return undefined; 
      
      return JSON.parse(serializedState); // Парсим сохранённый JSON
    } catch (e) {
      console.error('Не удалось загрузить города из localStorage:', e);
      return undefined;
    }
  };
  
  export const loadFromLocalStorageMeasurement = () => {
    try {
      const serializedState = localStorage.getItem('measurement');
      if (serializedState === null) return undefined; 
      
      return JSON.parse(serializedState); // Парсим сохранённый JSON
    } catch (e) {
      console.error('Не удалось загрузить города из localStorage:', e);
      return undefined;
    }
  };
  