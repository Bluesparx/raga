import React from 'react';

const AboutUs = () => {
  return (
    <div style={{backgroundColor:'black', color:'white'}} className="p-6 max-w-3xl mx-auto font-sans text-gray-800">
      <h1 className="text-center text-4xl font-bold mb-10">About Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          At <strong>Zen Zone</strong>, our mission is to promote mental well-being and empower individuals on their journey to mental health. We believe that everyone deserves access to the tools and support needed to navigate life's challenges and foster emotional resilience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="text-lg leading-relaxed">
          <strong>Zen Zone</strong> is a dedicated team of mental health professionals, developers, and advocates who are passionate about making mental health resources accessible to all. We understand the importance of mental well-being and are committed to creating a safe and supportive space where individuals can express themselves freely and seek help without stigma.
        </p>
      </section>

      <section className="mb-8">
  <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
  <div className="text-lg leading-relaxed">
    <p className="mb-4">
      <strong>Mood Tracking:</strong> Our intuitive mood logger allows users to track their feelings over time, helping to identify patterns and triggers.
    </p>
    <p className="mb-4">
      <strong>Joke Generators:</strong> Laughter is a powerful tool for mental health. Our generators provide a fun and light-hearted way to uplift your mood.
    </p>
    <p className="mb-4">
      <strong>Mood Calendar:</strong> Visualize your emotional journey with our mood calendar, helping you to reflect on your mental health over time.
    </p>
    <p className="mb-4">
      <strong>Resources and Support:</strong> Access curated articles, tips, and tools to enhance your mental well-being and connect with professionals when needed.
    </p>
  </div>
</section>


     
    </div>
  );
};

export default AboutUs;
