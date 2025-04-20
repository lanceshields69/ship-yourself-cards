import MindsetIcon from "./mindset-icon"
import NetworkingIcon from "./networking-icon"
import SuperICIcon from "./super-ic-icon"
import InterviewingIcon from "./interviewing-icon"
import StorytellingIcon from "./storytelling-icon"
import OfferIcon from "./offer-icon"
import WildcardIcon from "./wildcard-icon"

export { MindsetIcon, NetworkingIcon, SuperICIcon, InterviewingIcon, StorytellingIcon, OfferIcon, WildcardIcon }

export const getCategoryIcon = (categoryId: string, color: string, size = 56) => {
  switch (categoryId) {
    case "mindset":
      return <MindsetIcon color={color} size={size} />
    case "networking":
      return <NetworkingIcon color={color} size={size} />
    case "super-ic":
      return <SuperICIcon color={color} size={size} />
    case "interviewing":
      return <InterviewingIcon color={color} size={size} />
    case "storytelling":
      return <StorytellingIcon color={color} size={size} />
    case "negotiation":
      return <OfferIcon color={color} size={size} />
    case "wildcards":
      return <WildcardIcon color={color} size={size} />
    default:
      return <WildcardIcon color={color} size={size} />
  }
}
