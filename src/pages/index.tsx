import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Me from "@/components/Me";
import Spotify from "@/components/Spotify";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vic van Cooten</title>
        <meta
          name="description"
          content="Vic van Cooten - Full Stack Engineer from Utrecht"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <Me />
          <h1>Vic van Cooten</h1>
        </header>
        <p>
          Hi. I&apos;m Vic, from Utrecht. I use a broad set of skills to make
          technology and processes work simpler and better.
        </p>
        <p>
          I currently work at{" "}
          <a href="https://a-insights.eu" target="_blank" rel="noreferrer">
            <svg
              viewBox="0 0 46 18"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              style={{ margin: "0 2px" }}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.48704 16.1948C1.36225 16.1948 1.23797 16.1473 1.14263 16.0519C0.952457 15.8615 0.952457 15.5532 1.14263 15.3623L15.3507 1.13718C15.5334 0.954274 15.8568 0.954274 16.0395 1.13718L22.1056 7.21051C22.2957 7.40091 22.2957 7.70925 22.1056 7.90015C21.9154 8.09055 21.6069 8.09055 21.4167 7.90015L15.6951 2.17114L1.83144 16.0519C1.73611 16.1473 1.61182 16.1948 1.48704 16.1948ZM30.3049 17C30.1756 17 30.0518 16.9485 29.9605 16.8571L23.8944 10.7837C23.7043 10.5933 23.7043 10.2845 23.8944 10.0941C24.0846 9.9037 24.3931 9.9037 24.5833 10.0941L30.3049 15.8226L44.1686 1.94236C44.3587 1.75146 44.6667 1.75146 44.8574 1.94236C45.0475 2.13276 45.0475 2.4411 44.8574 2.6315L30.6493 16.8571C30.558 16.9485 30.4342 17 30.3049 17Z"
              />
            </svg>
            A-Insights
          </a>{" "}
          as a software engineer on the customer portal.
        </p>
        <p>
          Feel free to{" "}
          <a href="mailto:hi@vtvc.nl" target="_blank" rel="noreferrer">
            contact me
          </a>{" "}
          or add me on{" "}
          <a
            href="https://www.linkedin.com/in/vtvc/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>{" "}
        <Spotify />
      </main>
    </>
  );
}
