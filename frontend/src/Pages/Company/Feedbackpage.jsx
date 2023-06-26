import React from 'react';
import Feedback from '../../Components/Company/Feedback/Feedback';
import Header from '../../Components/Common/Header/Header';
import Footer from '../../Components/Common/Footer/Footer';

export default function FeedbackPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1,  display: 'flex', justifyContent: 'center', minHeight: 'calc(100vh - 8rem)',minHeight: '70vh'  }}>
        <Feedback />
      </div>
      <Footer />
    </div>
  );
}
