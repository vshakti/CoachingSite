"use client";

interface OpenModalButtonProps {
  className: string;
  children: React.ReactNode;
}

const OpenModalButton = ({ className, children }: OpenModalButtonProps) => {
  return (
    <>
      <button
        className={className}
        onClick={() => {
          const dialog = document.getElementById(
            "user_update_modal",
          ) as HTMLDialogElement;
          if (dialog) {
            dialog.showModal();
          }
        }}
      >
        {children}
      </button>
    </>
  );
};
export default OpenModalButton;
