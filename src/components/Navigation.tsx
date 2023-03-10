import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Navigation as NavigationItems } from "@/libs/config";
import useSound from "use-sound";
import { motion } from "framer-motion";

const Navigation = ({ isActivityTrue }: React.PropsWithChildren<any>) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const pathnameOffsets: { [key: string]: number } = useMemo(() => {
    return NavigationItems.reduce(
      (acc, cur, index) => ({ ...acc, [cur.path]: index * 56 }),
      {}
    );
  }, []);

  const dragConstraintsRef = useRef<HTMLLIElement>(null);

  const [dragYOffset, setDragYOffset] = useState(0);

  const [playSwitchPageSound] = useSound("/sounds/switch-page.mp3");
  useEffect(() => {
    playSwitchPageSound();
  }, [pathname, playSwitchPageSound]);

  const pageIndicatorOffset = useMemo(() => {
    return pathname ? pathnameOffsets[pathname] ?? -180 : 0;
  }, [pathname, pathnameOffsets]);

  const pageIndicatorOffsetWithDecoration = useMemo(() => {
    return pageIndicatorOffset - dragYOffset;
  }, [pageIndicatorOffset, dragYOffset]);

  const onPageIndicatorDragEnd = useCallback(
    (_event: any, info: { offset: { y: number }; velocity: { y: any } }) => {
      const goal = pageIndicatorOffset + info.offset.y;
      const closest = Object.entries(pathnameOffsets).reduce(
        (prev, cur) =>
          Math.abs(cur[1] - goal) < Math.abs(prev[1] - goal) ? cur : prev,
        [pathname, pageIndicatorOffset] as [string, number]
      );

      if (closest[0] === pathname) return;

      setDragYOffset((prev) => prev + info.offset.y + info.velocity.y);
      push(closest[0]);
    },
    [pathname, push, pageIndicatorOffset, pathnameOffsets]
  );

  const containerHeight = useMemo(() => {
    return isActivityTrue()
      ? "h-[calc(100vh-31em)] lg:h-[calc(100vh-26.5em)]"
      : "h-[calc(100vh-26rem)] lg:h-[calc(100vh-20.5rem)]";
  }, [isActivityTrue]);

  return (
    <div className={`relative flex w-full ${containerHeight}`}>
      <motion.div
        whileHover={{ width: 3 }}
        drag="y"
        onDragEnd={onPageIndicatorDragEnd}
        dragConstraints={dragConstraintsRef}
        animate={{ top: pageIndicatorOffsetWithDecoration }}
        className="absolute top-0 -right-[1px] h-[58px] w-[1px] bg-white/80"
      />
      <ul className="flex w-full flex-col items-center divide-y divide-dashed divide-[#1c1c1c]">
        {NavigationItems.map(({ name, path }) => (
          <li
            ref={dragConstraintsRef}
            key={name}
            className={`links last:!border-b`}
          >
            <Link href={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
