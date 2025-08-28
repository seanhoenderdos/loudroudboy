import React from 'react';
import Card from './Card';

const Bento: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
      {/* Top Card - Full width with image only */}
      <Card
        className="lg:col-span-3 object-cover"
        image="/awkward.jpg"
        imageAlt="Person looking awkward"
      />

      {/* Bottom Left Card - Stress about photoshoots */}
      <Card className="lg:col-span-1 p-6">
        <p className="text-white text-lg leading-relaxed">
          The thought of a photoshoot can be stressful. You worry about feeling
          stiff, your kids not cooperating, or the photos looking forced and
          unnatural.
        </p>
      </Card>

      {/* Bottom Middle Card - Fleeting memories */}
      <Card className="lg:col-span-1 p-6">
        <p className="text-white text-lg leading-relaxed">
          Those beautiful memories are fleeting, and the thought of having
          blurry or unflattering pictures of these precious moments can be a
          huge disappointment. You can't get those memories back.
        </p>
      </Card>

      {/* Bottom Right Card - Mission statement */}
      <Card className="lg:col-span-1 p-6">
        <p className="text-white text-lg leading-relaxed">
          Our mission is to make the experience fun, stress-free, and natural.
          With Loudroudboy Photography, you'll be so comfortable you'll forget
          you're even in front of a camera. The result? Stunning, authentic
          images you'll treasure for a lifetime.
        </p>
      </Card>
    </div>
  );
};

export default Bento;
