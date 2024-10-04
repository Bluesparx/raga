import React from 'react';

const AboutUs = () => {
  return (
    <div className=" text-white p-8 lg:p-12 max-w-4xl mx-auto font-sans">
      <h1 className="text-center text-4xl font-bold mb-12">About Us</h1>

      {/* Our Mission Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          At <strong className="text-violet-400">Zen Zone</strong>, our mission is to promote mental well-being and empower individuals on their journey to mental health. We believe that everyone deserves access to the tools and support needed to navigate life's challenges and foster emotional resilience.
        </p>
      </section>

      {/* Who We Are Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          <strong className="text-violet-400">Zen Zone</strong> is a dedicated team of mental health professionals, developers, and advocates who are passionate about making mental health resources accessible to all. We understand the importance of mental well-being and are committed to creating a safe and supportive space where individuals can express themselves freely and seek help without stigma.
        </p>
      </section>

      {/* What We Offer Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">What We Offer</h2>
        <div className="text-lg leading-relaxed text-gray-300 space-y-6">
          <p>
            <strong className="text-violet-400">Mood Tracking:</strong> Our intuitive mood logger allows users to track their feelings over time, helping to identify patterns and triggers.
          </p>
          <p>
            <strong className="text-violet-400">Joke Generators:</strong> Laughter is a powerful tool for mental health. Our generators provide a fun and light-hearted way to uplift your mood.
          </p>
          <p>
            <strong className="text-violet-400">Mood Calendar:</strong> Visualize your emotional journey with our mood calendar, helping you to reflect on your mental health over time.
          </p>
          <p>
            <strong className="text-violet-400">Resources and Support:</strong> Access curated articles, tips, and tools to enhance your mental well-being and connect with professionals when needed.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;