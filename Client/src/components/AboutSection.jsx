import { Briefcase, Code, Download, User } from "lucide-react";
import React, { useState } from "react";
import { BorderBeam } from "./magicui/border-beam";
import Modal from "./Modal";


const cardData = [
  {
    icon: <User className="h-10 w-10 text-primary mb-4" />, 
    title: "Support & Community",
    desc: "You are not alone. Connect with others, share your story, and find encouragement in a supportive community.",
    modalContent: (
      <>
        <p>Our community is a safe and welcoming space where you can freely share your experiences, challenges, and victories without fear of judgment. Whether you’re looking for encouragement, advice, or simply a listening ear, you’ll find people here who truly understand.

Connect with others through interactive forums, engaging group chats, and supportive virtual events designed to help you feel less alone. You’ll have opportunities to learn from shared stories, discover helpful coping strategies, and offer encouragement to others who may be walking a similar path.</p>
      </>
    )
  },
  {
    icon: <Code className="h-10 w-10 text-primary mb-4" />, 
    title: "Resources & Tips",
    desc: "Access helpful articles, coping strategies, and expert advice to nurture your mental well-being every day.",
    modalContent: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Guided meditations and mindfulness exercises</li>
          <li>Expert articles on stress, anxiety, and self-care</li>
          <li>Daily tips for building healthy  habits</li>
        </ul>
      </>
    )
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary mb-4" />, 
    title: "Professional Guidance",
    desc: "Find information on reaching out to mental health professionals and taking the first step toward healing.",
    modalContent: (
      <>
        <p>Learn how to find a therapist, what to expect from your first session, and how to access affordable professional help. We provide resources for both in-person and online counseling options.</p>
      </>
    )
  },
];

const AboutSection = () => {
  const [openModal, setOpenModal] = useState(null);
  return (
    <section id="about" className="py-24 px-4 relative ">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-primary-font">
          About <span className="text-primary">Mental Health</span>
        </h2>
        <p className="text-lg md:text-xl text-primary-font mb-12 text-center max-w-7xl mx-auto">
          Mental health issues such as stress, anxiety, and depression are on the rise globally, especially among students and young adults. Unfortunately, many people still lack access to affordable mental health resources, awareness, and support systems. Traditional solutions like counseling centers and helplines are often underutilized due to stigma, limited awareness, or accessibility barriers.There is a growing need for an easily accessible digital platform that provides reliable information, self-help tools, and simple ways for users to track their mental well-being. Mental health is a vital part of our overall well-being, shaping how we think, feel, and act. It influences how we handle stress, relate to others, and make decisions. By prioritizing mental health, we can lead more fulfilling lives, build stronger relationships, and better cope with life’s challenges. Above all, it is important to remember that seeking support is a sign of strength—not weakness.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardData.map((card, idx) => (
            <div
              key={card.title}
              className="relative gradient-border p-6 card-hover bg-white/80 dark:bg-gray-900/60 rounded-xl shadow-lg flex flex-col items-center cursor-pointer transition hover:scale-105"
              onClick={() => setOpenModal(idx)}
            >
              {card.icon}
              <h4 className="font-semibold text-xl mb-2">{card.title}</h4>
              <p className="text-muted-foreground text-center">{card.desc}</p>
              <BorderBeam duration={5 + idx * 2} size={300} className="from-transparent via-primary to-primary" borderWidth={5 + (idx === 0 ? 0 : 2)} />
            </div>
          ))}
        </div>
        <Modal
          isOpen={openModal !== null}
          onClose={() => setOpenModal(null)}
          title={openModal !== null ? cardData[openModal].title : ""}
        >
          {openModal !== null && cardData[openModal].modalContent}
        </Modal>
      </div>
    </section>
  );
};

export default AboutSection;
