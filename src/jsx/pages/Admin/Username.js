import React, { useEffect, useState } from "react";
import { GetUserName } from "./../../../web3/ContextMethods";

export default function Username() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const init = async () => {
      const name = await GetUserName();
      setUser(name);
    };

    setInterval(async()=>{
    await init();
    },3000)
    

  }, []);

  return (
    <div className="text-light bg-black ps-xxl-5 px-xl-4 pb-2">
        Welcome {user}
    </div>
  );
}
