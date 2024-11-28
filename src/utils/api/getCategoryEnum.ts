import { Category } from "@prisma/client";

export default function getChainEnum(categoryName: string) {
  let category;
  switch (categoryName) {
    case "DigitalCreator":
      category = Category.DigitalCreator;
      break;
    case "BlockchainEnthusiast":
      category = Category.BlockchainEnthusiast;
      break;
    case "SocialCreator":
      category = Category.SocialCreator;
      break;
    case "FinancialWizard":
      category = Category.FinancialWizard;
      break;
    case "TechInnovator":
      category = Category.TechInnovator;
      break;
    case "Gamer":
      category = Category.Gamer;
      break;
    default:
      throw new Error("Invalid Chain");
  }
  return category;
}
