import React, { useState, useEffect, useCallback, useMemo } from 'react';

// components
// import { TodoForm, TodoList, TodoResults } from '../../components';

const API_URL = 'https://randomuser.me/api/?results=200';

const Home = () => {
  // local state
  const [users, setUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = useCallback(async () => {
    // eslint-disable-next-line no-undef
    const response = await fetch(API_URL);
    const data = await response.json();
    const userData = data.results;

    const flattenedUserData = userData.map((tableData) => {
      return {
        email: tableData.email,
        city: tableData.location.city,
        coords_latitude: tableData.location.coordinates.latitude,
        coords_longitude: tableData.location.coordinates.longitude,
        country: tableData.location.country,
        postcode: tableData.location.postcode,
        state: tableData.location.state,
        street_number: tableData.location.street.number,
        street_name: tableData.location.street.name,
        timezone_offset: tableData.location.timezone.offset,
        timezone_description: tableData.location.timezone.description,
      };
    });

    setUsers(flattenedUserData);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    if (searchQuery.length === 0) {
      return users;
    }

    const filteredData = users.filter((userData) => {
      const userDataValues = [
        userData.email.toLowerCase(),
        userData.city.toLowerCase(),
        userData.state.toLowerCase(),
        userData.state.toLowerCase(),
        userData.country.toLowerCase(),
        userData.street_number.toString(),
        userData.coords_latitude.toString(),
        userData.coords_longitude.toString(),
        userData.street_name.toLowerCase(),
        userData.timezone_offset.toLowerCase(),
        userData.timezone_description.toLowerCase(),
      ];

      return userDataValues.some((el) => {
        return el.includes(searchQuery.toLowerCase());
      });
    });

    return filteredData;
  }, [searchQuery, users]);

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search using any user property"
      />

      {users ? (
        <table>
          <thead>
            <tr>
              {Object.keys(users[0]).map((tableDataKey) => {
                return (
                  <th key={tableDataKey}>
                    {tableDataKey.split('_').join(' ')}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((userData) => {
                return (
                  <tr
                    key={userData.coords_latitude + userData.coords_longitude}
                  >
                    <td>{userData.email}</td>
                    <td>{userData.city}</td>
                    <td>{userData.coords_latitude}</td>
                    <td>{userData.coords_longitude}</td>
                    <td>{userData.country}</td>
                    <td>{userData.postcode}</td>
                    <td>{userData.state}</td>
                    <td>{userData.street_number}</td>
                    <td>{userData.street_name}</td>
                    <td>{userData.timezone_offset}</td>
                    <td>{userData.timezone_description}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No results found...</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
