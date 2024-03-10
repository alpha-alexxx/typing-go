import { useEffect, useState } from "react";

/**
 * Custom hook that tracks the scroll position and returns the current section ID.
 * @returns {Object} An object containing the current scroll position.
 * @property {string} scrollPosition - The ID of the current section.
 */
const useScrollPosition = (initSection?: string) => {
  const [currentSection, setCurrentSection] = useState<string | "">(
    initSection || "",
  );

  useEffect(() => {
    /**
     * Event handler for the scroll event.
     */
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop - sectionHeight / 2 &&
          window.scrollY < sectionTop + sectionHeight / 2
        ) {
          currentSection = section.id;
        }
      });

      setCurrentSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    /**
     * Cleanup function that removes the scroll event listener.
     */
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollPosition: currentSection };
};

export default useScrollPosition;
