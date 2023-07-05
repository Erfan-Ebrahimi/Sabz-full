import { useEffect, useState } from "react";
import './Comments.scss';
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";


const Comments = () => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getAllComments();
    }, []);

    // ----------get all comments
    function getAllComments() {
        fetch("http://localhost:4000/v1/comments")
            .then((res) => res.json())
            .then((allComments) => setComments(allComments));
    }

    // -----remove a comment
    const removeComment = (commentID) => {
        swal({
            title: "آیا از حذف کامنت اطمینان دارید؟",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/comments/${commentID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                            }`,
                    },
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "کامنت مورد نظر با موفقیت حذف شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => getAllComments());
                    }
                });
            }
        });
    };

    // ----------show comments body
    const showCommentBody = (commentBody) => {
        swal({
            title: commentBody,
            buttons: "اوکی",
        });
    };

    // ------BAN a user
    const banUser = (userID) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        swal({
            title: "آیا از بن مطمعنی؟",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorageData.token}`,
                    },
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "کاربر با موفقیت بن شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => getAllComments());
                    }
                });
            }
        });
    };


    return (

        <DataTable title="کامنت‌ها">
            <table className="table">
                <thead>
                    <tr>
                        <th>شناسه</th>
                        <th>کاربر</th>
                        <th>دوره</th>
                        <th>مشاهده</th>
                        <th>پاسخ</th>
                        <th>ویرایش</th>
                        <th>حذف</th>
                        <th>بن</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={comment._id}>
                            <td className={comment.answer === 1 ? "answer-comment" : 'no-answer-comment'}>{index + 1}</td>
                            <td>{comment.creator.name}</td>
                            <td>{comment.course}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-info edit-btn"
                                    onClick={() => showCommentBody(comment.body)}
                                >
                                    مشاهده
                                </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-primary edit-btn">
                                    پاسخ
                                </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-success edit-btn">
                                    ویرایش
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger delete-btn"
                                    onClick={() => removeComment(comment._id)}
                                >
                                    حذف
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-ban delete-btn"
                                    onClick={() => banUser(comment.creator._id)}
                                >
                                    بن
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </DataTable>
    )
}

export default Comments;