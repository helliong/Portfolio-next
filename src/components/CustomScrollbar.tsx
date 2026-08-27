"use client";

import { useEffect, useRef, useState } from "react";

const HIDE_DELAY_MS = 900;
const MIN_THUMB_HEIGHT = 44;

type ScrollbarState = {
  canScroll: boolean;
  thumbHeight: number;
  thumbTop: number;
};

export default function CustomScrollbar() {
  const hideTimeoutRef = useRef<number | null>(null);
  const dragRef = useRef<{ startY: number; startScrollTop: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollbar, setScrollbar] = useState<ScrollbarState>({
    canScroll: false,
    thumbHeight: MIN_THUMB_HEIGHT,
    thumbTop: 0,
  });

  useEffect(() => {
    const updateScrollbar = () => {
      const { documentElement } = document;
      const scrollHeight = documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScrollTop = Math.max(scrollHeight - viewportHeight, 0);

      if (maxScrollTop <= 0) {
        setScrollbar((current) =>
          current.canScroll ? { ...current, canScroll: false, thumbTop: 0 } : current,
        );
        return;
      }

      const thumbHeight = Math.max(
        Math.round((viewportHeight / scrollHeight) * viewportHeight),
        MIN_THUMB_HEIGHT,
      );
      const maxThumbTop = viewportHeight - thumbHeight;
      const thumbTop = Math.round((documentElement.scrollTop / maxScrollTop) * maxThumbTop);

      setScrollbar({
        canScroll: true,
        thumbHeight,
        thumbTop: Number.isFinite(thumbTop) ? thumbTop : 0,
      });
    };

    const showTemporarily = () => {
      updateScrollbar();
      setIsVisible(true);

      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
      }

      hideTimeoutRef.current = window.setTimeout(() => {
        if (!isHovering && !dragRef.current) {
          setIsVisible(false);
        }
      }, HIDE_DELAY_MS);
    };

    updateScrollbar();
    window.addEventListener("scroll", showTemporarily, { passive: true });
    window.addEventListener("resize", showTemporarily);

    return () => {
      window.removeEventListener("scroll", showTemporarily);
      window.removeEventListener("resize", showTemporarily);
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isHovering]);

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragRef.current) {
        return;
      }

      const { documentElement } = document;
      const maxScrollTop = documentElement.scrollHeight - window.innerHeight;
      const maxThumbTop = window.innerHeight - scrollbar.thumbHeight;
      const scrollDelta = ((event.clientY - dragRef.current.startY) / maxThumbTop) * maxScrollTop;

      window.scrollTo({ top: dragRef.current.startScrollTop + scrollDelta });
    };

    const handlePointerUp = () => {
      dragRef.current = null;
      setIsDragging(false);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp, { once: true });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, scrollbar.thumbHeight]);

  const handleTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const nextTop = Math.max(event.clientY - scrollbar.thumbHeight / 2, 0);
    const maxThumbTop = window.innerHeight - scrollbar.thumbHeight;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({ top: (nextTop / maxThumbTop) * maxScrollTop, behavior: "smooth" });
  };

  const handleThumbPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragRef.current = {
      startY: event.clientY,
      startScrollTop: document.documentElement.scrollTop,
    };
    setIsVisible(true);
    setIsDragging(true);
  };

  if (!scrollbar.canScroll) {
    return null;
  }

  return (
    <div
      className={`custom-scrollbar${isVisible || isHovering || isDragging ? " is-visible" : ""}`}
      aria-hidden="true"
      onMouseEnter={() => {
        setIsHovering(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        if (!isDragging) {
          setIsVisible(false);
        }
      }}
      onPointerDown={handleTrackPointerDown}
    >
      <div
        className="custom-scrollbar-thumb"
        onPointerDown={handleThumbPointerDown}
        style={{
          height: `${scrollbar.thumbHeight}px`,
          transform: `translate3d(0, ${scrollbar.thumbTop}px, 0)`,
        }}
      />
    </div>
  );
}
