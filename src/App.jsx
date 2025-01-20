import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function getComments() {
      const data = await fetch("/data/data.json").then(x => x.json());
      setComments(data)
    }
    getComments();
  }, [])

  function addComment(comment) {
    setComments([...comments, comment]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.id = crypto.randomUUID();

    addComment(formObj);
    e.target.reset();
  }

  return (
    <>
      <div className="container">
        <h2>Comment Listesi</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="comment" placeholder="Yapılacak Yorum" autoComplete="off" />
          <button type="submit">Comment Ekle</button>
        </form>
        {comments.length === 0 ?
          <p>No comments found.</p> :
          <ul>
            {comments.map((x, i) => <li key={i}>
              <h2>{x.name}</h2>
              <span>{x.time}</span>
              <p>{x.comment}</p>
              <span>Likes: {x.likes}</span>
              <span>Dislikes: {x.dislikes}</span>
              {x.replies && x.replies.length > 0 && (
                <ul>
                  {x.replies.map((reply, i) => (
                    <li key={i}>
                      <h3>{reply.name}</h3>
                      <span>{reply.time}</span>
                      <p>{reply.comment}</p>
                      <span>Likes: {reply.likes}</span>
                      <span>Dislikes: {reply.dislikes}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>)}
          </ul>}
     </div>
  </>
 )
}

export default App;
