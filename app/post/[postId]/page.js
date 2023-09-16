
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getPost(id){
    const topicResponce =await fetch(`${NEXT_PUBLIC_API_URL}/post/${id}`,{cache:"no-store"})
    return topicResponce.json();
}


const postDetails = async({params}) => {
    const {post} = await getPost(params.postId)
  return (
    <div className=" flex flex-col text-center py-20 items-center">
    <div className="font-bold text-xl pb-2 border-b-2 border-dashed w-1/2 border-b-black">{post.title}</div>
    <div className=" pt-5">{post.des}</div>
    </div>
  )
}

export default postDetails

