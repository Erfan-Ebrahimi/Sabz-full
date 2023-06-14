import './CommentsTextArea.scss';

const CommentsTextArea = () => {
  return (
    <div className="comments">
        <span className="comments__title">
          دیدگاهتان را بنویسید
        </span>
        <span className="comments__text">
          <a href="#" className='comments__text-a1'>
            با عنوان محمدامین سعیدی راد 
          وارد شده اید.
          </a>
           <a href="#" className='comments__text-a2'>خارج میشوید ؟ </a>
          بخش های موردنیاز علامت گذاری شده اند *
        </span>
        <div className="comments_content">
          <span className="comments__content-title">دیدگاه *</span>
          <textarea className="comments__content-textarea"></textarea>
        </div>
        <button type="submit" className="comments__button">فرستادن دیدگاه</button>
    </div>
  )
}

export default CommentsTextArea;