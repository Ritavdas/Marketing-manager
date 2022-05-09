import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
// import styles from "../styles/Home.module.css";
import styles from "../styles/Detail.module.css";
import dateformat from "dateformat";

function Campaign({ data }) {
  console.log("data : ", data);

  const {
    query: { slug },
  } = useRouter();

  console.log("router: ", slug);
  return (
    <div>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>

      <div className={styles.wrapper}>
        <div className={styles.main}></div>

        <div className={styles.contents}>
          <Image
            className={styles.img}
            src={"https://res.cloudinary.com/dnre36mya/" + data.logo}
            height={120}
            width={120}
            alt="Campaign banner"
          />
          <div className={styles.grid}>
            <div className={styles.left}>
              <h1 className={styles.title}>{data.title}</h1>
              <p className={styles.description}>{data.description}</p>
            </div>
            <div className={styles.right}>
              <div className={styles.rightContents}>
                <form>
                  <div className={styles.formGroup}>
                    <input
                      type="email"
                      required
                      name="email"
                      placeholder="Email address"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.submit}>
                    <input className={styles.button} type="submit" />
                    <p className={styles.consent}>
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div key={data.slug}>
          <div className={styles.item}>
            <div className={styles.imgFormat}></div>
            <div className={styles.rightItems}>
              <Link href={"/" + data.slug}>
                <a>{data.title}</a>
              </Link>
              <p>{data.description}</p>
              <small>
                {dateformat(
                  new Date(data.created_at),
                  "dddd, mmmm dS, yyyy, h:MM:ss TT"
                )}
              </small>
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <Link href="/">
            <a>Go back to List</a>
          </Link>
        </footer>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // For fetching data in real time
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`);
  // The actual data in a promise so we convert it to JSON
  const data = await response.json();

  const allSlugs = data.map((item) => item.slug); // this will return all slugs
  const paths = allSlugs.map((slug) => ({ params: { slug: slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${params.slug}`
  );
  const data = await response.json();

  return {
    props: {
      data,
      // These props will be now available in the dataent
    },
  };
}

export default Campaign;
