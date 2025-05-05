// React Hooks are special functions that allow you to "hook into" React state and lifecycle features from function components.

// Import necessary dependencies
import { useState } from "react";  // Import useState hook for managing state
import { toast } from "sonner";    // Import toast for displaying error notifications

// Define the useFetch custom hook that takes a callback function (cb) as parameter
const useFetch = (cb) => {
  // Initialize state variables using useState hook
  const [data, setData] = useState(undefined);    // State for storing fetched data
  const [loading, setLoading] = useState(null);   // State for tracking loading status
  const [error, setError] = useState(null);       // State for storing any errors

  // Define the main function that will handle the async operation
  const func = async(...args) => {
    // Set loading state to true when operation starts
    setLoading(true);
    // Clear any previous errors
    setError(null);

    try {
        // Execute the callback function with provided arguments
        const response = await cb(...args);
        // Store the successful response in data state
        setData(response);
        // Ensure error state is null on success
        setError(null);
    } catch (error) {
        // If an error occurs, store it in error state
        setError(error);
        // Display error message using toast notification
        toast.error(error.message);
    } finally {
        // Always set loading to false when operation completes (success or failure)
        setLoading(false);
    }
  };

  // Return an object containing all states and the function
  // This allows components using this hook to access:
  // - data: The fetched data
  // - loading: Loading status
  // - error: Any error that occurred
  // - func: The function to trigger the fetch
  // - setData: Function to manually update the data state
  return {data, loading, error, func, setData};
};

export default useFetch;
