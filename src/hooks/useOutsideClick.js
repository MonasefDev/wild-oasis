import { useEffect } from 'react';
import { useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener('click', handleClick, listenCapturing); //?Event move down in dom tree
    // document.addEventListener('click', handleClick);     //?Event move up in dom tree

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
