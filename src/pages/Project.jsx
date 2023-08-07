import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function Project() {
    const [currentProject, setCurrentProject] = useState(null);
    const [commentContent, setCommentContent] = useState("");
    const [allComments, setAllComments] = useState([]);
    const { user } = useContext(AuthContext);
    const { projectId } = useParams()

    const handleNewComment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5005/project/${projectId}/comment`, {
                userId: user._id,
                comment: commentContent
            })
            if (response.status === 201) {
                const response = await axios.get(`http://localhost:5005/project/${projectId}`)
                setAllComments(response.data.comments)
                setCommentContent("")
            }
        } catch (error) {
            console.error(error)
        }
    }

    //TODO populate user from each comment
    // const populateUserComment = async (commentId) => {
    //     try {
    //         const response = await axios.get(`http://localhost:5005/project/${projectId}/comment/${commentId}`)

    //         return response.userId.username
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const fetchProject = async () => {
        try {
            const response = await axios.get(`http://localhost:5005/project/${projectId}`)
            if (response.status === 200) {
                setCurrentProject(response.data)
                setAllComments(response.data.comments)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProject()
    }, [])

    if (!currentProject) {
        return <p>Loading...</p>
    }

    const { title, description, technologies, repositoryLink, projectFolder, userId, comments } = currentProject
    return (
        <>
            <h2>Project : {title}</h2>
            <p>{description}</p>
            <ul>
                {technologies.map(technology =>
                    <li key={technology}>{technology}</li>)}
            </ul>
            <Link to={repositoryLink}>Link to repo</Link>
            <Link to={projectFolder}>Download project</Link>
            <p>Creator: {userId.username}</p>
            <div className="comments_section">
                {comments.map(comment => {
                    return (
                        <div key={comment._id} className="one_comment" style={{ border: "solid teal 2px" }}>
                            <p>From {comment.userId}</p>
                            <p>{comment.comment}</p>
                            <p>{comment.date}</p>
                        </div>
                    )
                })}
            </div>
            <div className="new_comment"><p>Add new comment</p>
                <form onSubmit={handleNewComment}>
                    <label>Comment :
                        <input type="text" value={commentContent} onChange={e => setCommentContent(e.target.value)} />
                    </label>
                    <button type="submit">Post</button>
                </form>
            </div>
        </>
    )
}

export default Project