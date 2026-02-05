import { useCallback, useEffect, useRef } from "react";

/**
 * Captures global keystrokes and forwards the pressed character to a callback.
 * Designed to trigger the entry modal when the user starts typing anywhere
 * on the page outside of an existing input or textarea.
 *
 * Keystrokes are ignored when:
 *   - the modal is already open
 *   - focus is inside an HTMLInputElement or HTMLTextAreaElement
 *   - a modifier key (Meta, Ctrl, Alt) is held
 *   - the key is non-printable (key.length !== 1)
 */
export function useKeyboardCapture(
  isModalOpen: boolean,
  onCapture: (initialText: string) => void,
): void {
  const onCaptureRef = useRef(onCapture);

  useEffect(() => {
    onCaptureRef.current = onCapture;
  }, [onCapture]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isModalOpen) return;

      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key.length !== 1) return;

      onCaptureRef.current(event.key);
    },
    [isModalOpen],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
