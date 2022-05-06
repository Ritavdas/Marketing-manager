import React from "react";
import { useRouter } from "next/router";

function Campaign() {
  const {query: {slug}} = useRouter();
  console.log("router: ", slug);
  return <h1>Campaign</h1>;
}

export default Campaign;
