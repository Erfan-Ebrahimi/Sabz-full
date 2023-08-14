import './CommentsTextArea.scss';

// -------------CONTEXT
import AuthContext from '../../context/AuthContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';


const CommentsTextArea = ({ comments, submitComment }) => { //az CourseInfo.jsx miad

  // body & score ro mifrestim dar btn submitComment
  const [newCommentBody, setNewCommentBody] = useState('')
  const [score, setScore] = useState(5)

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
          <div className="bg-warning link-11">
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
                    <div>
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
                    </div>
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
                    <select className="comments__score-input-text" onChange={onChangeScoreComment} value={score}>
                      <option value="5">عالی</option>
                      <option value="4">خوب</option>
                      <option value="3">متوسط</option>
                      <option value="2">ضعیف</option>
                      <option value="1">خیلی ضعیف</option>
                    </select>
                </div>
                <div className="comments__respond-content">
                  <div className="comments__respond-title">دیدگاه شما *</div>
                  <textarea
                    className="comments__score-input-respond"
                    value={newCommentBody}
                    onChange={onChangeBodyComment}
                    placeholder='نظر خود را بنویسید . . .'
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