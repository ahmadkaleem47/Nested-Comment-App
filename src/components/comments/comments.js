import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Comment from "./comment";
import { v4 as uuidv4 } from "uuid";
import { handleComment } from "../../features/comment/commentSlice";
import { IoMdSend } from "react-icons/io";

const Comments = () => {
  const { commentRecord } = useSelector((store) => store.comment);
  const [commented, setCommented] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commented !== "") {
      dispatch(
        handleComment({
          text: commented,
          id: uuidv4(),
          parentId: null,
          child: false,
        })
      );
      setCommented("");
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center gap-y-2 text-white mb-3">
        <header className="text-[30px] font-[1000] text-center">
          Comment Cascade
        </header>
		<p className="text-sm">(A task-based application leveraging recursion to implement infinite threading)</p>	
      </div>
      <form
        className="flex justify-start items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={commented}
          className="sm:w-[400px] w-[150px] px-2 text-white border-b bg-transparent py-1 outline-none"
          placeholder="Type Comment..."
          autoFocus
          onChange={(e) => setCommented(e.target.value)}
        />
        <button>
          <IoMdSend color="white" size={25} />
        </button>
      </form>
      <div className="mt-3">
        {commentRecord.map((comm) => {
          return (
            comm.parentId === null && <Comment key={comm.id} data={comm} />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
