import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Navigation as NavigationItems } from "@/libs/config";
import useSound from "use-sound";
import { motion, PanInfo } from "framer-motion";

const Navigation = ({ isActivityTrue }: React.PropsWithChildren<any>) => {
  const pathname = usePathname();
  const history = useRouter();

  const pathnameOffsets: { [key: string]: number } = useMemo(
    () =>
      NavigationItems.reduce(
        (acc, cur, index) => ({ ...acc, [cur.path]: index * 56 }),
        {}
      ),
    []
  );

  const dragConstraintsRef = useRef(null);

  const [dragYOffset, setDragYOffset] = useState(0);

  const [playSwitchPageSound] = useSound("/sounds/switch-page.mp3");
  useEffect(() => {
    playSwitchPageSound();
  }, [pathname, playSwitchPageSound]);

  const pageIndicatorOffset = useMemo(
    () => (pathname ? pathnameOffsets[pathname] ?? -180 : 0),
    [pathname, pathnameOffsets]
  );

  const pageIndicatorOffsetWithDecoration = useMemo(
    () => pageIndicatorOffset - dragYOffset,
    [pageIndicatorOffset, dragYOffset]
  );

  const onPageIndicatorDragEnd = useCallback(
    (_event: PointerEvent, info: PanInfo) => {
      const goal = pageIndicatorOffset + info.offset.y;

      const closest = Object.entries(pathnameOffsets).reduce(
        ([prevPath, prevOffset]: any, [curPath, curOffset]: any) => {
          return Math.abs(curOffset - goal) < Math.abs(prevOffset - goal)
            ? [curPath, curOffset]
            : [prevPath, prevOffset];
        }
      );

      if (closest[0] === pathname) return;

      setDragYOffset(dragYOffset + info.offset.y + info.velocity.y);
      history.push(closest[0]);
    },
    [pageIndicatorOffset, pathnameOffsets, pathname, dragYOffset, history]
  );

  const checkIfActivityTrue = useCallback(() => {
    if (isActivityTrue) {
      return "h-[calc(100vh-26.5em)]";
    } else {
      return "h-[calc(100vh-20.5rem)]";
    }
  }, [isActivityTrue]);

  return (
    <div className={`relative flex w-full ${checkIfActivityTrue()}`}>
      <motion.div
        whileHover={{ width: 3 }}
        drag="y"
        onDragEnd={onPageIndicatorDragEnd}
        dragConstraints={dragConstraintsRef}
        animate={{ top: pageIndicatorOffsetWithDecoration }}
        className="absolute top-0 -right-[1px] h-[58px] w-[1px] bg-white/80"
      />
      <ul className="flex w-full flex-col items-center divide-y divide-dashed divide-[#1c1c1c]">
        {NavigationItems.map((link) => (
          <li
            ref={dragConstraintsRef}
            key={link.name}
            className={`links last:!border-b`}
          >
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
