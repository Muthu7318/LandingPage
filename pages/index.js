import React, { useEffect } from "react";

function Index({ user }) {
  useEffect(() => {
    document.title = `Welcome ${user.name.split(" ")[0]}`;
  }, []);

  return (
    <div>
      Homepage
      <PlansCard></PlansCard>
    </div>
  );
}
export default Index;
