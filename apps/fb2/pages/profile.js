import Head from 'next/head'
import styles from '../styles/Home.module.css'
import getGqlData from  '../utils/gql_client'
import 'axios'
import queryString from 'query-string'
import React, { useState, useEffect } from "react";

const query = (userid) => `query {
  user(id: ${userid}) {
    name
    username
    email
    }
  }`

export default function Profile() {

  const getQueryString = () => {
    let queries = queryString.parse(document.location.search)
    return queries.userid
  }

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const loadProfile = () => {
    let userid = getQueryString()
    setLoading(true)
    getGqlData(query(userid))
    .then((data) => {
      console.debug('user posts fetched')
      console.debug(data)
      setData(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadProfile()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return <div className={styles.container}>
      <Head>
        <title>Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p className={styles.title}>
          Name: {data.user.name}
        </p>
        <p className={styles.title}>
          User Name: {data.user.username}
        </p>
        <p className={styles.title}>
          Email: {data.user.email}
        </p>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://www.facebook.com/james.tang.zan/"
          target="_blank"
        >
          Powered by James
        </a>
      </footer>
    </div>
}