"use client";
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { useEffect, useState } from "react";
import Link from 'next/link';
import EditPost from '@/components/editPost';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [title, setTiltle] = useState("");
  const [des, setDes] = useState("");

  const [ posts, setPosts] = useState([]);

  const [ updated , setUpdated] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, des);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/post`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, des }),
      });
      if (res.ok) {
        GetPosts();

      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetPosts = async (req, res) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/post`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (res.ok) {
        const post = await res.json();
        setPosts(post.posts);
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetPosts();
  }, [updated]);

  const handleDelete = async (id) =>{
    const confirmed = confirm("Are you sure?");
  
    if (confirmed) {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/post?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
      GetPosts()
      }
    }

  }
  const onChange =(value)=>{
    setUpdated(value)
    console.log(value)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-5 py-20 px-5 justify-center">
        <input
        className="p-3  shadow-lg rounded-lg w-full lg:w-60 md:w-52"
          placeholder="title"
          required
          value={title}
          onChange={(e) => {
            setTiltle(e.target.value);
          }}
        />
        <input
        className="p-3 shadow-lg rounded-lg w-full lg:w-60 md:w-52"
          placeholder="description"
          required
          value={des}
          onChange={(e) => {
            setDes(e.target.value);
          }}
        />
        <button className="bg-blue-gray-100 p-3 rounded-lg text-black" type="submit">Add To Do</button>
      </form>
      <div className="flex flex-col flex-wrap gap-4 lg:mx-20 md:mx-10 mx-5 justify-center">
      {posts?.map((post)=>{
        return (
          <>
        <div className="p-10 bg-gray-200 flex  flex-wrap  shadow-lg rounded-lg relative gap-10 justify-center">
        <div className='font-bold'> {post.title}</div>
        <Link href={`/post/${post._id}`} className="bg-blue-gray-100 rounded-lg p-1 "> See Details</Link>
         <button className='absolute right-0 top-0 p-1 ' onClick={()=>{handleDelete(post._id)}}> <Icon path={mdiDelete} color='red' size={1} /></button>
        <div className='absolute right-0 bottom-0 p-1 cursor-pointer'><EditPost item={post} onChange={onChange}/></div> 

        </div>
        </>
);      })}
</div>
    </>
  );
}
