import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { handleDelete, handleReply } from "../../features/comment/commentSlice";
import { v4 as uuidv4 } from "uuid";

const Comment = ({ data }) => {
	const { commentRecord } = useSelector((store) => store.comment);
	const [like, setLike] = useState("Like");
	const [replyOn, setReplyOn] = useState(false);
	const [reply, setReply] = useState("");
	const dispatch = useDispatch();

	const handleLike = () => {
		if (like === "👍") {
			setLike("Like");
		} else {
			setLike("👍");
		}
	};

	const hanldleReplySubmit = () => {
		if (reply !== "") {
			dispatch(
				handleReply({
					text: reply,
					id: uuidv4(),
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
			<div className="bg-slate-200 w-full h-[100px] mb-2 rounded-xl px-4 py-2 border-2 border-white shadow-sm shadow-white animate-fade-right animate-once animate-duration-1000 animate-delay-0 animate-ease-in-out animate-normal animate-fill-both">
				<h3>{data.text}</h3>
				{replyOn ? (
					<div className="flex justify-start items-start mt-4 gap-1">
						<input
							type="text"
							className="sm:w-[400px] w-[150px] px-2 py-1 rounded-lg"
							value={reply}
							placeholder="Write your reply"
							onChange={(e) => setReply(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									hanldleReplySubmit();
								}
							}}
							autoFocus
						/>
						<button
							className="px-3 text-[10px] py-1.5 border-2 rounded-xl bg-blue-700 border-white text-white hover:text-blue-700 hover:bg-transparent hover:border-blue-700 transition-all ease-in-out duration-300"
							onClick={() => hanldleReplySubmit()}
						>
							Ok
						</button>
						<button
							className="px-3 py-1.5 text-[10px] border-2 rounded-xl bg-red-700 border-white text-white hover:text-red-700 hover:bg-transparent hover:border-red-700 transition-all ease-in-out duration-300"
							onClick={() => {
								setReplyOn(false);
								setReply("");
							}}
						>
							cancel
						</button>
					</div>
				) : (
					<div className="flex justify-start items-start mt-4 gap-1">
						<button
							className="px-3 py-1.5 text-[10px] border-2 rounded-xl bg-blue-700 border-white text-white hover:text-blue-700 hover:bg-transparent hover:border-blue-700 transition-all ease-in-out duration-300"
							onClick={() => handleLike()}
						>
							{like}
						</button>
						<button
							className="px-3 py-1.5 text-[10px] border-2 rounded-xl bg-blue-700 border-white text-white hover:text-blue-700 hover:bg-transparent hover:border-blue-700 transition-all ease-in-out duration-300"
							onClick={() => setReplyOn(true)}
						>
							Reply
						</button>
						<button
							className="px-3 py-1.5 text-[10px] border-2 rounded-xl bg-red-700 border-white text-white hover:text-red-700 hover:bg-transparent hover:border-red-700 transition-all ease-in-out duration-300"
							onClick={() =>
								dispatch(handleDelete({ id: data.id, child: data.child }))
							}
						>
							Delete
						</button>
					</div>
				)}
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
