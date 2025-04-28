import type React from "react"
import type { Category } from "@/lib/types"
import {
  Dumbbell,
  Users,
  Briefcase,
  MessageSquare,
  BookOpen,
  DollarSign,
  Zap,
  Award,
  Target,
  Lightbulb,
  Clock,
  Heart,
  Shield,
  Compass,
  Rocket,
} from "lucide-react"

// Helper function to get icon based on name
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "dumbbell.svg": <Dumbbell />,
    "users.svg": <Users />,
    "briefcase.svg": <Briefcase />,
    "message-square.svg": <MessageSquare />,
    "book-open.svg": <BookOpen />,
    "dollar-sign.svg": <DollarSign />,
    "zap.svg": <Zap />,
    "award.svg": <Award />,
    "target.svg": <Target />,
    "lightbulb.svg": <Lightbulb />,
    "clock.svg": <Clock />,
    "heart.svg": <Heart />,
    "shield.svg": <Shield />,
    "compass.svg": <Compass />,
    "wildcard.svg": <Zap />,
  }

  return iconMap[iconName] || <Zap />
}

// Update the category colors to match the SVG icon colors
export const categories: Category[] = [
  {
    id: "mindset",
    name: "Mindset + Resilience",
    color: "#EF3F35", // Updated to match mindset.svg
    cards: [
      {
        id: "mindset-1",
        category: "Mindset + Resilience",
        title: "Momentum > Motivation",
        subtitle: "Start messy, but start.",
        backgroundColor: "#B2DFDB", // Light teal
        icon: <Rocket className="h-6 w-6" />,
        bulletPoints: [
          "Take one action today, no matter how small.",
          "Action creates clarity. Thinking alone creates doubt.",
          "Build micro-momentum; momentum builds itself.",
        ],
        quote: "Action is the foundational key to all success.",
        quoteAuthor: "Pablo Picasso",
      },
      {
        id: "mindset-2",
        category: "Mindset + Resilience",
        title: "Build Calluses, Not Walls",
        subtitle: "Strength comes from the struggle.",
        backgroundColor: "#B2DFDB", // Light teal
        icon: <Dumbbell className="h-6 w-6" />,
        bulletPoints: [
          "Reframe setbacks as growth training.",
          "Track your small wins — proof you're moving.",
          "Progress feels ugly before it looks good.",
        ],
        quote: "Strength does not come from winning. Your struggles develop your strengths.",
        quoteAuthor: "Arnold Schwarzenegger",
      },
      {
        id: "mindset-3",
        category: "Mindset + Resilience",
        title: "Stay in the Arena",
        subtitle: "Keep showing up, even when it's hard.",
        backgroundColor: "#B2DFDB", // Light teal
        icon: <Award className="h-6 w-6" />,
        bulletPoints: [
          "Consistency beats intensity every time.",
          "Your presence is a competitive advantage.",
          "Showing up is half the battle.",
        ],
        quote:
          "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better.",
        quoteAuthor: "Theodore Roosevelt",
      },
      {
        id: "mindset-4",
        category: "Mindset + Resilience",
        title: "Embrace Rejection",
        subtitle: "Each 'no' is a step toward 'yes'.",
        backgroundColor: "#B2DFDB", // Light teal
        icon: <Shield className="h-6 w-6" />,
        bulletPoints: [
          "Track rejections as progress metrics.",
          "Extract one learning from each 'no'.",
          "Celebrate the courage to put yourself out there.",
        ],
        quote: "Success is stumbling from failure to failure with no loss of enthusiasm.",
        quoteAuthor: "Winston Churchill",
      },
      {
        id: "mindset-5",
        category: "Mindset + Resilience",
        title: "Design Your Day",
        subtitle: "Structure creates freedom.",
        backgroundColor: "#B2DFDB", // Light teal
        icon: <Clock className="h-6 w-6" />,
        bulletPoints: [
          "Block 90-minute deep work sessions.",
          "Protect your peak energy hours for creation.",
          "End each day by planning the next.",
        ],
        quote: "Either you run the day or the day runs you.",
        quoteAuthor: "Jim Rohn",
      },
      {
        id: "mindset-6",
        category: "Mindset + Resilience",
        title: "Celebrate Tiny Wins",
        subtitle: "Micro-momentum builds macro-success.",
        backgroundColor: "#B2DFDB", // Light teal
        icon: <Target className="h-6 w-6" />,
        bulletPoints: [
          "Track wins, not just big milestones.",
          "Reward effort, not just outcomes.",
          "Confidence is built brick by brick.",
        ],
        quote: "Success is the sum of small efforts repeated day in and day out.",
        quoteAuthor: "Robert Collier",
      },
      {
        id: "mindset-7",
        category: "Mindset + Resilience",
        title: "Embrace the Messy Middle",
        subtitle: "The gap between vision and reality.",
        backgroundColor: "#B2DFDB", // Light teal
        icon: <Compass className="h-6 w-6" />,
        bulletPoints: [
          "Expect the dip; plan for it.",
          "Find joy in solving hard problems.",
          "Document your journey, not just destinations.",
        ],
        quote: "The middle is messy but it's also where the magic happens.",
        quoteAuthor: "Brené Brown",
      },
      {
        id: "mindset-8",
        category: "Mindset + Resilience",
        title: "Reframe Imposter Syndrome",
        subtitle: "You're not alone in feeling this way.",
        backgroundColor: "#B2DFDB", // Light teal
        icon: <Lightbulb className="h-6 w-6" />,
        bulletPoints: [
          "Collect evidence of your capabilities.",
          "Separate feelings from facts.",
          "Share your struggles with trusted allies.",
        ],
        quote:
          "The beauty of the impostor syndrome is you vacillate between extreme egomania and a complete feeling of: 'I'm a fraud! Oh God, they're on to me!'",
        quoteAuthor: "Tina Fey",
      },
    ],
  },
  {
    id: "networking",
    name: "Networking Moves",
    color: "#2D26EB", // Updated to match networking.svg
    cards: [
      {
        id: "networking-1",
        category: "Networking Moves",
        title: "Connections Over Applications",
        subtitle: "Build your future team now.",
        backgroundColor: "#E6C5E6", // Light purple
        icon: <Users className="h-6 w-6" />,
        bulletPoints: [
          "Reach out to 3 former colleagues with a real check-in.",
          "Offer help, insight, or curiosity first.",
          "Warm conversations lead to real opportunities.",
        ],
        quote: "Your network is your net worth.",
        quoteAuthor: "Porter Gale",
      },
      {
        id: "networking-2",
        category: "Networking Moves",
        title: "Coffee Chat Strategy",
        subtitle: "Make every meeting count.",
        backgroundColor: "#E6C5E6", // Light purple
        icon: <MessageSquare className="h-6 w-6" />,
        bulletPoints: [
          "Research thoroughly before reaching out.",
          "Prepare 3 specific questions only they can answer.",
          "Follow up with a thoughtful artifact or resource.",
        ],
        quote:
          "Networking is not about just connecting people. It's about connecting people with people, people with ideas, and people with opportunities.",
        quoteAuthor: "Michele Jennae",
      },
      {
        id: "networking-3",
        category: "Networking Moves",
        title: "Digital Presence",
        subtitle: "Be findable, be memorable.",
        backgroundColor: "#E6C5E6", // Light purple
        icon: <Compass className="h-6 w-6" />,
        bulletPoints: [
          "Audit your online presence through a recruiter's eyes.",
          "Share your design thinking, not just final work.",
          "Engage meaningfully with others' content weekly.",
        ],
        quote: "Your personal brand is what people say about you when you're not in the room.",
        quoteAuthor: "Jeff Bezos",
      },
      {
        id: "networking-4",
        category: "Networking Moves",
        title: "Reconnection Roadmap",
        subtitle: "Rekindle dormant relationships.",
        backgroundColor: "#E6C5E6", // Light purple
        icon: <Users className="h-6 w-6" />,
        bulletPoints: [
          "Reach out with a specific memory or appreciation.",
          "Share a relevant resource or opportunity.",
          "Be transparent about your current journey.",
        ],
        quote: "The currency of real networking is not greed but generosity.",
        quoteAuthor: "Keith Ferrazzi",
      },
      {
        id: "networking-5",
        category: "Networking Moves",
        title: "Relationship Rituals",
        subtitle: "Consistency creates connection.",
        backgroundColor: "#E6C5E6", // Light purple
        icon: <Heart className="h-6 w-6" />,
        bulletPoints: [
          "Schedule monthly outreach to key contacts.",
          "Create a system to track meaningful details.",
          "Share wins and setbacks with your inner circle.",
        ],
        quote: "Relationships are built on small, consistent deposits of time and energy.",
        quoteAuthor: "Keith Ferrazzi",
      },
      {
        id: "networking-6",
        category: "Networking Moves",
        title: "Community Contribution",
        subtitle: "Give first, receive later.",
        backgroundColor: "#E6C5E6", // Light purple
        icon: <Users className="h-6 w-6" />,
        bulletPoints: [
          "Identify communities aligned with your goals.",
          "Contribute value before asking for anything.",
          "Position yourself as a connector of people.",
        ],
        quote: "The more you give away, the more comes back to you.",
        quoteAuthor: "Robin Sharma",
      },
      {
        id: "networking-7",
        category: "Networking Moves",
        title: "Mentorship Mindset",
        subtitle: "Learn from those ahead and behind.",
        backgroundColor: "#E6C5E6", // Light purple
        icon: <Lightbulb className="h-6 w-6" />,
        bulletPoints: [
          "Seek mentors for specific skills, not general guidance.",
          "Become a mentor to solidify your own knowledge.",
          "Create clear expectations for any mentoring relationship.",
        ],
        quote: "A mentor is someone who allows you to see the hope inside yourself.",
        quoteAuthor: "Oprah Winfrey",
      },
      {
        id: "networking-8",
        category: "Networking Moves",
        title: "Strategic Visibility",
        subtitle: "Be seen by the right people.",
        backgroundColor: "#E6C5E6", // Light purple
        icon: <Target className="h-6 w-6" />,
        bulletPoints: [
          "Identify the 20% of events that yield 80% of opportunities.",
          "Prepare a clear, compelling personal narrative.",
          "Follow up within 24 hours of meaningful connections.",
        ],
        quote: "It's not who you know, it's who knows you.",
        quoteAuthor: "Unknown",
      },
    ],
  },
  {
    id: "super-ic",
    name: "Being a Super IC",
    color: "#00619D", // Updated to match super-ic.svg
    cards: [
      {
        id: "super-ic-1",
        category: "Being a Super IC",
        title: "Build as a Super IC Designer",
        subtitle: "Lead smart. Execute sharp.",
        backgroundColor: "#E6938E", // Changed from Light teal
        icon: <Briefcase className="h-6 w-6" />,
        bulletPoints: [
          "Flex between strategic leadership and hands-on design.",
          "Model the work ethic you want around you.",
          "Stay close enough to the craft to keep evolving.",
        ],
        quote: "In a rapidly changing world, flexibility is the ultimate strength.",
        quoteAuthor: "Unknown",
      },
      {
        id: "super-ic-2",
        category: "Being a Super IC",
        title: "Craft Your Specialty",
        subtitle: "Be known for something specific.",
        backgroundColor: "#E6938E", // Changed from Light teal
        icon: <Target className="h-6 w-6" />,
        bulletPoints: [
          "Develop a signature approach to a specific design challenge.",
          "Create frameworks others can learn from and apply.",
          "Publish your methodology to establish expertise.",
        ],
        quote: "If you don't stand for something, you'll fall for anything.",
        quoteAuthor: "Malcolm X",
      },
      {
        id: "super-ic-3",
        category: "Being a Super IC",
        title: "Influence Without Authority",
        subtitle: "Lead through expertise, not title.",
        backgroundColor: "#E6938E", // Changed from Light teal
        icon: <Lightbulb className="h-6 w-6" />,
        bulletPoints: [
          "Make others successful through your design thinking.",
          "Translate design decisions into business outcomes.",
          "Build a coalition of supporters across departments.",
        ],
        quote: "Leadership is not about titles, positions, or flowcharts. It is about one life influencing another",
        quoteAuthor: "John C. Maxwell",
      },
      {
        id: "super-ic-4",
        category: "Being a Super IC",
        title: "Strategic Communication",
        subtitle: "Speak the language of stakeholders.",
        backgroundColor: "#E6938E", // Changed from Light teal
        icon: <MessageSquare className="h-6 w-6" />,
        bulletPoints: [
          "Frame design decisions in business terms.",
          "Tailor your message to each audience's priorities.",
          "Use data to support your creative intuition.",
        ],
        quote: "The single biggest problem in communication is the illusion that it has taken place.",
        quoteAuthor: "George Bernard Shaw",
      },
      {
        id: "super-ic-5",
        category: "Being a Super IC",
        title: "Manage Your Manager",
        subtitle: "Make their job easier.",
        backgroundColor: "#E6938E", // Changed from Light teal
        icon: <Briefcase className="h-6 w-6" />,
        bulletPoints: [
          "Understand their goals and pressures.",
          "Bring solutions, not just problems.",
          "Make their success part of your strategy.",
        ],
        quote: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
        quoteAuthor: "Stephen Covey",
      },
      {
        id: "super-ic-6",
        category: "Being a Super IC",
        title: "Continuous Learning Loop",
        subtitle: "Stay ahead of the curve.",
        backgroundColor: "#E6938E", // Changed from Light teal
        icon: <BookOpen className="h-6 w-6" />,
        bulletPoints: [
          "Dedicate 5 hours weekly to skill development.",
          "Create a learning roadmap aligned with industry trends.",
          "Apply new knowledge immediately to real projects.",
        ],
        quote:
          "The illiterate of the 21st century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn.",
        quoteAuthor: "Alvin Toffler",
      },
      {
        id: "super-ic-7",
        category: "Being a Super IC",
        title: "Cross-Functional Fluency",
        subtitle: "Speak multiple professional languages.",
        backgroundColor: "#E6938E", // Changed from Light teal
        icon: <Compass className="h-6 w-6" />,
        bulletPoints: [
          "Learn the basics of adjacent disciplines.",
          "Understand the constraints of engineering, product, and marketing.",
          "Build bridges between specialized teams.",
        ],
        quote: "The greatest value of a picture is when it forces us to notice what we never expected to see.",
        quoteAuthor: "John Tukey",
      },
      {
        id: "super-ic-8",
        category: "Being a Super IC",
        title: "Selective Ownership",
        subtitle: "Choose your battles wisely.",
        backgroundColor: "#E6938E", // Changed from Light teal
        icon: <Shield className="h-6 w-6" />,
        bulletPoints: [
          "Identify high-leverage projects that showcase your strengths.",
          "Say no to work that doesn't advance your goals.",
          "Create systems that scale your impact beyond your time.",
        ],
        quote:
          "The difference between successful people and very successful people is that very successful people say 'no' to almost everything.",
        quoteAuthor: "Warren Buffett",
      },
    ],
  },
  {
    id: "interviewing",
    name: "Interview Gameplans",
    color: "#8A3E16", // Updated to match interviewing.svg
    cards: [
      {
        id: "interviewing-1",
        category: "Interview Gameplans",
        title: "Own the Opening Minutes",
        subtitle: "Set the tone you want remembered.",
        backgroundColor: "#BBDEFB", // Light blue
        icon: <MessageSquare className="h-6 w-6" />,
        bulletPoints: [
          "Open with a 60-90 second career story that frames your future.",
          "Match your energy to your ambition.",
          "Anchor the conversation early with vision and clarity.",
        ],
        quote: "You never get a second chance to make a first impression.",
        quoteAuthor: "Will Rogers",
      },
      {
        id: "interviewing-2",
        category: "Interview Gameplans",
        title: "Portfolio Presentation",
        subtitle: "Show process, not just outcomes.",
        backgroundColor: "#BBDEFB", // Light blue
        icon: <BookOpen className="h-6 w-6" />,
        bulletPoints: [
          "Structure each case study as Problem → Approach → Solution → Impact.",
          "Highlight your unique contribution to team projects.",
          "Prepare 3 different time formats: 15, 30, and 45 minutes.",
        ],
        quote: "Design is not just what it looks like and feels like. Design is how it works.",
        quoteAuthor: "Steve Jobs",
      },
      {
        id: "interviewing-3",
        category: "Interview Gameplans",
        title: "Question Strategy",
        subtitle: "Ask what you need to decide.",
        backgroundColor: "#BBDEFB", // Light blue
        icon: <Lightbulb className="h-6 w-6" />,
        bulletPoints: [
          "Prepare questions that reveal company culture and values.",
          "Ask about specific challenges you'd tackle in your first 90 days.",
          "Inquire about how success is measured for this role.",
        ],
        quote: "Judge a man by his questions rather than by his answers.",
        quoteAuthor: "Voltaire",
      },
      {
        id: "interviewing-4",
        category: "Interview Gameplans",
        title: "Behavioral Interview Prep",
        subtitle: "Structure stories that sell your skills.",
        backgroundColor: "#BBDEFB", // Light blue
        icon: <MessageSquare className="h-6 w-6" />,
        bulletPoints: [
          "Prepare 5-7 stories that demonstrate different competencies.",
          "Use the STAR method: Situation, Task, Action, Result.",
          "Include quantifiable outcomes whenever possible.",
        ],
        quote: "Facts tell, but stories sell.",
        quoteAuthor: "Unknown",
      },
      {
        id: "interviewing-5",
        category: "Interview Gameplans",
        title: "Design Challenge Strategy",
        subtitle: "Show your thinking, not just solutions.",
        backgroundColor: "#BBDEFB", // Light blue
        icon: <Briefcase className="h-6 w-6" />,
        bulletPoints: [
          "Narrate your process out loud as you work.",
          "Ask clarifying questions before diving in.",
          "Explain tradeoffs in your approach and alternatives considered.",
        ],
        quote: "It's not just what it looks like and feels like. Design is how it works.",
        quoteAuthor: "Steve Jobs",
      },
      {
        id: "interviewing-6",
        category: "Interview Gameplans",
        title: "Interview Research Protocol",
        subtitle: "Know more than the basics.",
        backgroundColor: "#BBDEFB", // Light blue
        icon: <BookOpen className="h-6 w-6" />,
        bulletPoints: [
          "Study the company's recent product launches and strategic shifts.",
          "Research your interviewers' backgrounds and contributions.",
          "Understand the competitive landscape and market challenges.",
        ],
        quote: "Before everything else, getting ready is the secret of success.",
        quoteAuthor: "Henry Ford",
      },
      {
        id: "interviewing-7",
        category: "Interview Gameplans",
        title: "Remote Interview Excellence",
        subtitle: "Stand out through the screen.",
        backgroundColor: "#BBDEFB", // Light blue
        icon: <Compass className="h-6 w-6" />,
        bulletPoints: [
          "Test your tech setup 24 hours before the interview.",
          "Create a professional background with good lighting.",
          "Use notes strategically without breaking eye contact.",
        ],
        quote: "Success is where preparation and opportunity meet.",
        quoteAuthor: "Bobby Unser",
      },
      {
        id: "interviewing-8",
        category: "Interview Gameplans",
        title: "Follow-Up Framework",
        subtitle: "Continue the conversation strategically.",
        backgroundColor: "#BBDEFB", // Light blue
        icon: <MessageSquare className="h-6 w-6" />,
        bulletPoints: [
          "Send a personalized thank-you note within 24 hours.",
          "Reference specific conversation points to show engagement.",
          "Include a thoughtful resource related to a topic discussed.",
        ],
        quote: "The fortune is in the follow-up.",
        quoteAuthor: "Unknown",
      },
    ],
  },
  {
    id: "storytelling",
    name: "Storytelling + Brand",
    color: "#B63839", // Updated to match storytelling.svg
    cards: [
      {
        id: "storytelling-1",
        category: "Storytelling + Brand",
        title: "Your Story, Not Your Resume",
        subtitle: "Sell the journey, not the list.",
        backgroundColor: "#F0E68C", // Light yellow/khaki
        icon: <BookOpen className="h-6 w-6" />,
        bulletPoints: [
          "Frame each role with Problem → Solution → Impact.",
          "Highlight evolution, not just execution.",
          "Connect your story to the company's future.",
        ],
        quote: "The most powerful person in the world is the storyteller.",
        quoteAuthor: "Steve Jobs",
      },
      {
        id: "storytelling-2",
        category: "Storytelling + Brand",
        title: "Design Your Narrative",
        subtitle: "Connect the dots forward.",
        backgroundColor: "#F0E68C", // Light yellow/khaki
        icon: <Compass className="h-6 w-6" />,
        bulletPoints: [
          "Identify the consistent themes across your career changes.",
          "Frame transitions as deliberate growth, not random shifts.",
          "Practice your story until it feels natural, not rehearsed.",
        ],
        quote: "You can't connect the dots looking forward; you can only connect them looking backward.",
        quoteAuthor: "Steve Jobs",
      },
      {
        id: "storytelling-3",
        category: "Storytelling + Brand",
        title: "Portfolio Storytelling",
        subtitle: "Context creates connection.",
        backgroundColor: "#F0E68C", // Light yellow/khaki
        icon: <BookOpen className="h-6 w-6" />,
        bulletPoints: [
          "Start with the business problem, not the design brief.",
          "Show your thinking, not just your solutions.",
          "Quantify impact whenever possible.",
        ],
        quote: "Facts tell, stories sell.",
        quoteAuthor: "Unknown",
      },
      {
        id: "storytelling-4",
        category: "Storytelling + Brand",
        title: "Signature Strengths",
        subtitle: "Name what makes you unique.",
        backgroundColor: "#F0E68C", // Light yellow/khaki
        icon: <Award className="h-6 w-6" />,
        bulletPoints: [
          "Identify 3-5 core strengths with specific examples.",
          "Get feedback from colleagues on your blind spots.",
          "Align your strengths with market needs.",
        ],
        quote: "Your time is limited, so don't waste it living someone else's life.",
        quoteAuthor: "Steve Jobs",
      },
      {
        id: "storytelling-5",
        category: "Storytelling + Brand",
        title: "Content Strategy",
        subtitle: "Share your thinking consistently.",
        backgroundColor: "#F0E68C", // Light yellow/khaki
        icon: <Lightbulb className="h-6 w-6" />,
        bulletPoints: [
          "Choose one platform to focus your energy.",
          "Create a content calendar with achievable deadlines.",
          "Document your process, not just final outcomes.",
        ],
        quote: "Content builds relationships. Relationships build trust. Trust drives revenue.",
        quoteAuthor: "Andrew Davis",
      },
      {
        id: "storytelling-6",
        category: "Storytelling + Brand",
        title: "Visual Identity",
        subtitle: "Consistency creates recognition.",
        backgroundColor: "#F0E68C", // Light yellow/khaki
        icon: <Target className="h-6 w-6" />,
        bulletPoints: [
          "Develop a consistent visual system across platforms.",
          "Choose colors and typography that reflect your personality.",
          "Create templates to maintain quality with less effort.",
        ],
        quote: "Design is the silent ambassador of your brand.",
        quoteAuthor: "Paul Rand",
      },
      {
        id: "storytelling-7",
        category: "Storytelling + Brand",
        title: "Elevator Pitch",
        subtitle: "Clarity in 30 seconds or less.",
        backgroundColor: "#F0E68C", // Light yellow/khaki
        icon: <MessageSquare className="h-6 w-6" />,
        bulletPoints: [
          "Structure: who you are, what you do, for whom, and why it matters.",
          "Tailor different versions for different audiences.",
          "End with a clear next step or question.",
        ],
        quote: "If you can't explain it simply, you don't understand it well enough.",
        quoteAuthor: "Albert Einstein",
      },
      {
        id: "storytelling-8",
        category: "Storytelling + Brand",
        title: "Thought Leadership",
        subtitle: "Share insights, not just information.",
        backgroundColor: "#F0E68C", // Light yellow/khaki
        icon: <Lightbulb className="h-6 w-6" />,
        bulletPoints: [
          "Develop a unique perspective on industry challenges.",
          "Create frameworks that simplify complex concepts.",
          "Teach what you know through multiple formats.",
        ],
        quote: "If your actions inspire others to dream more, learn more, do more and become more, you are a leader.",
        quoteAuthor: "John Quincy Adams",
      },
    ],
  },
  {
    id: "negotiation",
    name: "Offer + Negotiation",
    color: "#3B7865", // Updated to match offer.svg
    cards: [
      {
        id: "negotiation-1",
        category: "Offer + Negotiation",
        title: "Know Your Worth",
        subtitle: "Research before you respond.",
        backgroundColor: "#FFECB3", // Light amber
        icon: <DollarSign className="h-6 w-6" />,
        bulletPoints: [
          "Research salary ranges across multiple sources.",
          "Quantify your impact in previous roles.",
          "Consider the full compensation package, not just salary.",
        ],
        quote: "Price is what you pay. Value is what you get.",
        quoteAuthor: "Warren Buffett",
      },
      {
        id: "negotiation-2",
        category: "Offer + Negotiation",
        title: "Counter Offer Strategy",
        subtitle: "Aim high, stay flexible.",
        backgroundColor: "#FFECB3", // Light amber
        icon: <Target className="h-6 w-6" />,
        bulletPoints: [
          "Always counter the first offer, even if it's good.",
          "Ask for 10-20% more than your target number.",
          "Negotiate multiple elements simultaneously, not sequentially.",
        ],
        quote: "You don't get what you deserve, you get what you negotiate.",
        quoteAuthor: "Chester L. Karrass",
      },
      {
        id: "negotiation-3",
        category: "Offer + Negotiation",
        title: "Beyond Salary",
        subtitle: "Flexibility has value.",
        backgroundColor: "#FFECB3", // Light amber
        icon: <Compass className="h-6 w-6" />,
        bulletPoints: [
          "Prioritize your non-salary needs before negotiating.",
          "Consider remote work, flexible hours, and professional development.",
          "Get promises in writing as part of your offer letter.",
        ],
        quote: "In business, you don't get what you deserve, you get what you negotiate.",
        quoteAuthor: "Chester L. Karrass",
      },
      {
        id: "negotiation-4",
        category: "Offer + Negotiation",
        title: "Negotiation Mindset",
        subtitle: "It's a conversation, not a conflict.",
        backgroundColor: "#FFECB3", // Light amber
        icon: <MessageSquare className="h-6 w-6" />,
        bulletPoints: [
          "Frame requests in terms of mutual benefit.",
          "Practice responses to pushback scenarios.",
          "Remember that everything is negotiable.",
        ],
        quote: "Never split the difference.",
        quoteAuthor: "Chris Voss",
      },
      {
        id: "negotiation-5",
        category: "Offer + Negotiation",
        title: "Equity Education",
        subtitle: "Understand what you're being offered.",
        backgroundColor: "#FFECB3", // Light amber
        icon: <DollarSign className="h-6 w-6" />,
        bulletPoints: [
          "Learn the basics of stock options, RSUs, and vesting schedules.",
          "Calculate the potential value under different growth scenarios.",
          "Consider tax implications of different equity structures.",
        ],
        quote: "An investment in knowledge pays the best interest.",
        quoteAuthor: "Benjamin Franklin",
      },
      {
        id: "negotiation-6",
        category: "Offer + Negotiation",
        title: "Competing Offers",
        subtitle: "Leverage creates options.",
        backgroundColor: "#FFECB3", // Light amber
        icon: <Briefcase className="h-6 w-6" />,
        bulletPoints: [
          "Time your job search to create overlapping offers.",
          "Share competing offers without ultimatums.",
          "Be transparent about your decision timeline.",
        ],
        quote: "Options are the key to freedom.",
        quoteAuthor: "Unknown",
      },
      {
        id: "negotiation-7",
        category: "Offer + Negotiation",
        title: "Promotion Preparation",
        subtitle: "Build your case methodically.",
        backgroundColor: "#FFECB3", // Light amber
        icon: <Award className="h-6 w-6" />,
        bulletPoints: [
          "Document achievements and impact throughout the year.",
          "Gather feedback and endorsements from colleagues.",
          "Research comparable roles and compensation.",
        ],
        quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
        quoteAuthor: "Chinese Proverb",
      },
      {
        id: "negotiation-8",
        category: "Offer + Negotiation",
        title: "Negotiation Communication",
        subtitle: "Words matter. Choose carefully.",
        backgroundColor: "#FFECB3", // Light amber
        icon: <MessageSquare className="h-6 w-6" />,
        bulletPoints: [
          "Use collaborative language: 'we' instead of 'I' or 'you'.",
          "Ask questions instead of making demands.",
          "Practice the power of silence after stating your case.",
        ],
        quote: "The single biggest problem in communication is the illusion that it has taken place.",
        quoteAuthor: "George Bernard Shaw",
      },
    ],
  },
  {
    id: "wildcards",
    name: "Power-Ups",
    color: "#6E34C8", // Updated to match wildcard.svg
    cards: [
      {
        id: "wildcards-1",
        category: "Power-Ups",
        title: "Power of Side Projects",
        subtitle: "Build what you want to be hired for.",
        backgroundColor: "#ABFBC5", // Updated to mint color
        icon: <Zap className="h-6 w-6" />,
        bulletPoints: [
          "Create the work you wish you were assigned.",
          "Use side projects to demonstrate skills your current role doesn't showcase.",
          "Finish and ship something small rather than planning something perfect.",
        ],
        quote: "The best way to predict the future is to create it.",
        quoteAuthor: "Peter Drucker",
      },
      {
        id: "wildcards-2",
        category: "Power-Ups",
        title: "Reframe Rejection",
        subtitle: "Not now doesn't mean not ever.",
        backgroundColor: "#ABFBC5", // Updated to mint color
        icon: <Shield className="h-6 w-6" />,
        bulletPoints: [
          "Ask for specific feedback after every rejection.",
          "Maintain relationships with companies that say 'not now'.",
          "Use rejection as data, not definition.",
        ],
        quote: "I have not failed. I've just found 10,000 ways that won't work.",
        quoteAuthor: "Thomas Edison",
      },
      {
        id: "wildcards-3",
        category: "Power-Ups",
        title: "Design Your Support System",
        subtitle: "You can't do this alone.",
        backgroundColor: "#ABFBC5", // Updated to mint color
        icon: <Heart className="h-6 w-6" />,
        bulletPoints: [
          "Identify your cheerleaders, mentors, and accountability partners.",
          "Schedule regular check-ins with your support network.",
          "Be specific about what kind of support you need.",
        ],
        quote: "Surround yourself with only people who are going to lift you higher.",
        quoteAuthor: "Oprah Winfrey",
      },
      {
        id: "wildcards-4",
        category: "Power-Ups",
        title: "Financial Runway",
        subtitle: "Freedom to choose requires planning.",
        backgroundColor: "#ABFBC5", // Updated to mint color
        icon: <DollarSign className="h-6 w-6" />,
        bulletPoints: [
          "Calculate your minimum monthly expenses.",
          "Build 3-6 months of emergency savings.",
          "Consider part-time or contract work during transitions.",
        ],
        quote: "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
        quoteAuthor: "Ayn Rand",
      },
      {
        id: "wildcards-5",
        category: "Power-Ups",
        title: "Decision Framework",
        subtitle: "Clarity comes from process.",
        backgroundColor: "#ABFBC5", // Updated to mint color
        icon: <Compass className="h-6 w-6" />,
        bulletPoints: [
          "List your non-negotiables vs. nice-to-haves.",
          "Create a weighted scorecard for major decisions.",
          "Set a decision deadline to avoid analysis paralysis.",
        ],
        quote: "It's not hard to make decisions when you know what your values are.",
        quoteAuthor: "Roy Disney",
      },
      {
        id: "wildcards-6",
        category: "Power-Ups",
        title: "Energy Management",
        subtitle: "Protect your most valuable resource.",
        backgroundColor: "#ABFBC5", // Updated to mint color
        icon: <Zap className="h-6 w-6" />,
        bulletPoints: [
          "Track your energy levels throughout the day.",
          "Schedule creative work during your peak hours.",
          "Build recovery into your daily and weekly rhythms.",
        ],
        quote: "Time is a created thing. To say 'I don't have time' is to say 'I don't want to.'",
        quoteAuthor: "Lao Tzu",
      },
      {
        id: "wildcards-7",
        category: "Power-Ups",
        title: "Skill Stacking",
        subtitle: "Unique combinations create opportunity.",
        backgroundColor: "#ABFBC5", // Updated to mint color
        icon: <Briefcase className="h-6 w-6" />,
        bulletPoints: [
          "Identify 2-3 complementary skills to your core expertise.",
          "Look for uncommon skill combinations in job descriptions.",
          "Invest in skills with long shelf lives.",
        ],
        quote:
          "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",
        quoteAuthor: "Bruce Lee",
      },
      {
        id: "wildcards-8",
        category: "Power-Ups",
        title: "Future-Proof Your Career",
        subtitle: "Anticipate change, don't react to it.",
        backgroundColor: "#ABFBC5", // Updated to mint color
        icon: <Clock className="h-6 w-6" />,
        bulletPoints: [
          "Follow industry trends and emerging technologies.",
          "Build relationships outside your current company.",
          "Develop skills that complement AI, not compete with it.",
        ],
        quote: "The best way to predict your future is to create it.",
        quoteAuthor: "Abraham Lincoln",
      },
    ],
  },
]

export default function getIconForCategory(categoryName: string) {
  const iconMap: Record<string, React.ReactNode> = {
    "Mindset + Resilience": <Dumbbell className="h-6 w-6" />,
    "Networking Moves": <Users className="h-6 w-6" />,
    "Being a Super IC": <Briefcase className="h-6 w-6" />,
    "Interview Gameplans": <MessageSquare className="h-6 w-6" />,
    "Storytelling + Brand": <BookOpen className="h-6 w-6" />,
    "Offer + Negotiation": <DollarSign className="h-6 w-6" />,
    "Power-Ups": <Zap className="h-6 w-6" />,
  }

  return iconMap[categoryName] || <Zap className="h-6 w-6" />
}
