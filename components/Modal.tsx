"use client";

const Modal = () => {
  return (
    <div
      className="
      justify-center
      items-center
      flex
      overflow-x-hidden
      overflow-y-hidden
      fixed
      inset-0
      z-50
      outline-none
      focus:outline-none
      bg-neutral-800/70
    "
    >
      <div
        className="
        relative 
        w-full
        md:w-4/6
        lg:w-3/6
        xl:w-2/5
        my-6
        mx-auto
        h-full
        lg:h-auto
        md:h-auto
      "
      >
        <div
          className="
          translate
          duration-300
          h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
        "
        >
          <div
            className="
            translate
            h-full
            lg:h-auto
            md:h-auto
            border-0
            rounded-lg
            shadow-lg
            relative
            flex
            flex-col
            w-full
            bg-white
            outline-none
            focus:outline-none
          "
          >
            <button>I&apos;m a modal</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
