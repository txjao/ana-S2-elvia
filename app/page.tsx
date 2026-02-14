'use client';

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Vara from "vara";
import style from "./page.module.css"
import helloKitty from "../public/hello-kitty.png";
import beijocas from "../public/beijocas.gif";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [timesDenied, setTimesDenied] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [varaReady, setVaraReady] = useState(false);
  const [imagePosition, setImagePosition] = useState(-150);
  const [isAbleToAnimate, setIsAbleToAnimate] = useState(false)
  const aceitouRef = useRef<HTMLDivElement>(null);

  const text = { text: "Will you be my valentine?" };

  // Animation Durations (in milliseconds)
  const varaAnimationDuration = 6000; // Increased Vara animation time
  const imagePositionDuration = 3000; // Increased image animation time
  const fadeInDuration = 2000; // Increased fade-in animation time
  const scrollDuration = 1000; // Duration of the smooth scroll



  useEffect(() => {
    // Animation fade-in after Vara animation is complete
    let startTime: any;

    function animateFadeIn(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const newOpacity = Math.min(progress / fadeInDuration, 1);

      setOpacity(newOpacity);

      if (progress < fadeInDuration) {
        requestAnimationFrame(animateFadeIn);
      }
    }

    if (varaReady) {
      requestAnimationFrame(animateFadeIn);
      setIsAbleToAnimate(true)
    }
  }, [varaReady, fadeInDuration]);

  useEffect(() => {
    const positionDuration = imagePositionDuration;
    let startPositionTime: any;

    function animatePosition(currentTime: number) {
      if (!startPositionTime) startPositionTime = currentTime;
      const progress = currentTime - startPositionTime;

      //Position in px
      const newPosition = 10;

      setImagePosition(newPosition);

      if (progress < positionDuration) {
        requestAnimationFrame(animatePosition);
      }
    }

    if (isAbleToAnimate) {
      requestAnimationFrame(animatePosition);
    }
  }, [isAbleToAnimate, imagePositionDuration]);

  function VaraText({ text }: { text: string }) {
    useEffect(() => {
      const vara = new Vara(
        "#text",
        "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
        [
          {
            text: text,
            fontSize: 40,
            strokeWidth: 1,
            duration: varaAnimationDuration,
            textAlign: "center",
          },
        ],
      );

      vara.ready(() => {
        setTimeout(() => {
          setVaraReady(true);
        }, varaAnimationDuration);
      });
    }, [varaAnimationDuration]);

    return <p id="text"></p>;
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetElement = aceitouRef.current;

    if (!targetElement) {
      return; // Or handle the error as appropriate
    }

    const start = window.scrollY;
    const target = targetElement.offsetTop;
    const distance = target - start;
    let startTime: null | number = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, start, distance, scrollDuration);
      window.scrollTo(0, run);
      if (timeElapsed < scrollDuration) requestAnimationFrame(animation);
    }

    // Easing function (you can choose different easing functions)
    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2;

      if (t < 1) return (c / 2) * t * t + b;

      t--;

      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    function handleToast() {
      switch (timesDenied) {
        case 1: {
          return toast('Resposta errada rsrsrs')
        }
        case 2: {
          return toast('É sério? 🥺')
        }
        case 5: {
          return toast('Tudo bem 😞')
        }
        case 7: {
          return toast('Não era mais fácil sair do site?')
        }
        case 10: {
          window.location.assign('https://www.youtube.com/watch?v=o5Sg1dIaHCU')
        }
      }
    }

    handleToast();
  }, [timesDenied])

  return (
    <>
      <div className={style.container}>
        <Image
          src={helloKitty}
          alt=""
          height={144}
          className={style.mainImg}
          style={{
            bottom: `${imagePosition}px`,
            zIndex: `-1px`
          }}
        />
        <div className={style.wrapper}>
          {VaraText(text)}

          <div className={style.btnBox} style={{ opacity: opacity }}>
            <a className={style.btn} href="#Aceitou!" onClick={handleSmoothScroll}>
              <span className={style.btnText}>Yes</span>
            </a>

            <a className={style.btn} href="#Aceitou!" onClick={handleSmoothScroll}>
              <span className={style.btnText}>Yes</span>
            </a>
          </div>
        </div>
      </div>

      <div className={style.aceitou} ref={aceitouRef}>
        <Image
          src={beijocas}
          width={64}
          height={64}
          quality={100}
          priority={true}
          alt='imagem fofinha'
        />
        <div id="Aceitou!">
          <h1 className={style.aceitouText}>I love you my dirty Mexican!
          </h1>

        </div>
      </div>
      <Toaster position='bottom-center' />
    </>
  );
}
