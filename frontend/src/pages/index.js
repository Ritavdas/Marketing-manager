import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import dateformat from "dateformat";

export default function Home({ data, done, error }) {
  useEffect(() => {
    console.log(
      "process.env.NEXT_PUBLIC_BASE_URL :",
      process.env.NEXT_PUBLIC_BASE_URL
    );
  }, []);
  console.log("data : ", data);
  const router = useRouter();

  const handleNavigation = ({ slug }) => {
    router.push("/" + slug);
    // Whenever this is triggered the router will push the page to the desrired destination.
  };

  return (
    <div>
      <Head>
        <title>Campaign Manager: | Home</title>
        <meta name="description" content="A site for campaigns" />
      </Head>
      <main className={styles.main}>
        <div className={styles.innerContent}>
          <h1>Available Campaigns</h1>
          {error && <p> {JSON.stringify(error)} </p>}
          {data.map((elem) => (
            <div key={elem.slug}>
              <div
                className={styles.item}
                onClick={() => handleNavigation(elem)}
              >
                <div className={styles.imgFormat}>
                  <Image
                    className={styles.img}
                    src={"https://res.cloudinary.com/dnre36mya/" + elem.logo}
                    height={120}
                    width={120}
                    alt="Campaign banner"
                  />
                </div>
                <div className={styles.rightItems}>
                  <Link href={"/" + elem.slug}>
                    <a>{elem.title}</a>
                  </Link>
                  <p>{elem.description}</p>
                  <small>
                    {dateformat(
                      new Date(elem.created_at),
                      "dddd, mmmm dS, yyyy, h:MM:ss TT"
                    )}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
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
