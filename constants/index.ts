// Testimonials data
export interface TestimonialData {
  name: string;
  position: string;
  quote: string;
  profileImage: string;
  rating: number;
  isVerified: boolean;
}

export const testimonials: TestimonialData[] = [
  {
    name: 'Withan',
    position: 'Professional',
    quote:
      "I'm not a fan of having my picture taken but Loudroudboy made it so easy. He has a way of making everyone feel comfortable and at ease, and the photos came out amazing. I can't recommend him highly enough!",
    profileImage: '/Ellipse 4.svg',
    rating: 5,
    isVerified: true,
  },
  {
    name: 'Jane Watson',
    position: 'Bride',
    quote:
      'I was so impressed with the detail and editing. These pictures were even better than those from huge, high-budget artists. The investment was absolutely worth it!',
    profileImage: '/Ellipse 4 (1).svg',
    rating: 5,
    isVerified: true,
  },
  {
    name: 'Kylie Smith',
    position: 'Fiance',
    quote:
      'Loudroudboy was utterly amazing in every way. The process was highly organized, and he was so meticulous with all the details and preparations needed. I literally just had to show up and have fun. Best experience!',
    profileImage: '/Ellipse 4 (2).svg',
    rating: 5,
    isVerified: true,
  },
];

export const testimonialConcerns: string[] = [
  "I'm not comfortable in front of the camera, and I'll probably look awkward.",
  "I'm not sure a professional photoshoot is worth the investment.",
  "The process looks too complicated and I'm too busy to manage it.",
];
