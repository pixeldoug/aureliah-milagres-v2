"use client";

import { useEffect, useRef, type RefObject } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useLenis } from "lenis/react";

const STRIP_PX = 11;
const STRENGTH = 3.8;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 1.0 - (aPos.y * 0.5 + 0.5));
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uCanvas;
uniform vec2 uMedia;
uniform float uStrips;
uniform float uStrength;

vec2 coverTop(vec2 uv) {
  float scale = max(uCanvas.x / max(uMedia.x, 1.0), uCanvas.y / max(uMedia.y, 1.0));
  vec2 sized = uMedia * scale;
  vec2 origin = vec2((uCanvas.x - sized.x) * 0.5, 0.0);
  return (uv * uCanvas - origin) / sized;
}

void main() {
  vec2 base = coverTop(vUv);
  float f = fract(base.x * uStrips);
  float k = (f - 0.5) * uStrength / uStrips;
  vec2 sampleUv = clamp(vec2(base.x + k, base.y), 0.0, 1.0);
  vec4 col = texture2D(uTex, sampleUv);

  float edge = min(f, 1.0 - f);
  float bevel = mix(0.48, 0.82, smoothstep(0.0, 0.16, edge));
  float highlight = 1.0 - smoothstep(0.0, 0.05, edge);
  col.rgb *= bevel;
  col.rgb += vec3(0.04) * highlight;
  col.rgb *= 0.72;

  gl_FragColor = col;
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ReededGlass({ videoRef }: { videoRef: RefObject<HTMLVideoElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const loc = {
      tex: gl.getUniformLocation(program, "uTex"),
      canvas: gl.getUniformLocation(program, "uCanvas"),
      media: gl.getUniformLocation(program, "uMedia"),
      strips: gl.getUniformLocation(program, "uStrips"),
      strength: gl.getUniformLocation(program, "uStrength"),
    };

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(loc.tex, 0);

    let raf = 0;
    let alive = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = () => {
      if (!alive) return;
      resize();
      const video = videoRef.current;
      if (video && video.readyState >= 2 && video.videoWidth > 0) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        gl.uniform2f(loc.canvas, canvas.clientWidth, canvas.clientHeight);
        gl.uniform2f(loc.media, video.videoWidth, video.videoHeight);
        gl.uniform1f(loc.strips, canvas.clientWidth / STRIP_PX);
        gl.uniform1f(loc.strength, STRENGTH);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [videoRef]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}

/** Viewport-locked reeded video, clipped to section 2 so the hero stays unfiltered. */
export function ReededSectionBg({
  videoRef,
  scrollProgress,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  scrollProgress: MotionValue<number>;
}) {
  const clipRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mediaY = useTransform(scrollProgress, [0, 1], ["0%", "7%"]);
  const mediaScale = useTransform(scrollProgress, [0, 1], [1, 1.08]);

  const align = () => {
    const clip = clipRef.current;
    const lock = lockRef.current;
    if (!clip || !lock) return;
    lock.style.transform = `translate3d(0, ${-clip.getBoundingClientRect().top}px, 0)`;
  };

  useLenis(align);

  useEffect(() => {
    align();
    window.addEventListener("resize", align);
    return () => window.removeEventListener("resize", align);
  }, []);

  return (
    <div ref={clipRef} className="pointer-events-none absolute inset-0 overflow-hidden [clip-path:inset(0)]" aria-hidden>
      <div ref={lockRef} className="absolute top-0 left-0 h-svh w-full overflow-hidden will-change-transform">
        <motion.div
          className="absolute inset-0 origin-top"
          style={reduceMotion ? undefined : { y: mediaY, scale: mediaScale }}
        >
          <ReededGlass videoRef={videoRef} />
        </motion.div>
      </div>
      <div className="wm-layer wm-reeded-tint" />
    </div>
  );
}
