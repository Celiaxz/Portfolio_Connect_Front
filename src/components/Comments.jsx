import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";
import { BASE_URL } from "../config/config.index";

function Comments({projectId,allComments, setAllComments}) {
   const { user, isLoggedIn } = useContext(AuthContext);
   const [commentContent, setCommentContent] = useState("");
   const [editComment, setEditComment] = useState(false);
   const [commentToEdit, setCommentToEdit] = useState(null);
   const [editedComment, setEditedComment] = useState("");

   const navigate = useNavigate()

   //Create new comment
   const handleNewComment = async (e) => {
      e.preventDefault();
      if(!isLoggedIn){
         navigate("/login")
      }
      try {
         const responseComments = await axios.post(`${BASE_URL}/project/${projectId}/comment`,
            {
               userId: user._id,
               projectId: projectId,
               comment: commentContent,
            })
         if (responseComments.status === 201) {
            try {
               const response = await axios.get(`http://localhost:5005/project/${projectId}`);
               setAllComments(response.data.comments);
               setCommentContent("");
            }
            catch (error) {
               console.error(error);
            }
         }
      }
      catch (error) {
         console.error(error)
      }
   }

   //Editing the comment
   const handleEditComment = async (commentId) => {
      try {
         const responseComment = await axios.patch(`http://localhost:5005/project/${projectId}/comment/${commentId}/update`, { comment: editedComment })
         if (responseComment.status === 200) {
            //fetching all comments again and set the state to refresh comments section
            const response = await axios.get(`http://localhost:5005/project/${projectId}`)
            setAllComments(response.data.comments)
            setCommentToEdit(null)
            setEditComment(false)
         }
      } catch (error) {
         console.error(error)
      }
   }

   //Deleting the comment
   const handleDeleteComment = async (commentId) => {
      try {
         const response = await axios.delete(`${BASE_URL}/project/${projectId}/comment/${commentId}/delete`)
         if (response.status === 204) {
            const response = await axios.get(`${BASE_URL}/project/${projectId}`);
            setAllComments(response.data.comments);
         }
      } catch (error) {
         console.error(error);
      }
   };
   return (
      <>
         <div className="comments_section">
            <h3>Comments: </h3>
            {allComments &&
               allComments.map((comment) => {
                  return (
                     <div key={comment._id}>
                        {editComment && commentToEdit === comment._id ? (
                           <form>
                              <label>
                                 <textarea
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                    required/>
                              </label>
                              <button onClick={(e) => {
                                 e.preventDefault()
                                 handleEditComment(comment._id)
                              }}>
                                 Save edit
                              </button>
                           </form>
                        ) : (
                           <div className="one_comment" style={{ border: "solid teal 2px" }}>
                              <p>From {comment.userId.username}</p>
                              <p>{comment.comment}</p>
                              <p>{comment.date}</p>
                              {user && comment.userId._id === user._id && (
                                 <>
                                    <button
                                       onClick={() => {
                                          setEditComment(true);
                                          setCommentToEdit(comment._id);
                                          setEditedComment(comment.comment);
                                       }}
                                    >
                                       Edit
                                    </button>
                                    <button
                                       onClick={() => handleDeleteComment(comment._id)}
                                    >
                                       Delete
                                    </button>
                                 </>
                              )}
                           </div>
                        )}
                     </div>
                  );
               })}
         </div>
         <div className="new_comment">
            <p>Add new comment</p>
            <form onSubmit={handleNewComment}>
               <label>
                  Comment :
                  <textarea
                     value={commentContent}
                     onChange={(e) => setCommentContent(e.target.value)}
                     required/>
               </label>
               <button type="submit">Post</button>
            </form>
         </div>
      </>
   )
}

export default Comments