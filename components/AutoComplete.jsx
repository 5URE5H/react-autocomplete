import React, { useState, useEffect } from "react";
import "./AutoComplete.scss";

const AutoComplete = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = (event) => {
    let keyword = event.target.value;
    setInput(keyword);

    const filterUsers = users.filter((user) =>
      user.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredUsers(filterUsers);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const renderUsersList = filteredUsers.map((user) => {
    return (
      <div className="auto-complete__list-item" key={user.id}>
        {user.name}
      </div>
    );
  });

  return (
    <div className="auto-complete">
      <div className="auto-complete__search">
        <label>Search for Users</label>
        <input
          className="auto-complete__search-input"
          type="text"
          value={input}
          onChange={handleInputChange}
        />
      </div>
      <div className={renderUsersList.length ? "auto-complete__list" : ""}>
        {renderUsersList}
      </div>
    </div>
  );
};

export default AutoComplete;
