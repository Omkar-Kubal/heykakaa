type TestimonialIllustrationProps = {
  variant: "rohith" | "arjun";
};

export function TestimonialIllustration({ variant }: TestimonialIllustrationProps) {
  const isRohith = variant === "rohith";

  return (
    <svg className="hk-testimonial-illustration" viewBox="0 0 112 128" aria-hidden="true" focusable="false">
      <rect x="5" y="4" width="102" height="120" rx="34" fill={isRohith ? "#142b47" : "#24213a"} />
      <circle cx={isRohith ? "86" : "25"} cy="25" r="7" fill={isRohith ? "#70a8ff" : "#b49bff"} opacity=".8" />
      <circle cx={isRohith ? "22" : "88"} cy="83" r="4" fill="#ffffff" opacity=".35" />
      <path d="M17 119c2-22 17-34 39-34s37 12 39 34v5H17z" fill={isRohith ? "#4388e8" : "#7864c8"} />
      <path d="M43 78h26v18c-3 6-8 9-13 9s-10-3-13-9z" fill={isRohith ? "#9d6249" : "#b97f5d"} />
      <ellipse cx="56" cy="53" rx="23" ry="28" fill={isRohith ? "#bb8062" : "#d49a77"} />
      <path
        d={isRohith
          ? "M33 49c-2-21 9-32 24-32 16 0 26 12 23 31-5-3-9-9-11-15-9 8-21 12-36 12z"
          : "M33 49c-3-18 4-32 20-35 16-3 28 9 26 29-5-2-9-7-12-13-8 9-20 14-34 14z"}
        fill="#201d25"
      />
      <path d="M44 55h3m18 0h3" stroke="#33251f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M51 68c3 3 7 3 10 0" fill="none" stroke="#754738" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 49c-3 1-5 4-4 8 1 4 4 6 7 6m38-14c3 1 5 4 4 8-1 4-4 6-7 6" fill="none" stroke={isRohith ? "#a96d53" : "#c18a68"} strokeWidth="3" />
      <path d="M42 91l14 13 14-13" fill="none" stroke="#ffffff" strokeOpacity=".75" strokeWidth="2" />
    </svg>
  );
}
