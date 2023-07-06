import './CommentsTextArea.scss';

// -------------CONTEXT
import AuthContext from '../../context/AuthContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';


const CommentsTextArea = ({ comments, submitComment }) => { //az CourseInfo.jsx miad

  // body & score ro mifrestim dar btn submitComment
  const [newCommentBody, setNewCommentBody] = useState('')
  const [score, setScore] = useState(1)

  // -------------context
  const authContext = useContext(AuthContext)

  const onChangeBodyComment = (e) => {
    setNewCommentBody(e.target.value)
  }

  const onChangeScoreComment = (e) => {
    setScore(e.target.value)
  }

  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-icon-content">
          <i className="comments__header-icon far fa-comment"></i>
        </div>
        <span className="comments__header-title">نظرات</span>
      </div>
      <div className="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning link-11">
            هنوز کامنتی برای این دوره ثبت نشده
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <div className="comments__item" key={comment._id}>
                <div className="comments__question">
                  <div className="comments__question-header">
                    <div className="comments__question-header-right">
                      <span className="comments__question-name comment-name">
                        {comment.creator.name}
                      </span>
                      <span className="comments__question-status comment-status">
                        {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                      </span>
                      <span className="comments__question-date comment-date">
                        {comment.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="comments__question-header-left">
                      <a
                        className="comments__question-header-link comment-link"
                        href="#"
                      >
                        پاسخ
                      </a>
                    </div>
                  </div>
                  <div className="comments__question-text">
                    <p className="comments__question-paragraph comment-paragraph">
                      {comment.body}
                    </p>
                  </div>
                  {/* answer comment */}
                  {
                    comment.answerContent && (
                      <div className="comments__item" key={comment.answerContent._id}>
                        <div className="comments__question">
                          <div className="comments__question-header">
                            <div className="comments__question-header-right">
                              <span className="comments__question-name comment-name">
                                {comment.answerContent.creator.name}
                              </span>
                              <span className="comments__question-status comment-status">
                                {comment.answerContent.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                              </span>
                              <span className="comments__question-date comment-date">
                                {comment.answerContent.createdAt.slice(0, 10)}
                              </span>
                            </div>
                            <div className="comments__question-header-left">
                              <a
                                className="comments__question-header-link comment-link"
                                href="#"
                              >
                                پاسخ
                              </a>
                            </div>
                          </div>
                          <div className="comments__question-text">
                            <p className="comments__question-paragraph comment-paragraph">
                              {comment.answerContent.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            ))}
            {/* <div className="comments__pagantion">
              <ul className="comments__pagantion-list">
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    <i className="fas fa-long-arrow-alt-right comments__pagantion-icon"></i>
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    1
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    2
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a
                    href="#"
                    className="comments__pagantion-link comments__pagantion-link--active"
                  >
                    3
                  </a>
                </li>
              </ul>
            </div> */}
          </>
        )}
      </div>

      {
        authContext.isLoggedIn ?
          (
            <>
              <div className="comments__rules">
                <span className="comments__rules-title">قوانین ثبت دیدگاه</span>
                <span className="comments__rules-item">
                  <i className="fas fa-check comments__rules-icon"></i>
                  اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش انلاین
                  استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
                </span>
                <span className="comments__rules-item">
                  <i className="fas fa-check comments__rules-icon"></i>
                  دیدگاه های نامرتبط به دوره تایید نخواهد شد.
                </span>
                <span className="comments__rules-item">
                  <i className="fas fa-check comments__rules-icon"></i>
                  سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
                </span>
                <span className="comments__rules-item">
                  <i className="fas fa-check comments__rules-icon"></i>
                  از درج دیدگاه های تکراری پرهیز نمایید.
                </span>
              </div>
              <div className="comments__respond">
                <div className="comments__score">
                  <span className="comments__score-title">امتیاز شما</span>
                  <div className="comments__score-input">
                    <select className="comments__score-input-text" onChange={onChangeScoreComment} value={score}>
                      <option name="1" id="">1</option>
                      <option name="2" id="">2</option>
                      <option name="3" id="">3</option>
                      <option name="4" id="">4</option>
                      <option name="5" id="">5</option>
                    </select>
                    {/* <i className="fas fa-angle-down	 comments__input-icon"></i> */}
                  </div>
                </div>
                <div className="comments__respond-content">
                  <div className="comments__respond-title">دیدگاه شما *</div>
                  <textarea
                    className="comments__score-input-respond"
                    value={newCommentBody}
                    onChange={onChangeBodyComment}
                  >
                    {newCommentBody}
                  </textarea>
                </div>
                <button type="submit" className="comments__respond-btn" onClick={() => submitComment(newCommentBody, score)}>
                  ارسال
                </button>
              </div>
            </>

          )
          :
          (
            <div className="alert alert-warning alert-11">
              &nbsp;برای ثبت نظر
              <Link to='/login' className='link-11'>
                &nbsp;ورود&nbsp;
              </Link>
              کنید
            </div>
          )
      }
    </div>
  )
}

export default CommentsTextArea;