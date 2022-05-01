import Head from 'next/head'
import styles from '../styles/Home.module.css'
import getGqlData from  '../utils/gql_client'
import 'axios'
import queryString from 'query-string'
import React, { useState, useEffect } from "react";

const query = (userid) => `query {
  user(id: ${userid}) {
    name
    posts {
        id
        title
        body
      }
    }
  }`

const queryComments = (postId) => `query {
    comments(postId: ${postId}) {
      name
      email
      body
      }
    }`
const commentsQuery = ``

export default function Posts() {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isLoadingComments, setLoadingComments] = useState(false)

  const getQueryString = () => {
    let queries = queryString.parse(document.location.search)
    return queries.userid
  }

  const filter = (event) => {
    if (event.charCode === 13) {
      let kw = event.target.value
      console.debug('Filtering by keyword: ', kw)
      if (kw) {
        filterByKeyword(kw)
      } else {
        loadPosts()
      }
    }
  }

  const filterByKeyword = (keyword) => {
    let hits = data.user.posts.filter(p=>p.title.includes(keyword))
    setData({
      user: {
        name: data.user.name,
        posts: hits
      }
    })
  }

  const showComments = async (post) => {
    if (!post.showingComments && !post.comments) {
      await loadComments(post)
    }
    post.showingComments = !post.showingComments
    setData(JSON.parse(JSON.stringify(data)))
  }

  const loadComments = async (post) => {
    setLoadingComments(true)
    let comments = await getGqlData(queryComments(post.id)).then((data) => data.comments).catch(err => {
      console.error('Error fetching comments for ', post.id)
      return false
    })
    console.debug('post comments fetched')
    console.debug(comments)
    post.comments = comments
    setLoadingComments(false)
    return true
  }
  const loadPosts = () => {
    setLoading(true)
    getGqlData(query(getQueryString()))
    .then((data) => {
      console.debug('user posts fetched')
      console.debug(data)
      setData(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadPosts()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return <div className={styles.container}>
      <Head>
        <title>Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h5 className={styles.title}>
          Welcome to {data.user.name}'s Blog
        </h5>
        <br/>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input className="input-field" type="text" placeholder="Filter" name="filter" onKeyPress={filter}></input>
        </div>
        <div className={styles.grid}>
          {data.user.posts.map(post => (
            <div key={post.id} href="" className={styles.card}>
            <h5> {post.title}</h5>
            <p>{post.body}</p>
            <br></br>
            <p onClick={()=>showComments(post)} style={{color: "navy", cursor: "pointer" }}>{post.showingComments?'Hide Comments':'Show Comments'} <span style={{color: "gray"}}>Total: {post.comments && post.comments.length || 'unknown'}</span>
            </p>
              {
                post.showingComments && post.comments && post.comments.map(comment => (
                  <div key={comment.id} href="" className={styles.comment}>
                    <hr/>
                    <h6> {comment.name}</h6>
                    <p className={styles.comment}>{comment.body}</p>
                  </div>
                ))
              }
            </div>
          ))}
        </div>
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