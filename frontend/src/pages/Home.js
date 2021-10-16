import React from "react";

export default function Home(props) {
  return (
    <div className="text-center">
      <h1 className="display-4">Home</h1>
      {props.user !== null && <h4><strong>Hello {props.user.first_name} {props.user.last_name}!</strong></h4>}
      <img src="/landing.png" className="w-100" alt="logo" />
    </div>
  );
}
