import "./AnimatedChatBotButton.css";
import { TweenMax, TimelineMax, Power2, Linear, Circ, Back } from "gsap";
import $ from "jquery";
import { useRef, useEffect } from "react";

export const AnimatedChatBotButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const $playBtn = $(buttonRef.current);

    TweenMax.set($playBtn.find('circle'), { transformOrigin: 'center center' });

    const pulseTl = new TimelineMax({ yoyo: true, repeat: -1 });
    pulseTl.fromTo(
      $playBtn.find('.white'),
      2,
      { scale: 1 },
      { scale: 1.2, ease: Power2.easeInOut }
    );

    const spinTl = new TimelineMax({ repeat: -1 });
    spinTl.to($playBtn.find('.tborder'), 5, {
      rotation: 360,
      ease: Linear.easeNone,
    });

    const hoverTl = new TimelineMax({
      paused: true,
      onReverseComplete: () => {
        pulseTl.resume();
        spinTl.pause();
      },
    });

    hoverTl
      .to($playBtn.find('.black circle'), 0.25, { scale: 0, ease: Circ.easeIn }, 'start')
      .to($playBtn.find('.yellow circle'), 0.45, { scale: 0, ease: Circ.easeIn }, 'start')
      .set($playBtn.find('.black path'), { scale: 0, ease: Circ.easeOut })
      .set($playBtn.find('.icon'), { display: 'block' })
      .set($playBtn.find('.text'), { display: 'block' })
      .to($playBtn.find('.black circle'), 0.2, { scale: 3, ease: Circ.easeOut }, 'end')
      .from($playBtn.find('.tborder circle'), 0.35, { scale: 0, ease: Circ.easeOut }, 'end')
      .to($playBtn.find('.white circle'), 0.45, { scale: 1, ease: Back.easeOut }, 'end')
      .to($playBtn.find('.text'), 0.55, { y: 15, ease: Back.easeOut }, 'end');

    hoverTl.timeScale(1.1);

    $playBtn
      .on('click', () => {
        // Click logic if needed
      })
      .on('mouseenter', () => {
        pulseTl.pause();
        hoverTl.play();
        spinTl.play();
      })
      .on('mouseleave', () => {
        hoverTl.reverse();
      });

    // Cleanup
    return () => {
      $playBtn.off();
      pulseTl.kill();
      spinTl.kill();
      hoverTl.kill();
    };
  }, []);

  return (
    <>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js"></script>
      <div ref={buttonRef} className="play-button">
        <div className="circle">
          <svg
            id="icon-magic"
            className="animated"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              className="icon-star icon-first"
              d="M6 3L6.849 5.151L9 6L6.849 6.849L6 9L5.151 6.849L3 6L5.151 5.151L6 3Z"
              fill="#0f4146"
            />
            <path
              className="icon-star icon-second"
              d="M15 3L16.131 5.869L19 7L16.131 8.131L15 11L13.869 8.131L11 7L13.869 5.869L15 3Z"
              fill="#0f4146"
            />
            <path
              className="icon-star icon-third"
              d="M10 9L11.414 12.586L15 14L11.414 15.414L10 19L8.586 15.414L5 14L8.586 12.586L10 9Z"
              fill="#0f4146"
            />
            <path
              className="icon-pen"
              d="M27.6564 16.5111L29.6872 14.4803C29.8957 14.2711 30 14.0103 30 13.6978C30 13.386 29.8957 13.1258 29.6872 12.9173L27.0831 10.3122C26.9812 10.2096 26.8594 10.129 26.7252 10.0754C26.5909 10.0217 26.4471 9.99624 26.3026 10.0004C25.9894 10.0004 25.7289 10.1047 25.521 10.3133L23.4903 12.344L27.6564 16.5111ZM26.4585 17.709L22.2913 13.5419L10 25.8339V30H14.1672L26.4585 17.709Z"
              fill="#0f4146"
            />
          </svg>
          <div className="black">
            <svg
              id="icon-magic"
              className="animated"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                className="icon-star icon-first"
                d="M6 3L6.849 5.151L9 6L6.849 6.849L6 9L5.151 6.849L3 6L5.151 5.151L6 3Z"
                fill="white"
              />
              <path
                className="icon-star icon-second"
                d="M15 3L16.131 5.869L19 7L16.131 8.131L15 11L13.869 8.131L11 7L13.869 5.869L15 3Z"
                fill="white"
              />
              <path
                className="icon-star icon-third"
                d="M10 9L11.414 12.586L15 14L11.414 15.414L10 19L8.586 15.414L5 14L8.586 12.586L10 9Z"
                fill="white"
              />
              <path
                className="icon-pen"
                d="M27.6564 16.5111L29.6872 14.4803C29.8957 14.2711 30 14.0103 30 13.6978C30 13.386 29.8957 13.1258 29.6872 12.9173L27.0831 10.3122C26.9812 10.2096 26.8594 10.129 26.7252 10.0754C26.5909 10.0217 26.4471 9.99624 26.3026 10.0004C25.9894 10.0004 25.7289 10.1047 25.521 10.3133L23.4903 12.344L27.6564 16.5111ZM26.4585 17.709L22.2913 13.5419L10 25.8339V30H14.1672L26.4585 17.709Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="yellow">
            <svg height="48" width="48">
              <circle cx="24" cy="24" r="24" fill="#0f4146" />
            </svg>
          </div>
          <div className="tborder">
            <svg height="72" width="72">
              <circle
                cx="36"
                cy="36"
                r="36"
                fill="transparent"
                stroke="#0f4146"
                stroke-width="1"
                stroke-dasharray="4,3"
              />
            </svg>
          </div>
          <div className="white">
            <svg height="120" width="120">
              <circle cx="60" cy="60" r="33" fill="#0f4146" />
            </svg>
          </div>
          <div className="lines"></div>
        </div>

        <div className="text">How Can I help You</div>
      </div>
    </>
  );
};

export default AnimatedChatBotButton;
