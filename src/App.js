import { useState, useEffect } from 'react';

function UserDataFetcher() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error ,setError] = useState(null);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

     try {
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) throw new Error("Failed to fetch"); 
      const data = await response.json();
      setUserData(data.results[0])
     } catch (error) {
      setError(error.message);
     }finally {
      setLoading(false);
     }
  };

  useEffect(() => {
    
    fetchUserData();

    
    return () => {
    
      console.log('Cleanup: cancelling any pending requests');
    };
  }, []);
    
  return (
    <div>
      <h1>User Data Fetcher</h1>
      
      {loading && <p>Loading user data...</p>}
      
      {error && (
        <div>
          <p style={{ color: 'red' }}>Error: {error}</p>
          <button onClick={fetchUserData}>Retry</button>
        </div>
      )}
      
      {userData && !loading && (
        <div>
          <img src={userData.picture.medium} alt="User" />
          <h2>{`${userData.name.first} ${userData.name.last}`}</h2>
          <p>Email: {userData.email}</p>
        </div>
      )}
      
      <button onClick={fetchUserData} disabled={loading}>
        {loading ? 'Fetching...' : 'Refresh User'}
      </button>
    </div>
  );
}

export default UserDataFetcher;