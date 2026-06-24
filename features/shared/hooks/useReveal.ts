import { useEffect, type RefObject } from "react";

export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          obs.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.style.opacity = "1";
        return;
      }
      el.style.opacity = "0";
      el.style.transform = "translateY(26px)";
      const delay = Math.min(i * 0.07, 0.32);
      el.style.transition = [
        `opacity .7s cubic-bezier(.2,.8,.2,1) ${delay}s`,
        `transform .7s cubic-bezier(.2,.8,.2,1) ${delay}s`,
      ].join(", ");
      obs.observe(el);
    });

    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
