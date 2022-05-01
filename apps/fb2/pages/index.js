import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fakebook</title>
        <meta name="description" content="POC using Dapr, GQL and NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h6 className={styles.title}>
          Welcome to <a href="">James' POC of Fakebook</a>
        </h6>

        <p className={styles.description}>
          Read your posts and comments{' '}
        </p>

        <div className={styles.grid}>
          <a href="/posts?userid=1" className={styles.card}>
            <h2>Posts &rarr;</h2>
            <p>See what your friends are up to</p>
          </a>

          <a href="/profile?userid=1" className={styles.card}>
            <h2>My Profile &rarr;</h2>
            <p>See my account</p>
          </a>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
