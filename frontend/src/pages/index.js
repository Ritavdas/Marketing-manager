import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home({ data, done, error }) {
  useEffect(() => {
    console.log(
      "process.env.NEXT_PUBLIC_BASE_URL :",
      process.env.NEXT_PUBLIC_BASE_URL
    );
  }, []);
  console.log("data : ", data);
  return (
    <div>
      <main>
        <h1>Available Campaigns</h1>
        {error && <p> {JSON.stringify(error)} </p>}
        {data.map((elem) => (
          <div key={elem.slug}>
            <div>
              <div>
                <Image
                  src={"https://res.cloudinary.com/dnre36mya/" + elem.logo}
                  height={120}
                  width={120}
                  alt="Campaign banner"
                />
              </div>
              <div>
                <h1>{elem.title}</h1>
                <p>{elem.description}</p>
                <p>{elem.created_at}</p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  let data = [];
  let error = null;

  try {
    // For fetching data in real time
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`
    );

    // The actual data in a promise so we convert it to JSON
    data = await response.json();
  } catch (err) {
    console.log("err >>", err);
    error = err.message ? err.message : "Something went wrong";
  }

  return {
    props: {
      data,
      error,
      done: true,
      // These props will be now available in the element
    },
  };
}
