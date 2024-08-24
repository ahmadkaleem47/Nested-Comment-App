import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Comment from "./comment";
import { v4 as uuidv4 } from "uuid";
import { handleComment } from "../../features/comment/commentSlice";
import { IoMdSend } from "react-icons/io";

const profiles = [
  { name: "Elon Musk", src: "https://i.redd.it/tm7ced4yniib1.jpg" },
  {
    name: "Jeff Bezos",
    src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT56TmMRi1_9KnGuG1BTTxrL1YPKIkwNgD4_HW5yrPUtPcz2RUA",
  },
  {
    name: "Bill Gates",
    src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT2w_bADOkCd-crL7kYomj8CG7bvFyk3iFF_3iTaPp8B6UlQ5e1MB5kkpDrgqCjmRFPqftVfTpRvmL5Qt33ARxqj5FKwHZPBYgGBDOwxw",
  },
  {
    name: "Warren Buffett",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-iE_tQAmUGJ_4J4C3HTflkMD5C61GYkKgd7fP0-NhuoO9iPd",
  },
  {
    name: "Jack Ma",
    src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRkJ1YuT4NeBxSO6Tss4Fg4HBrgJYiAnU74acifpzAJEAnHhNr9",
  },
];


const Comments = () => {
  const { commentRecord } = useSelector((store) => store.comment);
  const [commented, setCommented] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commented !== "") {
      const random = Math.floor(Math.random() * 5);
      dispatch(
        handleComment({
          text: commented,
          id: uuidv4(),
          parentId: null,
          profile: profiles?.[random],
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
		<p className="text-sm text-center">(A task-based application leveraging recursion to implement infinite threading)</p>	
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
            comm.parentId === null && <Comment profiles={profiles} key={comm.id} data={comm} />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
