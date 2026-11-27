"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const places = [
  { href: "/quizzes", name: "The Archive" },
  { href: "/", name: "The Passage" },
  { href: "/scores", name: "The Observatory" },
];

export interface AtlasLayoutProps { children: ReactNode }
export default function AtlasLayout({ children }: AtlasLayoutProps) {
  const pathname = usePathname();
  const [entering, setEntering] = useState(pathname === "/");
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  const place = places.find((item) => item.href === pathname);
  const room = pathname === "/" ? "home" : pathname.startsWith("/quizzes/") && pathname !== "/quizzes/education" ? "detail" : pathname.slice(1);

  return (
    <div
      id="world"
      data-room={room}
      className={entering && room === "home" ? "entering" : ""}
      onClickCapture={() => setEntering(false)}
    >
      <div className="terrain" aria-hidden="true">
        <div className="panorama" />
        <div className="foreground" />
        {entering && room === "home" && (
          <div className="ignition" onAnimationEnd={() => setEntering(false)} />
        )}
      </div>
      <div className="scrim" aria-hidden="true" />
      <header className="flex items-center justify-between">
        <Link className="brand" href="/">
          <i aria-hidden="true">✧</i>Quiz Atlas
        </Link>
        <nav aria-label="Main navigation" className="atlas-main-nav"><Link href="/quizzes">Archive</Link><Link href="/about">About</Link><Link href="/profile">Profile</Link><Link id="scoreButton" href="/scores">
          My scores
        </Link></nav>
      </header>
      <main key={pathname} className="destination">
        {children}
      </main>
      <footer className="flex items-center gap-4">
        <nav className="map" aria-label="Atlas locations">
          {places.map(({ href, name }) => (
            <Link
              key={href}
              href={href}
              aria-label={name}
              aria-current={pathname === href ? "page" : undefined}
            >
              ◇
            </Link>
          ))}
        </nav>
        <span>{place?.name}</span>
      </footer>
    </div>
  );
}
