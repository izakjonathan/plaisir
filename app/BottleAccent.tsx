/** Oversized fragments of the original fine-line bottle, independent of the bold logo. */
export default function BottleAccent({ variant }: { variant: 'sweep' | 'edge' | 'loop' | 'shoulder' | 'base' }) {
  return <div className={`bottle-accent bottle-accent--${variant}`} aria-hidden="true">
    <svg viewBox="0 0 260 590" fill="none" focusable="false">
      <path vectorEffect="non-scaling-stroke" d="M82 23C104 36 151 38 166 25C178 12 132 8 91 22C100 58 101 121 88 161C78 188 49 191 32 217C13 245 33 277 30 319C28 374 12 428 15 487C16 528 17 554 44 560C90 579 195 567 226 528C253 495 230 455 227 412C222 370 235 317 235 273C233 231 205 198 185 164C160 124 157 91 163 62M45 560C15 541 69 533 99 539C133 544 167 563 161 577C150 593 99 575 69 564" />
    </svg>
  </div>;
}
