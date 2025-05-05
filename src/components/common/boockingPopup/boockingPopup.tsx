import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { closePopup } from "../../../store/slices/boocking";
import "./boockingPopup.scss";

export default function GlobalPopup() {
  const isOpen = useSelector((state: RootState) => state.boocking.isPopupOpen);
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        dispatch(closePopup());
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  if (!show) return null;

  return (
    <div className={`popup-overlay ${isOpen ? "visible" : "hidden"}`}>
      <div className="popup-window" ref={popupRef}>
        <iframe
          src="https://feelbeatoy.pipedrive.com/scheduler/RY9rMHD/sapluna-esittely"
          title="Pipedrive Scheduler Embed"
          allowFullScreen
        />
        <button onClick={() => dispatch(closePopup())}>×</button>
      </div>
    </div>
  );
}
