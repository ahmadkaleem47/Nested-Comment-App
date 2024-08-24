import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { handleDelete, handleReply } from "../../features/comment/commentSlice";
import { v4 as uuidv4 } from "uuid";
import { GoReply } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineReply } from "react-icons/md";

const Comment = ({ data }) => {
  const { commentRecord } = useSelector((store) => store.comment);
  const [like, setLike] = useState(false);
  const [replyOn, setReplyOn] = useState(false);
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();

  const handleLike = () => {
    setLike(!like);
  };

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

  const hanldleReplySubmit = () => {
    if (reply !== "") {
      const random = Math.floor(Math.random() * 5);
      console.log(random);
      dispatch(
        handleReply({
          text: reply,
          id: uuidv4(),
          profile: profiles?.[random],
          parentId: data.id,
          child: false,
        })
      );
      setReply("");
      setReplyOn(false);
    }
  };

  return (
    <div>
      <div className="bg-gray-700 w-full mb-2 rounded-xl px-4 py-2 animate-fade-right animate-once animate-duration-1000 animate-delay-0 animate-ease-in-out animate-normal animate-fill-both">
        <div className="flex justify-start items-start gap-x-2">
          <img
            alt={data?.profile?.name}
            src={data?.profile?.src}
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col gap-y-1 mt-2">
            <div className="text-white tracking-wider">
              {data?.profile?.name}
            </div>

            <div className="text-white font-light">{data?.text}</div>
            {replyOn ? (
              <div className="flex justify-start items-start gap-1">
                <input
                  type="text"
                  className="sm:w-[400px] w-[150px] px-2 text-white border-b bg-transparent py-1 outline-none"
                  value={reply}
                  placeholder="Type Reply...."
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      hanldleReplySubmit();
                    }
                  }}
                  autoFocus
                />
                <div className="flex justify-center items-center gap-x-3 mt-2">
                  <button onClick={() => hanldleReplySubmit()}>
                    <MdOutlineReply color="white" size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setReplyOn(false);
                      setReply("");
                    }}
                  >
                    <RxCross2 color="white" size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-start items-start gap-4 mt-2">
                <button onClick={() => handleLike()}>
                  {!like ? (
                    <CiHeart color="white" size={21} />
                  ) : (
                    <FaHeart color="white" size={20} />
                  )}
                </button>
                <button onClick={() => setReplyOn(true)}>
                  <GoReply color="white" size={20} />
                </button>
                <button
                  onClick={() =>
                    dispatch(handleDelete({ id: data.id, child: data.child }))
                  }
                >
                  <RiDeleteBin6Fill color="white" size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {data.child && (
        <div style={{ paddingLeft: 25 }}>
          {commentRecord.map((reply) => {
            return (
              reply.parentId === data.id && (
                <Comment key={reply.id} data={reply} />
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
