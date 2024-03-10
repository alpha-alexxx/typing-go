import { Inter, Poppins, Urbanist } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["devanagari"],
  weight: ["200", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});
const urbanist = Urbanist({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
export { poppins, inter, urbanist };
