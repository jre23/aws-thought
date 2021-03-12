import React, { useState, useEffect } from "react";
import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([{}]);

  const deleteThought = async (timeCreated, userName) => {
    let deleteBool = window.confirm(
      "Are you sure you want to delete this thought?"
    );
    if (deleteBool) {
      try {
        const res = await fetch("/api/users/" + timeCreated + "/" + userName, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const userData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        fetchData();
      }
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/users");
      const userData = await res.json();
      // sort the array by createdAt property ordered by descending values
      const sortData = await userData.sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1
      );
      setThoughts([...sortData]);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <ThoughtForm fetchData={fetchData} />
        </div>
        <div className={`col-12 mb-3 `}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
              deleteThought={deleteThought}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
