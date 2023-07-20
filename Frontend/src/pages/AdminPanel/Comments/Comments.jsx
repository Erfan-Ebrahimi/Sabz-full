import { useEffect, useState } from "react";
import './Comments.scss';
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import Swal from "sweetalert2";


const Comments = () => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        getAllComments();
    }, []);

    // ----------get all comments
    function getAllComments() {
        fetch("http://localhost:4000/v1/comments")
            .then((res) => res.json())
            .then((allComments) => {
                setComments(allComments)
            });
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
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
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

    // ---------answer a comment
    const answerToComment = (commentID, commentBody) => {
        Swal.fire({
            title: commentBody,
            input: 'text',
            inputLabel: 'پاسخ را وارد کنید...',
            icon: 'info',
            customClass: 'swal-wide',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ارسال',
            cancelButtonText: 'بستن',
            cancelButtonColor: '#d33',
            inputValidator: (value) => {
                if (!value) {
                    return 'پاسخ را بنویسید'
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const commentAnswerBody = {
                    body: result.value
                }
                fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(commentAnswerBody)
                }).then(res => {
                    if (res.ok) {
                        res.json()
                        Swal.fire({
                            icon: 'success',
                            title: 'پاسخ با موفقیت ارسال شد',
                            customClass: 'swal-wide',
                            showConfirmButton: true,
                            timer: 1500
                        }).then(ok => getAllComments())
                    }
                }).then(result => console.log(result))
            }
        })

    }

    // --------accept a comment
    const acceptComment = (commentID) => {
        swal({
            title: "آیا از تایید کامنت اطمینان دارید",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                    },
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "کامنت مورد نظر با موفقیت تایید شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => {
                            getAllComments();
                        });
                    }
                });
            }
        });
    };

    //----------reject a comment
    const rejectComment = (commentID) => {
        swal({
            title: "آیا از رد کامنت اطمینان دارید",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                    },
                    body: JSON.stringify({ body: 'd' })
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "کامنت مورد نظر با موفقیت رد شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => {
                            getAllComments();
                        });
                    }
                });
            }
        });
    };

    // ------edit comment
    const editComment = () => {
        swal({
            title: 'این بخش در حال توسعه می باشد',
            icon: 'success',
            buttons: 'اوکی'
        })
    }
    return (

        <DataTable title="کامنت‌ها">
            <table className="table">
                <thead>
                    <tr>
                        <th>شناسه</th>
                        <th>کاربر</th>
                        <th>دوره</th>
                        <th>امتیاز</th>
                        <th>مشاهده</th>
                        <th>پاسخ</th>
                        <th>تایید / رد</th>
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
                                {
                                    Array(5 - comment.score).fill(0).map((item, index) => (
                                        <img key={index} src="/assets/images/svgs/star.svg" alt="" />
                                    ))
                                }
                                {
                                    Array(comment.score).fill(0).map((item, index) => (
                                        <img key={index} src="/assets/images/svgs/star_fill.svg" alt="" />
                                    ))
                                }
                            </td>
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
                                <button
                                    type="button"
                                    className="btn btn-primary edit-btn"
                                    onClick={() => answerToComment(comment._id, comment.body)}
                                >
                                    پاسخ
                                </button>
                            </td>
                            {
                                comment.answer === 1 ?
                                    (
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger edit-btn"
                                                onClick={() => rejectComment(comment._id)}
                                            >
                                                رد
                                            </button>
                                        </td>
                                    )
                                    :
                                    (
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-success edit-btn"
                                                onClick={() => acceptComment(comment._id)}
                                            >
                                                تایید
                                            </button>
                                        </td>
                                    )
                            }

                            <td>
                                <button type="button" className="btn btn-success edit-btn" onClick={editComment}>
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