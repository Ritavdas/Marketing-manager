import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ data, done }) {
  console.log("data : ", data);
  return (
    <div>
      <main>
        <h1>Available Campaigns</h1>
        {data.map((elem) => (
          <div key={elem.slug}>
            <div>
              <div>
                <img
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
  // For fetching data in real time
  const response = await fetch("http://localhost:8000/api/campaigns");

  // The actual data in a promise so we convert it to JSON
  const data = await response.json();

  return {
    props: {
      data,
      done: true,
      // These props will be now available in the element
    },
  };
}
