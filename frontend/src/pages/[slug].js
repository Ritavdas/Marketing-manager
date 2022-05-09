import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import dateformat from "dateformat";

function Campaign({ data }) {
  console.log("data : ", data);

  const {query: { slug },} = useRouter();

  console.log("router: ", slug);
  return (
    <div className={styles.main}>
      <div key={data.slug}>
        <div className={styles.item}>
          <div className={styles.imgFormat}>
            <Image
              className={styles.img}
              src={"https://res.cloudinary.com/dnre36mya/" + data.logo}
              height={120}
              width={120}
              alt="Campaign banner"
            />
          </div>
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
