"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users: ", error));
  }, []);

  return (
    <main>
      <div>
        {/* Heading */}
        <div className="flex flex-row items-center justify-start w-full gap-20">
          <p className="w-20 text-red-600 text-[20px] font-bold">Name</p>
          <p className="text-blue-600 w-60 text-[20px] font-bold">Email</p>
          <p className="w-10 text-green-600 text-[20px] font-bold">Password</p>
          <br />
        </div>
        <div className="w-full h-px bg-yellow-600"></div>

        {/* Users data */}
        {users.map((user, index) => {
          return (
            <>
              <div
                key={index}
                className="flex flex-row items-center justify-start w-full gap-20"
              >
                <p className="w-20 text-red-600">{user.name}</p>
                <p className="text-blue-600 w-60">{user.email}</p>
                <p className="w-10 text-green-600">{user.password}</p>
                <br />
              </div>
              <div className="w-full h-px bg-yellow-600"></div>
            </>
          );
        })}
      </div>
    </main>
  );
}
