import "./comments.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Comment from "./comment";
import { v4 as uuidv4 } from "uuid";
import { handleComment } from "../../features/comment/commentSlice";

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
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					<div className="text-[30px] font-[1000] text-white mb-3 text-center">
						Infinitly Nested Comment Applicatio
					</div>
				</label>
				<input
					type="text"
					value={commented}
					className="sm:w-[400px] w-[200px] p-2 rounded-lg sm:ml-0 ml-4"
					placeholder="Add new comment"
					autoFocus
					onChange={(e) => setCommented(e.target.value)}
				/>
				<button className="px-4 py-1.5 border-2 rounded-full ml-2 text-white hover:text-slate-700 hover:bg-white transition-all ease-in-out duration-300">
					Add
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
