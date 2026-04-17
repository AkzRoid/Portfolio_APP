import { useEffect } from 'react';

function ContactPage() {
  useEffect(() => {
    document.title = 'Contact';
  }, []);

  return (
    <div className='contact-page'>
      <div className='register-container'>
        <div className='register-box'>
          <h1>Contact Me</h1>
          <form id='contact-form' noValidate>
            <div className='form-group'>
              <label htmlFor='name'>Full Name</label>
              <input type='text' id='name' name='name' required />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' name='email' required />
            </div>
            <div className='form-group'>
              <label htmlFor='subject'>Subject</label>
              <input type='text' id='subject' name='subject' required />
            </div>
            <div className='form-group'>
              <label htmlFor='message'>Message</label>
              <textarea id='message' name='message' rows={5} required defaultValue='' />
            </div>
            <div className='error' id='contact-error' aria-live='polite' />
            <button type='submit' className='btn-register'>Send Message</button>
          </form>
          <a href='/home' className='btn-back'>Back to Home</a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
