// src/Components/Header/utils.ts

export const getUserIdFromStorage = (): string | null => {
    return localStorage.getItem('userId');
  };
  
  export const isLoggedIn = (): boolean => {
    return getUserIdFromStorage() !== null;
  };
  